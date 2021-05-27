from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from apptypes import Member
from database import create_database, create_member, get_all_members, get_children_of, update_member, get_member

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
    print(children)
    return children


@app.post("/members/{id}")
async def update_member_with_id(id: str, name, parent, photo):
    update_member(id, name, photo, parent)
    return f"Updated member {name} "
