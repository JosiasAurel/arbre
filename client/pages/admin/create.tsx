import React, { FunctionComponent, useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/admin/header";

import styles from "../../styles/admin/index.module.css";

const CreateMemberHere: FunctionComponent = (): JSX.Element => {
    const [name, setName] = useState("");
    const [parent, setParent] = useState("");
    const [photo, setPhoto] = useState("");
    const [photoEl, setPhotoEl] = useState("");

    useEffect(() => {
        setPhotoEl(document.getElementById("photo"))
    }, [])

    function handleInputChange(event, handler) {
        handler(event.target.value);
    }

    function createNewMember(event) {
        event.preventDefault();
        let photoFile = photoEl.files[0];

        let imgBlog = new Blob([photoFile]);

        const reader = new FileReader();
        let resultB = reader.readAsArrayBuffer(imgBlog);
        // console.log(resultB);

        const newUser = {
            name: name,
            photo: imgBlog,
            parent: parent,
            photoType: photoEl.files[0].type.split("/")[1]
        }

        fetch(`http://localhost:8000/create`, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(res => res.text())
            .then(data => console.log(data))
    }
    return (
        <div>
            <header>
                <Header />
                <Link href="/admin">
                    <center>
                        <h2>Home</h2>
                    </center>
                </Link>
            </header>

            <div className={styles.centerForm}>
                <form onSubmit={e => createNewMember(e)} className={styles.createForm}>
                <input value={name} onChange={e => handleInputChange(e, setName)} type="text" placeholder="Enter a name" />
                <input value={parent} type="text" onChange={e => handleInputChange(e, setParent)} />
                <input id="photo" value={photo} onChange={e => handleInputChange(e, setPhoto)} type="file" name="memberPhoto" />
                <button type="submit">Create</button>
            </form>
            </div>
        </div>
    )
}

export default CreateMemberHere;