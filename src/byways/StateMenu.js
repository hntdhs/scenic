
import React, { useEffect, useState } from "react";
import BywayApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import StateCard from "./StateCard";



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
        <div>
            {states.length
            // states.length > 0
            ? (
                <div>
                    {states.map(s => (
                        <StateCard
                            key={s.name}
                            name={s.name}
                            nickname={s.nickname}
                            image={<img src={s.image} alt={s.name}/>}
                        />
                    ))}
                </div>
            ) : (
                <h4>Sorry, no results found.</h4>
            )}
        </div>
    );
}

export default StateMenu;

