import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner"; 
import UserContext from "../auth/UserContext";

// don't forget link to edit, plus a ternary operator that displays a 'you haven't created a profile' message if there's nothing to display - was I going to make a table for profile data as opposed to user data?
// call api for user info, should be same as jobly

function CommentForm() {
    const { byway } = useParams();
    // byway I think since that's what's in the URL
    const { currentUser } = useContext(UserContext);

    const [comment, setComment] = useState(false);
    // I think state is necessary because at first there is no comment, then comment exists

    // useEffect(() => {  
    //     async function submitComment() {
    //         let comment = await BywayApi.makeComment(); 
    //         // this api method will be for a post route
    //         setComment(comment);
    //     }
    //     submitComment();
    // }, []);

    async function handleSubmit(evt) {
        let comment = await BywayApi.makeComment();
        submitComment(comment);
        setComment(comment);
    }

// async function uses the Byway API method that I haven't written yet to send message to the API that current user has favorited this byway

    // if (!user) return <LoadingSpinner />;
    // doubt I need an equivalent of this

    return (
        <div>
            <button onClick={handleSubmit}>
                Comment
            </button>
        </div>
    )
}
// functionality for html button should be about the same as hitting apply on a job in jobly

export default function CommentForm();
// would replies maybe be a second table? and they point to original comment that's over in the comments table? so when comment is made and it renders on the page it uses the Reply component to add a reply button?
// one comment can have many replies, replies can have one comment. but couldn't replies also have replies, meaning they're really just comments? wouldn't have a reply to reply table.