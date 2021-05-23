import React, { FunctionComponent, useEffect } from "react";

import MemberCard from "../components/MemberCard";

import styles from "../styles/page.module.css";

interface IndexProps {
    data: Array
}

const Index: FunctionComponent<IndexProps> = ({ data }): JSX.Element => {
    useEffect(() => console.log(data));
    return (
        <div>
            <h2 style={{textAlign: "center"}}>All The Members</h2>
            <main className={styles.indexMembers}>
                {
                    data.map(member => {
                    return (
                        <MemberCard id={member.id} name={member.name} photo={member.photo} goTo={`/${member.id}`}  />
                    )
                })
                }
            </main>
        </div>
    )
};

export async function getServerSideProps(ctx) {
    let res = await fetch("http://localhost:8000/members");
    let data = await res.json();

    return {
        props: { data }
    }
}

export default Index;