from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from apptypes import Member
from database import create_database, create_member, get_all_members, get_member, get_children_of

app = FastAPI()

app.mount("/images", StaticFiles(directory="images"), name="images")


@app.get("/members")
async def give_members():
    members = get_all_members()
    return members


@app.get("/members/{id}")
async def throw_member(id: str):
    member = get_member(id)
    return member


@app.get("/childrenof/{id}")
async def give_children_of(id: str):
    children = get_children_of(id)
    return children
