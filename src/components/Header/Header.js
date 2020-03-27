import React from "react";

export default function Header(props) {

    const { title } = props;

    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
}
