from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
from collections import Counter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logs = []

class SymptomLog(BaseModel):
    pain: int
    nausea: int
    fatigue: int
    diarrhea: int
    appetite_loss: int
    weight_change: int
    blood_in_stool: int
    stress_level: int
    notes: Optional[str] = ""

@app.post("/log")
def submit_log(log: SymptomLog):
    print("📥 Received log:", log.dict())
    logs.append(log)
    return {"message": "Log received", "total_logs": len(logs)}

@app.get("/summary")
def get_summary():
    if not logs:
        return {
            "averages": {},
            "most_frequent_symptom": None,
            "most_severe_symptom": None,
            "alerts": [],
            "logs": []
        }

    symptoms = ["pain", "nausea", "fatigue", "diarrhea", "appetite_loss", "weight_change", "blood_in_stool", "stress_level"]

    # Compute averages
    averages = {}
    for symptom in symptoms:
        averages[symptom] = round(sum(getattr(log, symptom) for log in logs) / len(logs), 2)

    # Get most severe symptom (highest average)
    most_severe_symptom = max(averages, key=lambda k: averages[k])

    # Get most frequent note/symptom
    notes = [log.notes.strip().lower() for log in logs if log.notes]
    most_common_note = Counter(notes).most_common(1)
    most_frequent_symptom = most_common_note[0][0] if most_common_note else None

    # Health alerts (custom thresholds)
    alerts = []
    for symptom, value in averages.items():
        if value >= 7:
            alerts.append(f"High {symptom.replace('_', ' ')} detected. Consider contacting a doctor.")

    return {
        "averages": averages,
        "most_severe_symptom": most_severe_symptom,
        "most_frequent_symptom": most_frequent_symptom,
        "alerts": alerts,
        "logs": logs
    }
