# Simple in-memory DB (replace with MongoDB later)

user_progress = {}

def update_progress(user_id: str, skill: str, status: str):
    if user_id not in user_progress:
        user_progress[user_id] = {}

    user_progress[user_id][skill] = status

def get_progress_summary(user_id: str):
    progress = user_progress.get(user_id, {})
    completed = sum(1 for s in progress.values() if s == "completed")
    total = len(progress)

    return f"{completed}/{total} skills completed"
