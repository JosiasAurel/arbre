from fastapi import FastAPI
from .types import Member
from .database import create_database, create_member, get_all_members, get_member

app = FastAPI()


@app.get("/members")
async def give_members():
    members = get_all_members()
    return members


@app.get("/members/{id}")
async def throw_member(id: str):
    member = get_member(id)
    return member
