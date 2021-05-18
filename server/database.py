
import sqlite3

conn = sqlite3.connect("arbre.db")

cursor = conn.cursor()


def create_database() -> None:
    command = "CREATE TABLE arbre (PRIMARY INT ID, name VARCHAR(120), photo VARCHAR(50), parent INT)"
    cursor.execute(command)  # execute table creation
    conn.commit()  # commit change to db
    return None


def create_member(name: str, photo: str, parent: int) -> str:
    command = "INSERT INTO arbre VALUES (?, ?, ?)"
    cursor.execute(command, (name, photo, parent))  # create member
    conn.commit()  # commit changes to db
    return f"Created member {name} "
