from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import os
from dotenv import load_dotenv
import requests
import json
from google import genai
from googleapiclient.discovery import build
from groq import Groq
import re

load_dotenv()
app = FastAPI()
# Enable CORS

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

# API Keys
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Configure Groq
if not GROQ_API_KEY:
    print("Warning: GROQ_API_KEY not found in .env file")
else:
    client = Groq(api_key=GROQ_API_KEY)

# Session Memory for Chat
SESSIONS = {}

# Course Detection Keywords
COURSE_KEYWORDS = [
    "java", "python", "devops", "full stack", "data science",
    "ai", "machine learning", "react", "spring boot", "backend", "frontend"
]

def detect_course(message: str):
    msg = message.lower()
    for keyword in COURSE_KEYWORDS:
        if keyword in msg:
            return message.strip()
    return None

# Configure Gemini
gemini_client = None
if GEMINI_API_KEY:
    gemini_client = genai.Client(api_key=GEMINI_API_KEY)


def generate_roadmap(prompt: str):
    try:
        if gemini_client:
            response = gemini_client.models.generate_content(model="gemini-1.5-flash", contents=prompt)
            return response.text
        raise Exception("Gemini client not configured")
    except Exception as e:
        print(f"Gemini error, falling back to Groq: {e}")
        try:
            completion = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
            )
            return completion.choices[0].message.content
        except Exception as groq_e:
            raise HTTPException(status_code=500, detail=f"AI Error: {str(groq_e)}")

# Request Model

class RoadmapRequest(BaseModel):

    current_year: int
    passout_year: int
    current_skills: str
    target_role: str

# Chat Models
class ChatRequest(BaseModel):
    message: str
    session_id: str
    target_role: Optional[str] = None

# Response Models

class VideoResource(BaseModel):

    title: str
    url: str
    duration: Optional[str] = None
    channel: Optional[str] = None

class CourseResource(BaseModel):

    title: str
    platform: str
    url: str
    is_free: bool = True

class SkillResource(BaseModel):

    videos: List[VideoResource]
    courses: List[CourseResource]
    docs: List[str]
    projects: List[str]



def fetch_job_requirements_from_api(role: str) -> Dict:

    """

    Fetch real job requirements from job APIs
    """

    # Try multiple job APIs for better coverage
    # Option 1: JSearch API (RapidAPI)

    if RAPIDAPI_KEY:

        try:

            url = "https://jsearch.p.rapidapi.com/search"

            querystring = {

                "query": f"{role} job requirements",
                "page": "1",
                "num_pages": "1"
            }

            headers = {

                "X-RapidAPI-Key": RAPIDAPI_KEY,
                "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
            }

            response = requests.get(url, headers=headers, params=querystring, timeout=10)

            if response.status_code == 200:
                data = response.json()
                if data.get('data'):
                    # Extract skills from job descriptions

                    jobs = data['data'][:5]  # Get top 5 jobs

                    all_skills = set()

                   

                    for job in jobs:

                        description = job.get('job_description', '').lower()

                        # Common skill extraction logic

                        skills_keywords = extract_skills_from_text(description, role)

                        all_skills.update(skills_keywords)

                   

                    return {

                        'skills': list(all_skills),

                        'source': 'JSearch API'

                    }

        except Exception as e:

            print(f"JSearch API error: {e}")

   

    # Fallback: Use Gemini to generate requirements

    # Fallback: Use AI to generate requirements
    return fetch_job_requirements_from_ai(role)



def extract_skills_from_text(text: str, role: str) -> set:

    """Extract skills from job description text"""

    # Common tech skills database

    common_skills = {
        'python', 'java', 'javascript', 'typescript', 'react', 'angular', 'vue',
        'node.js', 'express', 'django', 'flask', 'fastapi', 'sql', 'mongodb',
        'postgresql', 'mysql', 'redis', 'docker', 'kubernetes', 'aws', 'azure',
        'gcp', 'git', 'ci/cd', 'jenkins', 'terraform', 'linux', 'bash',
        'html', 'css', 'tailwind', 'bootstrap', 'rest api', 'graphql',
        'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'pandas',
        'numpy', 'scikit-learn', 'data analysis', 'statistics', 'r',
        'agile', 'scrum', 'jira', 'testing', 'jest', 'pytest','ml','llm','rag'
    }

   

    found_skills = set()

    for skill in common_skills:

        if skill in text:

            found_skills.add(skill.title())

   

    return found_skills



def fetch_job_requirements_from_ai(role: str) -> Dict:
    """
    Use AI (Gemini or Groq) to generate comprehensive job requirements
    """
    prompt = f"""
    You are a career expert. Analyze the job role: {role}
    Provide a comprehensive list of technical skills required for this role in the current job market (2024-2025).
    Return ONLY a JSON object in this exact format (no markdown, no code blocks):
    {{
        "skills": ["skill1", "skill2", "skill3", ...],
        "priority_skills": ["high_priority_skill1", "high_priority_skill2", ...],
        "nice_to_have": ["optional_skill1", "optional_skill2", ...]
    }}
    Include 10-15 essential skills that are currently in demand.
    """
    
    # Try Gemini first
    if gemini_client:
        try:
            response = gemini_client.models.generate_content(model="gemini-1.5-flash", contents=prompt)
            result_text = response.text.strip()
            requirements = parse_json_response(result_text)
            if requirements:
                requirements['source'] = 'Gemini AI'
                return requirements
        except Exception as e:
            print(f"Gemini API error: {e}")

    # Fallback to Groq
    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.1,
        )
        result_text = completion.choices[0].message.content.strip()
        requirements = parse_json_response(result_text)
        if requirements:
            requirements['source'] = 'Groq AI'
            return requirements
    except Exception as e:
        print(f"Groq API error: {e}")

    return get_fallback_requirements(role)

def parse_json_response(text: str) -> Optional[Dict]:
    try:
        if '```json' in text:
            text = text.split('```json')[1].split('```')[0].strip()
        elif '```' in text:
            text = text.split('```')[1].split('```')[0].strip()
        return json.loads(text)
    except:
        return None



def get_fallback_requirements(role: str) -> Dict:

    """Fallback requirements if APIs fail"""

    fallback_db = {

        "Full Stack Developer": {

            "skills": ["JavaScript", "React", "Node.js", "Express", "MongoDB", "SQL", "Git", "REST APIs", "HTML/CSS", "TypeScript"],

            "priority_skills": ["JavaScript", "React", "Node.js", "SQL"],

            "nice_to_have": ["GraphQL", "Redis", "Docker"]

        },

        "DevOps Engineer": {

            "skills": ["Linux", "Docker", "Kubernetes", "AWS", "CI/CD", "Python", "Terraform", "Jenkins", "Git", "Monitoring"],

            "priority_skills": ["Docker", "Kubernetes", "AWS", "CI/CD"],

            "nice_to_have": ["Ansible", "Prometheus", "Grafana"]

        },

        "Data Scientist": {

            "skills": ["Python", "Machine Learning", "Statistics", "SQL", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Data Visualization", "Jupyter"],

            "priority_skills": ["Python", "Machine Learning", "Statistics", "SQL"],

            "nice_to_have": ["PyTorch", "R", "Tableau"]

        },

        "Frontend Developer": {

            "skills": ["JavaScript", "React", "HTML/CSS", "TypeScript", "Tailwind CSS", "Redux", "Git", "Responsive Design", "Web Performance", "Testing"],

            "priority_skills": ["JavaScript", "React", "TypeScript", "HTML/CSS"],

            "nice_to_have": ["Next.js", "Vue.js", "Angular"]

        },

                "Machine Learning Engineer": {

  "skills": ["Python", "Machine Learning", "Deep Learning", "Statistics", "Linear Algebra", "Data Preprocessing", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Model Evaluation"],

  "priority_skills": ["Python", "Machine Learning", "Statistics", "Data Preprocessing"],

  "nice_to_have": ["MLOps", "Docker", "Cloud ML (GCP/AWS)", "NLP", "Computer Vision"]

},

        "AI Engineer": {
            "skills": ["Python", "Machine Learning", "Deep Learning", "Statistics", "Linear Algebra", "Data Preprocessing", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Model Evaluation"],
            "priority_skills": ["Python", "Machine Learning", "Statistics", "Data Preprocessing"],
            "nice_to_have": ["MLOps", "Docker", "Cloud ML (GCP/AWS)", "NLP", "Computer Vision"]
        },
        "Android Developer": {

  "skills": ["Kotlin", "Java", "Android Studio", "XML", "Jetpack Compose", "REST APIs", "Firebase", "SQLite", "Git"],

  "priority_skills": ["Kotlin", "Android Studio", "REST APIs", "Firebase"],

  "nice_to_have": ["MVVM Architecture", "Room DB", "Coroutines"]

},

"Python Developer": {

  "skills": ["Python", "OOP", "Data Structures", "Algorithms", "Flask", "Django", "REST APIs", "SQL", "Git"],

  "priority_skills": ["Python", "OOP", "Data Structures", "Django/Flask"],

  "nice_to_have": ["FastAPI", "Async Programming", "Docker"]

},

"Java Full Stack Developer": {

  "skills": ["Java", "Spring Boot", "Hibernate", "REST APIs", "SQL", "React", "HTML/CSS", "JavaScript", "Git"],

  "priority_skills": ["Java", "Spring Boot", "SQL", "REST APIs"],

  "nice_to_have": ["Microservices", "Docker", "Kafka"]

},

"Blockchain Developer": {

  "skills": ["Blockchain Basics", "Ethereum", "Solidity", "Smart Contracts", "Web3.js", "Cryptography", "JavaScript", "Git"],

  "priority_skills": ["Solidity", "Smart Contracts", "Ethereum", "Web3.js"],

  "nice_to_have": ["Polygon", "Rust", "DeFi", "IPFS"]

},

"UI/UX Designer": {

  "skills": ["Design Principles", "User Research", "Wireframing", "Prototyping", "Figma", "Adobe XD", "Usability Testing", "Typography", "Color Theory"],

  "priority_skills": ["Figma", "Wireframing", "Design Principles", "User Research"],

  "nice_to_have": ["Motion Design", "HTML/CSS", "Accessibility"]

},

        "Cyber Security Analyst": {
            "skills": ["Networking", "Linux", "Security Fundamentals", "Ethical Hacking", "Web Security", "Cryptography", "Python", "Firewalls", "Incident Response"],
            "priority_skills": ["Networking", "Linux", "Web Security", "Ethical Hacking"],
            "nice_to_have": ["SIEM", "Cloud Security", "Penetration Testing"]
        },
        "Cyber Security Engineer": {

  "skills": ["Networking", "Linux", "Security Fundamentals", "Ethical Hacking", "Web Security", "Cryptography", "Python", "Firewalls", "Incident Response"],

  "priority_skills": ["Networking", "Linux", "Web Security", "Ethical Hacking"],

  "nice_to_have": ["SIEM", "Cloud Security", "Penetration Testing"]

},

        "Software Development Engineer (SDE)": {
            "skills": ["Data Structures", "Algorithms", "Problem Solving", "Java", "Python", "OOP", "System Design", "Git"],
            "priority_skills": ["Data Structures", "Algorithms", "Problem Solving", "OOP"],
            "nice_to_have": ["Low Level Design", "High Level Design", "Competitive Programming"]
        },
        "SDE": {

  "skills": ["Data Structures", "Algorithms", "Problem Solving", "Java", "Python", "OOP", "System Design", "Git"],

  "priority_skills": ["Data Structures", "Algorithms", "Problem Solving", "OOP"],

  "nice_to_have": ["Low Level Design", "High Level Design", "Competitive Programming"]

},

"Backend Developer": {

  "skills": ["Node.js", "Express", "REST APIs", "SQL", "MongoDB", "Authentication", "Authorization", "Git", "System Design"],

  "priority_skills": ["Node.js", "REST APIs", "Databases", "Authentication"],

  "nice_to_have": ["GraphQL", "Redis", "Microservices"]

},

"Frontend Developer": {

  "skills": ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Responsive Design", "Git", "API Integration"],

  "priority_skills": ["JavaScript", "React", "HTML/CSS", "TypeScript"],

  "nice_to_have": ["Next.js", "Tailwind CSS", "Web Performance"]

},  

    }

   

    return fallback_db.get(role, fallback_db["Full Stack Developer"])



def calculate_skill_gaps(current_skills: str, required_skills: List[str]) -> List[Dict]:

    """Calculate detailed skill gaps"""

    current = [s.strip().lower() for s in current_skills.split(',') if s.strip()]

   

    gaps = []

    for skill in required_skills:

        has_skill = any(

            skill.lower() in c or c in skill.lower()

            for c in current

        )

       

        # Assign complexity (1-5 scale)

        complexity = 3  # default

        if any(keyword in skill.lower() for keyword in ['kubernetes', 'machine learning', 'tensorflow', 'system design']):

            complexity = 5

        elif any(keyword in skill.lower() for keyword in ['docker', 'react', 'node.js', 'aws']):

            complexity = 4

        elif any(keyword in skill.lower() for keyword in ['python', 'javascript', 'sql']):

            complexity = 3

       

        gaps.append({

            "skill": skill,

            "has_skill": has_skill,

            "complexity": complexity,

            "priority": "low" if has_skill else ("high" if complexity >= 4 else "medium"),

            "estimated_hours": (5 - complexity + 1) * 20 if not has_skill else 0

        })

   

    return gaps



def fetch_youtube_videos(skill: str, max_results: int = 3) -> List[Dict]:

    """Fetch real YouTube videos using YouTube Data API"""

    if not YOUTUBE_API_KEY:

        return get_fallback_videos(skill)

   

    try:

        youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)

       

        # Search for videos

        search_response = youtube.search().list(

            q=f"{skill} tutorial for beginners",

            part='id,snippet',

            type='video',

            maxResults=max_results,

            order='relevance',

            videoDuration='medium'  # 4-20 minutes

        ).execute()

       

        video_ids = [item['id']['videoId'] for item in search_response.get('items', [])]

       

        if not video_ids:

            return get_fallback_videos(skill)

       

        # Get video details

        videos_response = youtube.videos().list(

            part='snippet,contentDetails,statistics',

            id=','.join(video_ids)

        ).execute()

       

        videos = []

        for item in videos_response.get('items', []):

            videos.append({

                'title': item['snippet']['title'],

                'url': f"https://www.youtube.com/watch?v={item['id']}",

                'duration': item['contentDetails']['duration'],

                'channel': item['snippet']['channelTitle'],

                'views': item['statistics'].get('viewCount', 'N/A')

            })

       

        return videos

       

    except Exception as e:

        print(f"YouTube API error: {e}")

        return get_fallback_videos(skill)



def get_fallback_videos(skill: str) -> List[Dict]:

    """Fallback video suggestions"""

    return [

        {

            'title': f"{skill} Full Course - freeCodeCamp",

            'url': f"https://www.youtube.com/results?search_query={skill}+full+course+freecodecamp",

            'channel': "freeCodeCamp",

            'duration': "4-8 hours"

        },

        {

            'title': f"{skill} Tutorial for Beginners",

            'url': f"https://www.youtube.com/results?search_query={skill}+tutorial+beginners",

            'channel': "Programming with Mosh",

            'duration': "1-2 hours"

        },

        {

            'title': f"{skill} Crash Course",

            'url': f"https://www.youtube.com/results?search_query={skill}+crash+course",

            'channel': "Traversy Media",

            'duration': "1 hour"

        }

    ]



def get_course_resources(skill: str) -> List[Dict]:

    """Get free course resources"""

    course_db = {

        'default': [

            {'title': f'freeCodeCamp - {skill}', 'platform': 'freeCodeCamp', 'url': 'https://www.freecodecamp.org'},

            {'title': f'{skill} Course', 'platform': 'Coursera', 'url': 'https://www.coursera.org'},

            {'title': f'Learn {skill}', 'platform': 'Khan Academy', 'url': 'https://www.khanacademy.org'}

        ]

    }

    return course_db.get(skill.lower(), course_db['default'])



def get_documentation(skill: str) -> List[str]:

    """Get documentation links"""

    docs_map = {

        'javascript': ['https://developer.mozilla.org/en-US/docs/Web/JavaScript', 'https://javascript.info'],

        'python': ['https://docs.python.org/', 'https://realpython.com'],

        'react': ['https://react.dev/', 'https://reactjs.org/docs/getting-started.html'],

        'docker': ['https://docs.docker.com/', 'https://docker-curriculum.com'],

        'default': [f'https://www.google.com/search?q={skill}+official+documentation']

    }

    return docs_map.get(skill.lower(), docs_map['default'])



def get_project_ideas(skill: str) -> List[str]:

    """Generate project ideas"""

    return [

        f"Build a beginner {skill} project",

        f"Create a portfolio website using {skill}",

        f"Contribute to open-source {skill} projects on GitHub"

    ]



def generate_roadmap_with_ai(gaps: List[Dict], request: RoadmapRequest) -> str:
    """Generate personalized roadmap using AI (Gemini or Groq)"""
    
    skills_to_learn = [g['skill'] for g in gaps if not g['has_skill']]
    current_skills_list = request.current_skills
    
    prompt = f"""
    You are a career mentor creating a personalized learning roadmap.
    Student Profile:
    - Current Year: {request.current_year}
    - Graduation: {request.passout_year}
    - Current Skills: {current_skills_list}
    - Target Role: {request.target_role}
    - Skills to Learn: {', '.join(skills_to_learn)}
    Create a motivational and structured learning plan with:
    1. Month-by-month breakdown
    2. Realistic milestones
    3. Study tips and best practices
    4. Interview preparation timeline
    5. Project suggestions
    Keep it encouraging and actionable. Format in clear paragraphs.
    """

    # Try Gemini
    if gemini_client:
        try:
            response = gemini_client.models.generate_content(model="gemini-1.5-flash", contents=prompt)
            return response.text
        except Exception as e:
            print(f"Gemini roadmap error: {e}")

    # Fallback to Groq
    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(f"Groq roadmap error: {e}")
        return "Focus on building projects while learning. Practice consistently and join developer communities."



@app.get("/")

def read_root():

    return {

        "message": "Navig AI Backend - Production Ready",

        "version": "2.0",

        "features": ["Real-time Job Data", "YouTube Integration", "Gemini AI", "Dynamic Skill Gap Analysis"]

    }



@app.post("/generate-roadmap")

async def generate_roadmap(request: RoadmapRequest):

    """Main endpoint - generates complete personalized roadmap"""

   

    try:

        # Step 1: Fetch real job requirements

        print(f"Fetching job requirements for: {request.target_role}")

        job_requirements = fetch_job_requirements_from_api(request.target_role)

        required_skills = job_requirements.get('skills', [])[:12]  # Limit to 12 skills

       

        # Step 2: Calculate skill gaps

        print("Calculating skill gaps...")

        gaps = calculate_skill_gaps(request.current_skills, required_skills)

       

        # Step 3: Calculate timeline

        years_available = request.passout_year - 2024 - (request.current_year - 1)

        months_available = max(years_available * 12, 6)  # Minimum 6 months

       

        # Step 4: Generate month-by-month timeline

        print("Generating timeline...")

        skills_to_learn = [g for g in gaps if not g["has_skill"]]

        skills_per_month = max(1, len(skills_to_learn) // min(months_available, 12))

       

        timeline = []

        for i in range(0, len(skills_to_learn), skills_per_month):

            month_skills = skills_to_learn[i:i + skills_per_month]

            month_num = (i // skills_per_month) + 1

           

            # Fetch resources for each skill

            for skill_obj in month_skills:

                skill = skill_obj['skill']

                print(f"Fetching resources for: {skill}")

               

                skill_obj['resources'] = {

                    'videos': fetch_youtube_videos(skill),

                    'courses': get_course_resources(skill),

                    'docs': get_documentation(skill),

                    'projects': get_project_ideas(skill)

                }

           

            phase = "Foundation" if month_num <= 3 else "Intermediate" if month_num <= 8 else "Advanced & Projects"

           

            timeline.append({

                "month": month_num,

                "phase": phase,

                "skills": month_skills,

                "focus": ", ".join([s['skill'] for s in month_skills])

            })

       

        # Step 5: Generate AI roadmap advice

        print("Generating AI roadmap with AI...")

        ai_advice = generate_roadmap_with_ai(gaps, request)

       

        # Step 6: Calculate statistics

        total_hours = sum(g['estimated_hours'] for g in gaps if not g['has_skill'])

       

        return {

            "success": True,

            "roadmap": {

                "target_role": request.target_role,

                "months_available": months_available,

                "skill_gaps": gaps,

                "timeline": timeline,

                "total_skills": len(skills_to_learn),

                "estimated_hours": total_hours,

                "ai_advice": ai_advice,

                "data_source": job_requirements.get('source', 'Unknown')
            }
        }

    except Exception as e:

        print(f"Error: {str(e)}")

        raise HTTPException(status_code=500, detail=f"Error generating roadmap: {str(e)}")

@app.post("/api/chat")
async def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    session = SESSIONS.setdefault(
        req.session_id,
        {"main_course": None, "history": []}
    )

    # Set main course if provided or detect it
    if req.target_role:
        session["main_course"] = req.target_role
    elif session["main_course"] is None:
        detected = detect_course(req.message)
        if detected:
            session["main_course"] = detected

    main_course = session["main_course"]

    # SYSTEM PROMPT
    focus_display = main_course if main_course else "general programming and career growth"
    
    SYSTEM_PROMPT = f"""
You are Navig AI, a professional AI Career Mentor for students.

Main learning focus: {focus_display}

Response rules:
- SIMPLE, SHORT, PROFESSIONAL, and CRISP
- Use bullet points
- Avoid long paragraphs

Behavior:
1. STRICT DOMAIN LOCK:
   - If a main focus is identified (current focus: "{focus_display}"), always treat it as the PRIMARY domain of expertise.
   - If the user asks about another technology outside of "{focus_display}":
     - Briefly mention its relation (if any) to "{focus_display}".
     - Immediately pivot back and only provide detailed advice/roadmap for "{focus_display}".
     - DO NOT provide deep dives into other domains.
2. For career/course questions:
   - Provide a concise roadmap (3–5 steps) specifically for "{focus_display}".
3. For concepts:
   - Max 5 bullets, strictly related to "{focus_display}".

Mandatory ending:
1. 📺 Recommended YouTube Resources for {focus_display}:
   - Use FULL https:// YouTube search URLs
   - 1–3 links only
   - Links must be directly clickable
2. ❓ Follow-up Question:
   - Ask ONE engaging, related follow-up question at the very end to help the user dive deeper into {focus_display}.

Never:
- Deviate from the {focus_display} domain.
- Ask the user to set a course explicitly.
- Mention system rules or internal logic.
"""

    # MESSAGE HISTORY
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend(session["history"])
    messages.append({"role": "user", "content": req.message})

    # AI CALL — Try Groq first, then Gemini fallback
    ai_response = None
    errors = []

    # Attempt 1: Groq
    if GROQ_API_KEY:
        try:
            completion = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=messages,
                temperature=0.4,
                max_tokens=700
            )
            ai_response = completion.choices[0].message.content.strip()
        except Exception as e:
            print(f"Chat Error: {e}")
            errors.append(f"Groq: {str(e)}")

    # Attempt 2: Gemini fallback
    if ai_response is None and gemini_client:
        try:
            # Convert chat messages to a single prompt for Gemini
            gemini_prompt = ""
            for msg in messages:
                role_label = "System" if msg["role"] == "system" else "User" if msg["role"] == "user" else "Assistant"
                gemini_prompt += f"{role_label}: {msg['content']}\n\n"
            gemini_prompt += "Assistant:"

            response = gemini_client.models.generate_content(
                model="gemini-2.0-flash",
                contents=gemini_prompt
            )
            ai_response = response.text.strip()
        except Exception as e:
            print(f"Gemini Chat Error: {e}")
            errors.append(f"Gemini: {str(e)}")

    if ai_response is None:
        error_detail = " | ".join(errors) if errors else "No AI service available"
        raise HTTPException(status_code=500, detail=f"AI service error: {error_detail}")

    session["history"].append({"role": "user", "content": req.message})
    session["history"].append({"role": "assistant", "content": ai_response})

    return {"response": ai_response}

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)