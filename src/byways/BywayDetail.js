import React, { useState, useEffect } from "react";
// import { render } from "react-dom";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from "../common/Alert";
import FourOhFour from "../common/404";
import CommentForm from "./CommentForm";

// need comment form submission (form in a separate component) and comments display (call the API for all comments on this byway)
// will call BywayAPI for info on a particular byway taking the name with params, then display 
// name, state, length, designation, fees, image, description, geographic_features

function BywayDetail() {
    const { name } = useParams();

    const [byway, setByway] = useState(null);

    useEffect(() => {
        async function getByway(name) {
            setByway(await BywayApi.getByway(name));
        }
        getByway(name);
    }, [name]);

    // if (!byway) return <LoadingSpinner />;
    // if (!byway) return <Alert />;
    if (!byway) return <FourOhFour />
    // when I try it with Alert I get nothing on the page
    // just erase this? - just a blank page when there's nothing here

    return (
        <div>
            {byway.name === byway.name
                ? (
                    <div>
                        <h1>{byway.name}</h1>
                        <img src={byway.image} alt={byway.name}></img>
                        <h2>{byway.state}</h2>
                        <h3>{byway.length}</h3>
                        <p>Fees: {byway.fees}</p>
                        <p>Geographic features on this byway: {byway.geographicFeatures}</p>
                        <p>{byway.description}</p>
                        <button><CommentForm /></button>

                    </div>
                ) : (
                    <h1>no byway by that name</h1>
                )
            }
            {/* just take out the ternary operator and just have the html stuff in one div to get what I had previously */}
            {/* weird thing is that the first part of the ternary operator works fine but if the URL is a byway that doesn't exist then the : part doesn't work, it gets stuck on the if statement above the return statement */}
            {/* ^ it's because if there's no byway it gets stuck on the if statement, if there is it goes ternary part 1, it would never get to part 2 */}
            {/* could just take ternary out and have it load a page that says 'no such byway' if !byway, and a different page if a state doesn't have any byways in StateDetail but I don't know if that's efficient */}
            {/* why won't it work with no if statement and with ternary? seems like that would be simplest. actually throwing an error with a custom error would be simplest */}
        </div>
    )
}

export default BywayDetail;