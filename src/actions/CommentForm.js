import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import UserContext from "../auth/UserContext";
import LimitedTextArea from "../common/LimitedTextArea";


function CommentForm({id, onAdd}) {
    const { byway } = useParams();
    const { currentUser } = useContext(UserContext);

    const [comment, setComment] = useState("");

    async function handleSubmit(evt) {
        const response = await BywayApi.makeComment(id, comment);
        setComment('');
        onAdd(response)
        // getCommentsByByway(byway);
    }

    return (
        <div>
            {/* <textarea onChange={e => setComment(e.target.value)} ></textarea> */}
            <LimitedTextArea domId="comment_form" value={comment} limit={500} onChange={setComment}/>
            <button id="comment_submit" onClick={handleSubmit} class="btn btn-outline-success btn-lg">
                Submit
            </button>
        </div>
    )
}

export default CommentForm;