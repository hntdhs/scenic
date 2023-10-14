
import React, { useEffect, useState } from "react";
import BywayApi from "../api/api";
import { Link } from "react-router-dom";
import StateCard from "./StateCard";
import "./StateMenu.css"


function StateMenu() {

    const [states, setStates] = useState([]);

    useEffect(() => {
        async function getStates() {

            let states = await BywayApi.getAllStates();
            console.log('received states', states)
            setStates(states);
        }
        getStates();
    }, []);

    return (
        <div className="float-container container-fluid ">
            <div class="container text-center" id="app-name">
                <Link class="link-offset-2 link-underline link-underline-opacity-0 homepage-link" to="/"><h1>NATIONAL SCENIC BYWAYS</h1></Link>
            </div>
            <div class='row'>
                {states.length
                // states.length > 0
                ? (states.map(s => (
                            <StateCard
                                key={s.name}
                                name={s.name}
                                nickname={s.nickname}
                                image={<img src={s.image} alt={s.name} className="state-image"/>}
                                className="card col-4"
                            />
                        ))
                    
                ) : (
                    <h4>Sorry, no results found.</h4>
                )}
            </div>
        </div>
    );
}

export default StateMenu;

