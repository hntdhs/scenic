import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import UserContext from "../auth/UserContext";
import { NavLink } from "react-router-dom";
import BywayCard from "../byways/BywayCard";

function ShowUserProfile() {
    const { username } = useParams();
    const { currentUser } = useContext(UserContext);
    const [isMe, setIsMe] = useState(false)
    const [profileInfo, setProfileInfo] = useState(null);
    const [userFavorites, setUserFavorites] = useState(null);

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
    
    useEffect(() => {
        async function getUserFavorites() {
            let userFavorites = await BywayApi.getUserFavorites(username);
            setUserFavorites(userFavorites);
        }
        getUserFavorites();
    })

    return (
        <div>
            {isMe ? <NavLink to={`/profile/`}>Edit your profile</NavLink> : ''}
            <h3>Welcome to the profile page of {currentUser.username}</h3>
            <img src={currentUser.profilePhoto} alt={"profile photo"} />
            <h3>Location: {currentUser.userLocation}</h3>
            <h3>Favorite State to Travel To: {currentUser.favoriteState}</h3>
            <p>Bio: {currentUser.bio}</p>
            <h1>USER FAVORITES</h1>
            <div>
                    {userFavorites.map(f => (
                        <BywayCard
                            key={f.name + f.state}
                            name={f.name}
                            image={f.image}
                            designation={f.designation}
                        />
                    ))}
                </div>
        </div>
    )
    // currentUser wouldn't work right if someone is looking at a different user's profile?
    // maybe instead of BywayApi.getCurrentUser(username), BywayApi.getProfileInfo(username from params?)
    // need to create some profiles to have a better look
}

export default ShowUserProfile;