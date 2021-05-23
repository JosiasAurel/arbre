import React,  { FunctionComponent } from "react";

import styles from "../styles/components.module.css";

import Image from "./Image";

import { useRouter } from "next/router";

interface MemberProps {
    name: string,
    photo: string,
    childrenCount?: number,
    id: string,
    goTo: string
}

const MemberCard: FunctionComponent<MemberProps> = ({ id, name, photo,  childrenCount, goTo }): JSX.Element => {

    const router = useRouter();

    function routeToMember(memberId: string) {
        router.push(goTo);
    }

    return (
        <div onClick={() => routeToMember(id)} className={styles.memberCard}>
            <Image src={`/images/${photo}`} name={name} loadingLazy={true} />
            <h2> {name} </h2>
            {
                childrenCount ? 
                <p>Children : {childrenCount} </p>
                : ""
            }
        </div>
    )
}

export default MemberCard;