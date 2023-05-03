import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

// don't forget link to edit, plus a ternary operator that displays a 'you haven't created a profile' message if there's nothing to display - was I going to make a table for profile data as opposed to user data?
// call api for user info, should be same as jobly

function ShowUserProfile() {
    const { username } = useParams();
    const { currentUser } = useContext(UserContext);
    const [profileInfo, setProfileInfo] = useState(null);
    // not sure if there is a need for currentUser and setUser

    useEffect(() => {  
        async function getUserInfo(username) {
            let profileInfo = await BywayApi.getCurrentUser(username);
            setProfileInfo(profileInfo);
        }
        getUserInfo();
    }, [username]);
    
    if (!user) return <LoadingSpinner />;

    return (
        <div>
            {/* should be same format as byway card */}
            <h3>{currentUser.username}</h3>
            <img src={profilePhoto} alt={"profile photo"} />
            <h4>{userLocation}</h4>
            <h5>Favorite State to Travel To: {favoriteState}</h5>
            <p>{bio}</p>
        </div>
    )
    // ternary shows profile or message
}

export default ShowUserProfile;