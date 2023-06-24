import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from "../common/Alert";
import CommentForm from "../actions/CommentForm";
import FavoriteAByway from "../actions/FavoriteAByway";
import moment from 'moment';
// see Moment docs on display for how to format comment dates/times in different ways
import { useToasts } from 'react-toast-notifications';

// need comment form submission (form in a separate component) and comments display (call the API for all comments on this byway)
// will call BywayAPI for info on a particular byway taking the name with params, then display 
// name, state, length, designation, fees, image, description, geographic_features

function BywayDetail() {
    const { name } = useParams();
    const { addToast } = useToasts();
    const [byway, setByway] = useState(null);
    const [comments, setComments] = useState([]);

    // function for seeing if there's more than one feature, maybe see if string includes comma and if it doesn't then return as is, if it does then include the and

    useEffect(() => {
        
        async function getByway(name) {
            try {
                const b = await BywayApi.getByway(name)
                setByway(b);
                const c = await BywayApi.getCommentsByByway(b.id);
                setComments(c);
                    // 26 and 27 into function and call it here then pass it as property into comment form, call it in the handle submit
        } catch (errors) {
            if (errors.length > 0) {
                addToast(errors[0], { appearance: 'error' });
            }
            }
        }    

        getByway(name);
    }, [name]);

    const addComment = (comment) => {
        const updatedComments = [...comments, comment]
        setComments(updatedComments);
    }

    function checkGeoFeaturesLength(byway) {
        let tempString = byway.geographicFeatures
        tempString = tempString[0].toUpperCase() + tempString.slice(1)
        const splitted = tempString.split(',')
        if (splitted.length >= 3) {
            // if byway has 3 or more - features = Feature, feature and feature
            // return byway.geographicFeatures.charAt(0).toUpperCase() + byway.geographicFeatures.replace(/("[^"]+"|\w+)$/, "and $1").slice(1);
            const comma_separated_list_until_last_element = splitted.slice(0, splitted.length - 1).join(', ')
            // takes the splitted string, slices it from beginning up until the last element and joins them on comma, but there won't be a comma after the last feature, meaning we can add the last feature from splitted and return it at the end of this below with 'and' in front of it but no comma
            return comma_separated_list_until_last_element + ' and ' + splitted[splitted.length - 1]
            //return byway.geographicFeatures.charAt(0).toUpperCase() + byway.geographicFeatures.slice(1, lastIndex) + ' and' + byway.geographicFeatures(lastIndex + 1);
        } else if (splitted.length === 2) {
            // if byway has 2 - features = Feature and feature
            // this replaced the comma with regex - return byway.geographicFeatures.charAt(0).toUpperCase() + byway.geographicFeatures.replace(/("[^"]+"|\w+)$/, "and $1").slice(1);
            const newString = splitted[0] + ' and' + splitted[1]
            return newString.charAt(0).toUpperCase() + newString.slice(1)
        } else if (splitted.length === 1) {
            // if byway has 1 - features = Feature
            // byway with one feature (charles street) showed 'no features verified'
            // after adding the .length to byway.geoFeatures charles street shows '3 or more'
            return splitted[0]
        } else {
            // if byway has none - 'No geographic features have been verified for this byway'
            // byway with no features (hallowed ground) showed 'no features verified', maybe just because things are falling down to this part of the function
            // after adding the .length to byway.geoFeatures this shows 'no features verified'
            return "No geographic features have been verified for this byway.";

        }
        
    }

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
                        {/* <p><b>Geographic features on this byway:</b><br></br> Wondering what kind of natural settings you'll see on {byway.name}? On your visit, you'll be enjoying { byway.geographicFeatures.split(",").length > 1 ? byway.geographicFeatures.replace(/("[^"]+"|\w+)$/, "and $1") : `: ${byway.geographicFeatures}` }.</p> */}
                        {/* <p><b>Wondering what kind of natural settings you'll see on this byway?</b> { byway.geographicFeatures.split(",").length >= 1 ? <p>Geographic features on {byway.name} include (but are not limited to): { byway.geographicFeatures.charAt(0).toUpperCase() + byway.geographicFeatures.slice(1) }</p> : <p>No geographic features have been verified for this byway</p> }.</p> */}
                        {<p><b>Wondering what kind of natural settings you'll see on this byway?</b> {checkGeoFeaturesLength(byway)}.</p> }
                        <p><b>About {byway.name}</b><br></br>{byway.description}</p>
                        <FavoriteAByway id={byway.id} />
                        <h4>Comment on {byway.name}</h4>
                        <CommentForm name={byway.name} id={byway.id} onAdd={addComment}/>
                        <div>
                            {comments
                            ? (
                                <div>
                                    {comments.map((c, i) => (
                                        <div key={i}>
                                            <h4>User {c.username} said this at {moment(c.create_at).format("MM/DD/YYYY hh:mm a")}:</h4>
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