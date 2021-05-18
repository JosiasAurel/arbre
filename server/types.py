from pydantic import BaseModel


class Member(BaseModel):
    name: str
    photo: str
    parent: str
