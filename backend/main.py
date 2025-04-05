from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or set specific IPs like ["http://192.168.1.123:8081"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logs = []



class SymptomLog(BaseModel):
    pain: int
    nausea: int
    notes: Optional[str] = ""

@app.post("/log")
def submit_log(log: SymptomLog):
    print("📥 Received log:", log.dict())  # ← logs to your terminal
    logs.append(log)
    return {"message": "Log received", "total_logs": len(logs)}


@app.get("/summary")
def get_summary():
    if not logs:
        return {"average_pain": 0, "average_nausea": 0, "logs": []}

    avg_pain = sum(log.pain for log in logs) / len(logs)
    avg_nausea = sum(log.nausea for log in logs) / len(logs)
    return {
        "average_pain": round(avg_pain, 2),
        "average_nausea": round(avg_nausea, 2),
        "logs": jsonable_encoder(logs)  # 👈 Safe serialization
    }

