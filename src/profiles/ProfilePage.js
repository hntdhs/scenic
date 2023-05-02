import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

// don't forget link to edit, plus a ternary operator that displays a 'you haven't created a profile' message if there's nothing to display - was I going to make a table for profile data as opposed to user data?
// call api for user info, should be same as jobly

function UserProfile() {
    const { username } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {  
        async function getUser(username) {
            let user = await BywayApi.getCurrentUser(username);
            setUser(user);
        }
        getUser();
    }, [username]);

    if (!user) return <LoadingSpinner />;

    return (
        <div>

        </div>
    )
}

export default UserProfile;