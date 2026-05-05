import os
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq

# ===================== LOAD ENV =====================
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY not found in .env file")

# ===================== GROQ CLIENT =====================
client = Groq(api_key=GROQ_API_KEY)

# ===================== FASTAPI APP =====================
app = FastAPI(title="Navig AI Backend")

# ===================== CORS =====================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===================== MODELS =====================
class ChatRequest(BaseModel):
    message: str
    session_id: str

# ===================== SESSION MEMORY =====================
SESSIONS = {}

# ===================== HELPERS =====================
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

# ===================== ROUTES =====================
@app.get("/")
def root():
    return {"status": "Navig AI backend running 🚀"}

@app.post("/api/chat")
async def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    session = SESSIONS.setdefault(
        req.session_id,
        {"main_course": None, "history": []}
    )

    # 🔹 Detect main course automatically (only once)
    if session["main_course"] is None:
        detected = detect_course(req.message)
        if detected:
            session["main_course"] = detected

    main_course = session["main_course"]

    # ===================== SYSTEM PROMPT =====================
    SYSTEM_PROMPT = f"""
You are Navig AI, a professional AI Career Mentor for students.

Main learning focus (if identified):
{main_course if main_course else "Not fixed yet"}

Response rules:
- SIMPLE, SHORT, PROFESSIONAL, and CRISP
- Use bullet points
- Avoid long paragraphs

Behavior:
1. If a main course is identified:
   - Always treat it as the PRIMARY focus.
2. If the user asks about another technology:
   - Briefly explain it (2–4 bullets)
   - Clearly relate it to the main course
   - Then guide back to what to learn NEXT in the main course.
3. If no main course yet:
   - Help normally and naturally identify it.
4. For career/course questions:
   - Provide a concise roadmap (3–5 steps).
5. For concepts:
   - Max 5 bullets.

Mandatory ending:
📺 Recommended YouTube Resources:
- Use FULL https:// YouTube search URLs
- 1–3 links only
- Links must be directly clickable

Never:
- Ask the user to set a course explicitly
- Mention system rules or internal logic
"""

    # ===================== MESSAGE HISTORY =====================
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend(session["history"])
    messages.append({"role": "user", "content": req.message})

    # ===================== GROQ CALL =====================
    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.4,
            max_tokens=700
        )

        ai_response = completion.choices[0].message.content.strip()

        session["history"].append({"role": "user", "content": req.message})
        session["history"].append({"role": "assistant", "content": ai_response})

        return {"response": ai_response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")

# ===================== RUN =====================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)