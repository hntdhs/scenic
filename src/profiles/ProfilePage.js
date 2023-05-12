import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import UserContext from "../auth/UserContext";
import { NavLink } from "react-router-dom";

function ShowUserProfile() {
    const { username } = useParams();
    const { currentUser } = useContext(UserContext);
    const [isMe, setIsMe] = useState(false)
    // probably don't need both of these but not sure if one is better
    const [profileInfo, setProfileInfo] = useState(null);

    useEffect(() => {  
        async function getUserInfo() {
            let profileInfo = await BywayApi.getCurrentUser(username);
            setProfileInfo(profileInfo);
        }
        getUserInfo();

        // need to call for favorites unless I'm going to add favorites to user info as a column in that table
    }, [username]);

    useEffect(() => {
        if (currentUser && profileInfo) {
            setIsMe(currentUser.username === profileInfo.username);
        }
    }, [profileInfo, currentUser])    

    return (
        <div>
            {isMe ? <NavLink to={`/profile/`}>Edit your profile</NavLink> : ''}
            <h3>{currentUser.username}</h3>
            <img src={currentUser.profilePhoto} alt={"profile photo"} />
            <h4>{currentUser.userLocation}</h4>
            <h5>Favorite State to Travel To: {currentUser.favoriteState}</h5>
            <p>{currentUser.bio}</p>
        </div>
    )
    // currentUser wouldn't work right if someone is looking at a different user's profile?
    // maybe instead of BywayApi.getCurrentUser(username), BywayApi.getProfileInfo(username from params?)
    // need to create some profiles to have a better look
}

export default ShowUserProfile;