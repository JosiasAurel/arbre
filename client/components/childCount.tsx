import React, { FunctionComponent } from "react";

import styles from "../styles/components.module.css";

interface ChildCountProps {
    count: string
}

const ChildCount: FunctionComponent<ChildCountProps> = ({ count }): JSX.Element => {
    return (
        <div className={styles.childCountCard}>
            <h2> { count } </h2>
        </div>
    )
}

export default ChildCount;