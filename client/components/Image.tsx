import React, { FunctionComponent } from "react";

interface ImageProps {
    name: string,
    src: string,
    loadingLazy: true
}

const Image: FunctionComponent<ImageProps> = ({ name, src, loadingLazy }): JSX.Element => {
    return (
        <div>
            <img src={src} alt={name} loading={loadingLazy ? "lazy" : "eager"} />
        </div>
    )
}

export default Image;