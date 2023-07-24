import React from "react";
import { Link } from "react-router-dom";


function StateCard ({ name, nickname, image }) {
    return (
        <span>
            <h3><Link to={`/states/${name}`}>{name}</Link></h3>
            {image}
            <h4>{nickname}</h4>
        </span>
    );
}

export default StateCard;