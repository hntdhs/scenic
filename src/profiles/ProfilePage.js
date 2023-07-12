import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import UserContext from "../auth/UserContext";
import { NavLink } from "react-router-dom";
import BywayCard from "../byways/BywayCard";
import { useToasts } from 'react-toast-notifications';
// import { getUserFavorites } from "../../backend/models/user";

function ShowUserProfile() {
    const { username } = useParams();
    const { addToast } = useToasts();
    const { currentUser } = useContext(UserContext);
    const [isMe, setIsMe] = useState(false)
    const [profileInfo, setProfileInfo] = useState({});
    const [userFavorites, setUserFavorites] = useState([]);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [formErrors, setFormErrors] = useState([]);

    async function getUserFavorites() {
        let userFavorites = await BywayApi.getUserFavorites(username, sortBy, sortDirection);
        setUserFavorites(userFavorites);
    }

    useEffect(() => {  
        async function getUserInfo() {
            let errors = formErrors;
            // attempted fix 
            try {
                let profileInfo = await BywayApi.getCurrentUser(username);
                setProfileInfo(profileInfo);
                if (errors) {
                    profileInfo.errors.forEach(i =>  addToast(i, { appearance: 'error' }));
                }    
            } catch (errors) {
                if (errors.length > 0) {
                    addToast(errors[0], { appearance: 'error' });
                }
                setFormErrors(errors);
            }
        }
        getUserInfo();
    }, [username]);

    useEffect(() => {
        if (currentUser && profileInfo) {
            setIsMe(currentUser.username === profileInfo.username);
        }
    }, [profileInfo, currentUser])   
    
    useEffect(() => {
        // moved this to the top outside a useEffect to make it accessible to handleSubmitSortBy, but ended up not using it there, so could go back into this useEffect. don't think it matters if it's defined here or up top.
        // async function getUserFavorites() {
        //     let userFavorites = await BywayApi.getUserFavorites(username);
        //     setUserFavorites(userFavorites);
        // }
        getUserFavorites();
        
    }, [sortBy, sortDirection])

    // handleSubmit for removal button in map
    // tell the function which byway is being removed by passing it into an anonymous function in the button's onClick below
    async function handleSubmit(username, byway_id) {
        await BywayApi.removeFavorite(username, byway_id);
        getUserFavorites();
    }

    async function handleSubmitSortBy(sortField, direction) {
        setSortBy(sortField)
        setSortDirection(direction);
        // sortField and direction get passed here from the onClick in JSX
    }
        
    

    return (
        <div>
            {isMe ? <NavLink to={`/profile/`}>Edit your profile</NavLink> : ''}
            {isMe ? <h3>Welcome to the profile page of {profileInfo.username}</h3> : <h3>Welcome to the profile page of {username}</h3>}
            <img src={profileInfo.profilePhoto} alt={"profile photo"} />
            <h3>Location: {profileInfo.userLocation}</h3>
            <h3>Favorite State to Travel To: {profileInfo.favoriteState}</h3>
            <p>Bio: {profileInfo.bio}</p>
            <h1>USER FAVORITES</h1>

            <h4>Order favorites by:</h4>
            {sortBy == 'name' && sortDirection == 'asc' ? 
            // these are the initial states for sortBy and sortDirection
                (<button onClick={e => handleSubmitSortBy('name', 'desc')}>Z-A</button>) :
                // button starts as Z-A because byways are initially A-Z, so if user wanted to reverse order from that, button should be the opposite of what's initally shown
                (<button onClick={e => handleSubmitSortBy('name', 'asc')}>A-Z</button>)
            }
            <button onClick={e => handleSubmitSortBy('length', 'asc')}>Shortest to Longest</button>
            <button onClick={e => handleSubmitSortBy('length', 'desc')}>Longest to Shortest</button>
            <div>
                    {userFavorites.map(f => (
                        <div>
                            <BywayCard
                                key={f.name + f.state}
                                name={f.name}
                                image={f.image}
                                designation={f.designation}
                            />
                            {isMe ? (
                            <button onClick={() => handleSubmit(username, f.byway_id)}>
                            Remove Favorite
                            </button>) : <span></span> }
                        </div>
                    ))}
                </div>
        </div>
    )
    // currentUser wouldn't work right if someone is looking at a different user's profile?
    // maybe instead of BywayApi.getCurrentUser(username), BywayApi.getProfileInfo(username from params?)
    // need to create some profiles to have a better look
}

export default ShowUserProfile;