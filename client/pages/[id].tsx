import React, { FunctionComponent } from "react";

import { GetServerSideProps } from "next";

const ParentAndChildPage: FunctionComponent = (): JSX.Element => {
    return (
        <div>
            <h2>Yo!</h2>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    let memberId = ctx.query.id;

    // get the member with id
    let memberRes = await fetch(`http://localhost:8000/members/${memberId}`);
    let memberData = await memberRes.json();

    return {
        props: ctx.query
    }
}

export default ParentAndChildPage;