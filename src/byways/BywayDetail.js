import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import BywayApi from "../api/api";
import CommentForm from "../actions/CommentForm";
import FavoriteAByway from "../actions/FavoriteAByway";
import UserContext from "../auth/UserContext";
import moment from 'moment';
// see Moment docs on display for how to format comment dates/times in different ways
import { useToasts } from 'react-toast-notifications';
import "./BywayDetail.css"


function BywayDetail() {
    const { name } = useParams();
    const { currentUser } = useContext(UserContext);
    const { addToast } = useToasts();
    const [byway, setByway] = useState(null);
    const [comments, setComments] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(() => {        
        async function getByway(name) {
            try {
                const b = await BywayApi.getByway(name)
                setByway(b);
                const c = await BywayApi.getCommentsByByway(b.id);
                setComments(c);
                const favorites = await BywayApi.getUserFavorites(currentUser.username, "name", "asc");

                if (favorites.find(i => i.byway_id === b.id)) {
                    setIsFavorite(true);
                } 
        } catch (errors) {
            if (errors.length > 0) {
                addToast(errors[0], { appearance: 'error' });
            }
            }
        }    

        getByway(name);
    }, [name]);


    // empty array makes it only happen first time

    const addComment = (comment) => {
        const updatedComments = [...comments, comment]
        setComments(updatedComments);
    }

    function checkGeoFeaturesLength(byway) {
        let tempString = byway.geographic_features
        tempString = tempString[0].toUpperCase() + tempString.slice(1)
        const splitted = tempString.split(',')
        if (splitted.length >= 3) {
            // if byway has 3 or more - features = Feature, feature and feature
            // return byway.geographic_features.charAt(0).toUpperCase() + byway.geographic_features.replace(/("[^"]+"|\w+)$/, "and $1").slice(1);
            const comma_separated_list_until_last_element = splitted.slice(0, splitted.length - 1).join(', ')
            // takes the splitted string, slices it from beginning up until the last element and joins them on comma, but there won't be a comma after the last feature, meaning we can add the last feature from splitted and return it at the end of this below with 'and' in front of it but no comma
            return comma_separated_list_until_last_element + ' and ' + splitted[splitted.length - 1]
            //return byway.geographic_features.charAt(0).toUpperCase() + byway.geographic_features.slice(1, lastIndex) + ' and' + byway.geographic_features(lastIndex + 1);
        } else if (splitted.length === 2) {
            // if byway has 2 - features = Feature and feature
            // this replaced the comma with regex - return byway.geographic_features.charAt(0).toUpperCase() + byway.geographic_features.replace(/("[^"]+"|\w+)$/, "and $1").slice(1);
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
            <div class="container text-center" id="app-name">
                <Link class="link-offset-2 link-underline link-underline-opacity-0 homepage-link" to="/"><h1>NATIONAL SCENIC BYWAYS</h1></Link>
            </div>
            <div className='byway-detail'>
                {byway
                    ? (
                        <div>
                            <div className="byway-name">
                                <h1>{byway.name}</h1>
                            </div>
                            <div className="containter-fluid">
                                <img src={byway.image} alt={byway.name} className="byway-img"></img>
                                <img src={byway.image} alt={byway.name} className="byway-img"></img>
                                <img src={byway.image} alt={byway.name} className="byway-img"></img>
                                <img src={byway.image} alt={byway.name} className="byway-img"></img>
                                <img src={byway.image} alt={byway.name} className="byway-img"></img>
                            </div>
                            <div className="byway-state">
                                <h2>{byway.state}</h2>
                            </div>
                            <div className="byway-length">
                                <h3>{byway.length} miles / { Math.round((parseFloat(byway.length) * 1.60934)) } kilometres</h3>
                            </div>
                            <div className="byway-fees">
                                <h3>Fees: {byway.fees}</h3>
                            </div>
                            <div className="byway-features">
                                {<h3>Wondering what kind of natural settings you'll see on this byway? {checkGeoFeaturesLength(byway)}.</h3> }
                            </div>
                            <div className="about-byway">
                                <div className="about-byway-name">
                                    <h3>About {byway.name}</h3>
                                </div>
                                <div className="byway-desc">    
                                    <h3>{byway.description}</h3>
                                </div>
                            </div>
                            {isFavorite === true
                            ? (
                                <h4>Byway is in your favorites</h4>
                            ) : (
                                <FavoriteAByway id={byway.id} />
                            )
                            }
                            <h4>Comment on {byway.name}</h4>
                            <CommentForm name={byway.name} id={byway.id} onAdd={addComment}/>
                            <div>
                                {comments
                                ? (
                                    <div className="comment-area">
                                        {comments.map((c, i) => (
                                            <div key={i}>
                                                <h4>User <a href={`/profile/${c.username}`}><span className="comment-user">{c.username}</span></a> said this at {moment(c.create_at).format("MM/DD/YYYY hh:mm a")}:</h4>
                                                <p className="comment-text">{c.comment}</p>
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
            </div>
        </div>
    )
}

export default BywayDetail;