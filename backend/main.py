from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
from config import DB

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI application!"}

@app.get("/session-settings")
async def get_all_session_settings():
    settings = await DB["session_settings"].find().to_list(100)
    return [{"id": str(setting["_id"]), **setting} for setting in settings]

@app.get("/session-settings/{setting_id}")
async def get_session_setting_by_id(setting_id: str):
    setting = await DB["session_settings"].find_one({"_id": ObjectId(setting_id)})
    if not setting:
        raise HTTPException(status_code=404, detail="Session setting not found")
    setting["id"] = str(setting["_id"])
    del setting["_id"]
    return setting

@app.post("/session-settings")
async def save_session_setting(setting: dict):
    setting_id = setting.pop("id")
    if ObjectId.is_valid(setting_id) and await DB["session_settings"].find_one({"_id": ObjectId(setting_id)}):
        result = await DB["session_settings"].replace_one(
            {"_id": ObjectId(setting_id)}, 
            setting
        )
        if result.matched_count > 0:
            return {"message": "Session setting updated successfully", "id": setting_id}
        else:
            raise HTTPException(status_code=404, detail="Session setting not found")
    else:
        result = await DB["session_settings"].insert_one(setting)
        return {"id": str(result.inserted_id)}

@app.delete("/session-settings/{setting_id}")
async def delete_session_setting(setting_id: str):
    if not ObjectId.is_valid(setting_id):
        return
    result = await DB["session_settings"].delete_one({"_id": ObjectId(setting_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Session setting not found")
    return {"message": "Session setting deleted successfully"}