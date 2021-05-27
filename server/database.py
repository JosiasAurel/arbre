
import sqlite3
from utils import random_id

conn = sqlite3.connect("arbre.db")

cursor = conn.cursor()


def create_database() -> None:
    command = "CREATE TABLE arbre (ID text, name VARCHAR(120), photo VARCHAR(50), parent text)"
    cursor.execute(command)  # execute table creation
    conn.commit()  # commit change to db
    return None


def create_member(name: str, photo: str, parent: str) -> str:
    command = "INSERT INTO arbre VALUES (?, ?, ?, ?)"
    # create member
    id = random_id()  # gen ID for the new member
    cursor.execute(command, (id, name, photo, parent, ))
    try:
        conn.commit()  # commit changes to db
        member = {
            "id": id,
            "name": name,
            "photo": photo,
            "parent": parent
        }
        return member
    except:
        return "Member creation failed"


def get_member(id: str) -> dict:
    command = "SELECT * from arbre WHERE ID=?"
    result = cursor.execute(command, (id, )).fetchone()
    member = {
        "id": result[0],
        "name": result[1],
        "photo": result[2],
        "parent": result[3]
    }
    return member


def get_all_members():
    command = "SELECT * from arbre"
    members = cursor.execute(command).fetchall()

    for member in range(0, len(members)):  # range(0, len(members))
        members[member] = {"id": members[member][0],
                           "name": members[member][1], "photo": members[member][2], "parent": members[member][3]}
    return members


def delete_member(id) -> str:
    command = "DELETE FROM arbre WHERE ID=?"
    cursor.execute(command, (id, ))
    conn.commit()
    return f"Deleted member with ID {id} "


def get_children_of(id: str) -> dict:
    command = "SELECT * FROM arbre WHERE parent=?"
    children = cursor.execute(command, (id, )).fetchall()
    children_ = []
    for child in range(0, len(children)):
        children_.append({"id": children[child][0],
                          "name": children[child][1], "photo": children[child][2], "parent": children[child][3]})

    return children_


def update_member(id: str, name: str, photo: str, parent: str) -> str:
    command = "UPDATE arbe SET ID = ?, name = ?, photo = ?, parent = ? WHERE ID = ?"
    cursor.execute(command, (id, name, photo, parent, id))
    conn.commit()
    return f"Updated values for member with ID {id} "
