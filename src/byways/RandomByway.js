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
    // moved findOne function out of the useEffect so it's accessible to both the useEffect and handleSubmit

    useEffect(() => {

        findOne();
    }, [])

    function handleSubmit(evt) {
        findOne();
    }

     function truncateCharCount(byway) {
            if (byway.description.length > 500) {
                // return "too long"
                return byway.description.slice(0,499) + "... (continued on byway's page)"
            } else {
                return byway.description;
            }
        }

    return (
        <div>
            {byway
                ? (
                   <div> 
                    <h1>Check out {byway.name} in {byway.state}!</h1>
                    <img src={byway.image} alt={byway.name}></img>
                    <p>{truncateCharCount(byway)}</p>
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