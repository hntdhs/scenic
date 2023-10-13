import React from "react";
import { Link } from "react-router-dom";
import "./StateCard.css"


function StateCard ({ name, nickname, image, className }) {
    return (
        <span class='state' className={className}>
            <Link id={name} to={`/states/${name}`} class="link-offset-2 link-underline link-underline-opacity-0">
                <h3 className="state-name">{name}</h3>
                {image}
                <h4 className="state-nickname">{nickname}</h4>
            </Link>
        </span>
    );
}

// function StateCard ({ name, nickname, image }) {
//     return (
//         <span class='state'>
//             <h3><Link id={name} to={`/states/${name}`}>{name}</Link></h3>
//             {image}
//             <h4>{nickname}</h4>
//         </span>
//     );
// }

export default StateCard;