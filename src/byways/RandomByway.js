import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import BywayApi from "../api/api";

function DisplayRandomByway() {
    const history = useHistory();
    const [byway, setByway] = useState(null);
    async function findOne() {
        let byway = await BywayApi.getRandomByway();
        setByway(byway);
    }

    useEffect(() => {
        

        findOne();
    }, [])

    function handleSubmit(evt) {
        findOne();
    }
    // routing for random, link on main page, api, routes, model?

    return (
        <div>
            {byway
                ? (
                   <div> 
                    <h1>Check out {byway.name} in {byway.state}!</h1>
                    <img src={byway.image} alt={byway.name}></img>
                    <p>{byway.description}</p>
                    <Link to={`/byways/${byway.name}`}>Go to this byway's page to learn more, comment, and favorite {byway.name}.</Link>
                    <br></br><button onClick={handleSubmit}>
                        Try another byway
                    </button>
                    </div>
                ) : (

                    <p>the code don't work</p>
                )
                
            }
        </div>
    )
}

export default DisplayRandomByway;