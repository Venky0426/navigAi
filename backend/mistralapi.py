from mistralai.client import MistralClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MistralClient(
    api_key=os.getenv("MISTRAL_API_KEY")
)

def chat_with_mistral(prompt: str):
    response = client.chat(
        model="mistral-medium",
        messages=[
            {"role": "system", "content": "You are a helpful AI mentor for students."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content
