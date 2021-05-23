import React, { FunctionComponent, useEffect, useState } from "react";

import Image from "../../components/Image";

import styles from "../../styles/admin/index.module.css";

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
    return (
        <div>
            <header style={{display: "flex", justifyContent: "center"}}>
                <h2>Editing member {member.name} </h2>
            </header>

            <div className={styles.editMemberCon}>
                <Image name={`${member.name}`} src={`/images/${member.photo}`} loadingLazy={false} />
                <h2> {name} </h2>
            </div>
            <main>
                <form className={styles.form}>
                    <input value={name} onChange={event => handleInputChange(event, setName)} type="text" placeholder="Enter a name" />
                    <input value={parent} onChange={event => handleInputChange(event, setParent)} type="text" placeholder="Parent ID" />
                    <input value={photo} onChange={event => handleInputChange(event, setPhoto)} type="text" placeholder="Photo name" />
                    <button>
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