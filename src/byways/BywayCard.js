import React from "react";
import { Link } from "react-router-dom";
import "./BywayCard.css"

// name, nickname and image are state info, not byways - (name, state, length, designation, fees, image, description, geographic_features)
function BywayCard ({ name, designation, image, id }) {
    return (
        <span className="byway-card">
            <Link to={`/byways/${name}`} class="link-offset-2 link-underline link-underline-opacity-0">
                <h3 className="byway-card-name">{name}</h3>
                <img src={image} alt={name} className="byway-card-image"/>
                <h4 className="byway-card-designation">{designation}</h4>
            </Link>
        </span>
    );
}

export default BywayCard;