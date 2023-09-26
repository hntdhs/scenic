import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import BywayApi from "../api/api";
import "./RandomByway.css"

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
                return byway.description.slice(0,499) + "... (continued on byway's page)"
            } else {
                return byway.description;
            }
        }

    return (
        <div>
            <div class="container text-center" id="app-name">
                <h1>NATIONAL SCENIC BYWAYS</h1>
            </div>
            {byway
                ? (
                   <div className="all-random-content"> 
                       <div className="welcome-message">
                            <h1>Check out <span className="random-byway-name">{byway.name}</span> in {byway.state}!</h1>
                        </div>
                        <div className="container-fluid">
                            <img src={byway.image} alt={byway.name} className="byway-img"></img>
                            <img src={byway.image} alt={byway.name} className="byway-img"></img>
                            <img src={byway.image} alt={byway.name} className="byway-img"></img>
                            <img src={byway.image} alt={byway.name} className="byway-img"></img>
                            <img src={byway.image} alt={byway.name} className="byway-img"></img>
                        </div>
                        <div className="byway-info">
                            <p className="byway-desc">{truncateCharCount(byway)}</p>
                            <div className="go-to-byway">
                                <Link to={`/byways/${byway.name}`} className="link-offset-2 link-danger">Go to this byway's page to learn more, comment, and favorite {byway.name}.</Link>
                            </div>
                            <button onClick={handleSubmit} class="btn btn-outline-success btn-lg">
                                Try another byway
                            </button>
                        </div>
                    </div>
                ) : (

                    <p>the code don't work</p>
                )
                // pass in large amount of text and be sure it's not longer than 500
                
            }
        </div>
    )
}

export default DisplayRandomByway;