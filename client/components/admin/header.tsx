import React, { FunctionComponent } from "react";

import styles from "../../styles/admin/index.module.css";

interface HeaderProps {
    doing? : string
}

const Header: FunctionComponent<HeaderProps> = ({ doing }): JSX.Element => {
    return (
        <header className={styles.header}>
            <div>
                <h2>Arbre Admin</h2>
            <p> { doing } </p>
            </div>
        </header>
    )
}

export default Header;