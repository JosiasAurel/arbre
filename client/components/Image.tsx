import React, { FunctionComponent } from "react";

import styles from "../styles/components.module.css";

interface ImageProps {
    name: string,
    src: string,
    loadingLazy: boolean
}

const Image: FunctionComponent<ImageProps> = ({ name, src, loadingLazy }): JSX.Element => {
    return (
        <div className={styles.centerImageImageComponent}>
            <img src={`http://localhost:8000${src}`} alt={name} loading={loadingLazy ? "lazy" : "eager"} />
        </div>
    )
}

export default Image;