import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner"; 
import UserContext from "../auth/UserContext";

// don't forget link to edit, plus a ternary operator that displays a 'you haven't created a profile' message if there's nothing to display - was I going to make a table for profile data as opposed to user data?
// call api for user info, should be same as jobly

function CommentForm({name}) {
    const { byway } = useParams();
    // byway I think since that's what's in the URL
    const { currentUser } = useContext(UserContext);

    const [comment, setComment] = useState(false);
    // I think state is necessary because at first there is no comment, then comment exists

    async function handleSubmit(evt) {
        await BywayApi.makeComment(name, comment);
        // setComment('');
        setComment(comment);
    }

    return (
        <div>
            <textarea onChange={e => setComment(e.target.value)} ></textarea>
            <button onClick={handleSubmit}>
                Submit
            </button>
        </div>
    )
}

export default CommentForm;