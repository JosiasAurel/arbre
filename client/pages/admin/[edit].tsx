import React, { FunctionComponent, useEffect, useState } from "react";

import Image from "../../components/Image";

import styles from "../../styles/admin/index.module.css";

import Link from "next/link";

interface EditPageProps {
    data: any
}

function handleInputChange(event, handler) {
    handler(event.target.value);
}

const EditMemberPage: FunctionComponent<EditPageProps> = ({ data }): JSX.Element => {
    const [member, setMember] = useState(data);
    const [newMember, setNewMember] = useState({});
    const [name, setName] = useState("");
    const [parent, setParent] = useState("");
    const [photo, setPhoto] = useState("");
    useEffect(() => {
        setName(member.name);
        setParent(member.parent);
        setPhoto(member.photo);
    }, [member]);

    function submitUpdatedMember(event) {
        event.preventDefault();
        fetch(`https://localhost:8000/members/${member.id}?name=${name}&parent=${parent ? parent : "none"}&photo=${photo}`, {
            method: "POST"
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }
    return (
        <div>
            <header style={{display: "flex", justifyContent: "space-evenly"}}>
                <Link href="/admin">
                    <h2 style={{color: "blue", cursor: "pointer"}}>Home</h2>
                </Link>
                <h2>Editing member {member.name} </h2>
            </header>

            <div className={styles.editMemberCon}>
                <Image name={`${member.name}`} src={`/images/${member.photo}`} loadingLazy={false} />
                <h2> {name} </h2>
            </div>
            <main>
                <form onSubmit={event => submitUpdatedMember(event)} className={styles.form}>
                    <input value={name} onChange={event => handleInputChange(event, setName)} type="text" placeholder="Enter a name" />
                    <input value={parent} onChange={event => handleInputChange(event, setParent)} type="text" placeholder="Parent ID" />
                    <input value={photo} onChange={event => handleInputChange(event, setPhoto)} type="text" placeholder="Photo name" />
                    <button type="submit">
                        Save
                    </button>
                </form>
            </main>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const memberId = ctx.query.edit;

    const memberRes = await fetch(`http://localhost:8000/members/${memberId}`);
    const memberData = await memberRes.json();
    
    return {
        props: { data: memberData }
    }
}

export default EditMemberPage;