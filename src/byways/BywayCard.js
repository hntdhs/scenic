import React from "react";
import { Link } from "react-router-dom";

// name, nickname and image are state info, not byways - (name, state, length, designation, fees, image, description, geographic_features)
function BywayCard ({ name, designation, image }) {
    return (
        <div>
            <Link to={`/byways/${name}`}>
                <h3>{name}</h3>
                <img src={image} alt={name} />
                <h4>{designation}</h4>
            </Link>
        </div>
    );
}

export default BywayCard;