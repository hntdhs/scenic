import React from "react";
import { Link } from "react-router-dom";


function StateCard ({ name, nickname, image }) {
    return (
        <Link to={`/states/${name}`}>
            <h3>{name}</h3>
            {image}
            <h4>{nickname}</h4>
        </Link>
    );
}

export default StateCard;