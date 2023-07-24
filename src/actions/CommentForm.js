import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner"; 
import UserContext from "../auth/UserContext";
import LimitedTextArea from "../common/LimitedTextArea";

// don't forget link to edit, plus a ternary operator that displays a 'you haven't created a profile' message if there's nothing to display - was I going to make a table for profile data as opposed to user data?
// call api for user info, should be same as jobly

function CommentForm({id, onAdd}) {
    const { byway } = useParams();
    // byway I think since that's what's in the URL
    const { currentUser } = useContext(UserContext);

    const [comment, setComment] = useState("");

    async function handleSubmit(evt) {
        const response = await BywayApi.makeComment(id, comment);
        // setComment('');
        setComment('');
        onAdd(response)
        // getCommentsByByway(byway);
    }

    return (
        <div>
            {/* <textarea onChange={e => setComment(e.target.value)} ></textarea> */}
            <LimitedTextArea id="comment_form" value={comment} limit={500} onChange={setComment}/>
            <button id="comment_submit" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    )
}

export default CommentForm;