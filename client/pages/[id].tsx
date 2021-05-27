import React, { FunctionComponent, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import MemberCard from "../components/MemberCard";
import ChildCount from "../components/childCount";

import styles from "../styles/page.module.css";

interface ParentChildProps {
    memberData: any
    childrenData: any
}

const ParentAndChildPage: FunctionComponent<ParentChildProps> = ({ memberData, childrenData }): JSX.Element => {
    useEffect(() => console.log(childrenData));

    return (
        <div>
            <Head>
                <link rel="shortcut icon" href="/arbre.png" />
            </Head>
            <header>
                <Link href="/">
                    <h2>Home</h2>
                </Link>
            </header>
            <div className={styles.parent}>
                <MemberCard name={memberData.name} photo={memberData.photo} id={memberData.id} goTo={undefined}  />
                <ChildCount count={childrenData.length} />
            </div>

            <main className={styles.childrenGrid}>
                {childrenData.map(child => {
                    return (
                        <MemberCard key={child.id} name={child.name} photo={child.photo} id={child.id} goTo={child.id} />
                    )
                })}
            </main>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    let memberId = ctx.query.id;

    // get the member with id
    let memberRes = await fetch(`http://localhost:8000/members/${memberId}`);
    let memberData = await memberRes.json();

    // get children of *ctx.query*
    let childrenRes = await fetch(`http://localhost:8000/childrenof/${memberId}`);
    let childrenData = await childrenRes.json();

    console.log(childrenData);

    return {
        props: { memberData, childrenData }
    }
}

export default ParentAndChildPage;