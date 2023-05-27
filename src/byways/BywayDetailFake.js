import React, { useState, useEffect } from "react";
// import { render } from "react-dom";
import { useParams } from "react-router-dom";
import { renderToString } from 'react-dom/server'
import BywayApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from "../common/Alert";
import FourOhFour from "../common/404";
import CommentForm from "./CommentForm";
import FavoriteAByway from "./FavoriteAByway";
import { getCommentsByByway } from "../../backend/models/byway";

// need comment form submission (form in a separate component) and comments display (call the API for all comments on this byway)
// will call BywayAPI for info on a particular byway taking the name with params, then display 
// name, state, length, designation, fees, image, description, geographic_features

function BywayDetail() {
    const { name } = useParams();

    const [byway, setByway] = useState(null);
    const [comments, setComments] = useState(null);

    // function for seeing if there's more than one feature, maybe see if string includes comma and if it doesn't then return as is, if it does then include the and

    useEffect(() => {
        async function getByway(name) {
            const b = await BywayApi.getByway(name)
            setByway(b);

            async function getCommentsByByway(b) {
                const c = (await BywayApi.getCommentsByByway(b.id));
                setComments(c);
                // 26 and 27 into function and call it here then pass it as property into comment form, call it in the handle submit
                // take  the parenthesis off that await call
                // try putting this in a separate useEffect, then outside of this useEffect just on its own, try it again in this useEffect but outside the getByway function. I know there's other useEffects that have two functions or more inside. 
                // I do want to call it here as well as pass it over to comment form
            }
            getCommentsByByway(b);
        }    

        getByway(name);
    }, [name]);

    function checkGeoFeatures(b) {
        if (b.geographic_features.includes(",")) {
            let featuresStatement = byway.geographicFeatures.replace(/("[^"]+"|\w+)$/, "and $1");
        } else {
            let featuresStatement = byway.geographicFeatures;
        }

        return featuresStatement;
    }

    function commasForBigNumbers() {

    }

    // if (!byway) return <LoadingSpinner />;
    // if (!byway) return <Alert />;
    // if (!byway) return <FourOhFour />
    // when I try it with Alert I get nothing on the page
    // just erase this? - just a blank page when there's nothing here

    return (
        <div>
            {byway
                ? (
                    <div>
                        <h1>{byway.name}</h1>
                        <img src={byway.image} alt={byway.name}></img>
                        <h2>{byway.state}</h2>
                        {/* <h3>{byway.length} / {(parseFloat(byway.length) * 1.60934).toFixed(1)} kilometres</h3> */}
                        <h3>{byway.length} miles / { Math.round((parseFloat(byway.length) * 1.60934)) } kilometres</h3>
                        <p><b>Fees:</b> {byway.fees}</p>
                        <p><b>Geographic features on this byway:</b><br></br> Wondering what kind of natural settings you'll see on {byway.name}? On your visit, you'll be enjoying { byway.geographicFeatures.replace(/("[^"]+"|\w+)$/, "and $1") }.</p>
                        <p><b>Geographic features on this byway:</b><br></br> Wondering what kind of natural settings you'll see on {byway.name}? On your visit, you'll be enjoying {featuresStatement}</p>
                        {/* <p>Geographic features on this byway: { byway.geographicFeatures.charAt(0).toUpperCase() + byway.geographicFeatures.slice(1) }</p> */}
                        <p><b>About {byway.name}</b><br></br>{byway.description}</p>
                        <FavoriteAByway id={byway.id} />
                        <h4>Comment on {byway.name}</h4>
                        <CommentForm name={byway.name} id={byway.id} getCommentsByByway = {getCommentsByByway}/>
                        <div>
                            {comments
                            ? (
                                <div>
                                    {comments.map(c => (
                                        <div>
                                            <h6>{c.username}</h6>
                                            <h6>{c.create_at}</h6>
                                            <p>{c.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>no one has commented</p>
                            )
                            }
                        </div>

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