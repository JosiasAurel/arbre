import React, { FunctionComponent } from "react";

import { useRouter } from "next/router";

import Header from "../../components/admin/header";
import MemberCard from "../../components/MemberCard";

import styles from "../../styles/admin/index.module.css";

interface IndexProps {
    data: any
}

const AdminIndex: FunctionComponent<IndexProps> = ({ data }): JSX.Element => {
    const router = useRouter();
    return (
        <div>
            <Header />
            <div className={styles.createControls}>
                <button onClick={() => router.push("/admin/create")}>
                    + Create New Member
                </button>
            </div>

            <main className={styles.indexMembers}>
                {
                    data.map(member => {
                    return (
                        <MemberCard id={member.id} name={member.name} photo={`${member.photo}`} goTo={`/admin/${member.id}`}  />
                    )
                })
                }
            </main>
        </div>
    )
} 

export async function getServerSideProps(ctx) {
    let res = await fetch("http://localhost:8000/members");
    let data = await res.json();

    return {
        props: { data }
    }
}


export default AdminIndex;