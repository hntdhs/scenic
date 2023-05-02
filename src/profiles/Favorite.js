import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

// don't forget link to edit, plus a ternary operator that displays a 'you haven't created a profile' message if there's nothing to display - was I going to make a table for profile data as opposed to user data?
// call api for user info, should be same as jobly

function FavoriteAByway() {
    const { byway } = useParams();
    // byway I think since that's what's in the URL
    const { currentUser } = useContext(UserContext);

    const [favorite, setFavorite] = useState(false);

    useEffect(() => {  
        async function favorite(currentUser, byway) {
            let user = await BywayApi.getCurrentUser(username);
            setUser(user);
            setFavorite(true);
        }
        getUser();
    }, []);
// async function uses the Byway API method that I haven't written yet to send message to the API that current user has favorited this byway
    if (!user) return <LoadingSpinner />;
    // doubt I need an equivalent of this

    return (
        <div>
            <button></button>
        </div>
    )
}

export default function FavoriteAByway();