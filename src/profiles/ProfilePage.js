import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import BywayApi from "../api/api";
import UserContext from "../auth/UserContext";
import { NavLink } from "react-router-dom";
import BywayCard from "../byways/BywayCard";
import { useToasts } from 'react-toast-notifications';
import "./ProfilePage.css"
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
                // if (errors) {
                //     profileInfo.errors.forEach(i =>  addToast(i, { appearance: 'error' }));
                // }    
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
        <div id='profile-page'>
            <div class="container text-center" id="app-name">
                <Link class="link-offset-2 link-underline link-underline-opacity-0 homepage-link" to="/"><h1>NATIONAL SCENIC BYWAYS</h1></Link>
            </div>
            <div className="edit-profile">
                {isMe ? <NavLink to={`/profile/`} className="link-offset-2 link-danger">Edit your profile</NavLink> : ''}
            </div>
            <div className="float-container" id="profile-info-and-img">
                <div className="float-child w-50">
                    <div className="profile-info">
                        {/* <div className="welcome-to-profile">
                            {isMe ? <h3>Welcome to the profile page of <span className="profile-username">{profileInfo.username}</span></h3> : <h3>Welcome to the profile page of {username}</h3>}
                        </div> */}
                        <div className="welcome-to-profile">
                            <h3>Welcome to the profile page of <div className="profile-username">{profileInfo.username}</div></h3>
                        </div>
                        <div>
                            <img src={profileInfo.profilePhoto} alt={"profile photo"} className="profile-photo" />
                        </div>
                        <div className="user-info">
                            <h3>Location: {profileInfo.userLocation}</h3>
                            <h3>Favorite State to Travel To: {profileInfo.favoriteState}</h3>
                            <h4>Bio: {profileInfo.bio}</h4>
                        </div>
                    </div>
                </div>
                <div className="float-child w-50" id="gallery-container">
                    <div className="profile-page-gallery">
                        <figure class="gallery__item gallery__item--1">
                            <img src="https://th.bing.com/th/id/R.80048c94faacac8b7ff6af18efa3d92a?rik=Ac82coHKVHLVyg&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2016%2f01%2fnature-wallpapers-8.jpg&ehk=GoUR7nA3jNm0gIdWFJoMVL1iu%2bJuWOU7Nu7KkgKZzeQ%3d&risl=&pid=ImgRaw&r=0" class="gallery__img" alt="nature image featuring green leaves" />
                        </figure>
                        <figure class="gallery__item gallery__item--2">
                            <img src="https://th.bing.com/th/id/R.da8defe065b749e35e1977a7407cc186?rik=MIXMv8FY38SnZQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-r9RbdRcHK5w%2fUnkma7Ogu2I%2fAAAAAAAAIfQ%2fMB4f28judSs%2fs1600%2fplitvice_03.jpg&ehk=P9oYjaF7faaYRmw0snOEEdG1n24i8W2HJjKGnTFeawA%3d&risl=&pid=ImgRaw&r=0" class="gallery__img" alt="nature image featuring green leaves" />
                        </figure>
                        <figure class="gallery__item gallery__item--3">
                            <img src="https://getwallpapers.com/wallpaper/full/7/c/7/624165.jpg" class="gallery__img" alt="nature image featuring green leaves" />
                        </figure>
                        <figure class="gallery__item gallery__item--4">
                            <img src="https://th.bing.com/th/id/R.4eb01b6d1de8180fc16a7ea457df2dd0?rik=mDmVmiPWKjG19Q&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2016%2f01%2f102787-nature-mountain-river-landscape.jpg&ehk=tKQDONLRX3EXEvzzdRuXB5UBE3a0IgFKug46zeMojOg%3d&risl=&pid=ImgRaw&r=0" class="gallery__img" alt="nature image featuring green leaves" />
                        </figure>
                        <figure class="gallery__item gallery__item--5">
                            <img src="https://th.bing.com/th/id/R.25e937083406c94e55da0de60a1cfcc1?rik=0HEyQ3ecPI9GZQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fc%2fc8%2fAltja_j%c3%b5gi_Lahemaal.jpg&ehk=BlRsLAc9eb%2fpuXQO2L6zTYRs1h5rFkNp2wDTWNv8%2fZY%3d&risl=1&pid=ImgRaw&r=0" class="gallery__img" alt="nature image featuring green leaves" />
                        </figure>
                        <figure class="gallery__item gallery__item--6">
                            <img src="https://i.pinimg.com/736x/8f/3c/e3/8f3ce342b2067fe72dd7f261296265de--serenity-lakes.jpg" class="gallery__img" alt="nature image featuring green leaves" />
                        </figure>        
                    </div>
                </div>
            </div>
            <div className="text-and-favorite-buttons">
                <h1>USER FAVORITES</h1>
                <h4>Order favorites by:</h4>
                {sortBy == 'name' && sortDirection == 'asc' ? 
                // these are the initial states for sortBy and sortDirection
                    (<button onClick={e => handleSubmitSortBy('name', 'desc')} class="btn btn-outline-success">Z-A</button>) :
                    // button starts as Z-A because byways are initially A-Z, so if user wanted to reverse order from that, button should be the opposite of what's initally shown
                    (<button onClick={e => handleSubmitSortBy('name', 'asc')} class="btn btn-outline-success">A-Z</button>)
                }
                <button onClick={e => handleSubmitSortBy('length', 'asc')} class="btn btn-outline-success">Shortest to Longest</button>
                <button onClick={e => handleSubmitSortBy('length', 'desc')} class="btn btn-outline-success">Longest to Shortest</button>
            </div>
            <div class='row'>
                    {userFavorites.map(f => (
                        <div class='card col-4'>
                            <BywayCard
                                key={f.name + f.state}
                                name={f.name}
                                image={f.image}
                                designation={f.designation}
                            />
                            {isMe ? (
                            <button onClick={() => handleSubmit(username, f.byway_id)} class="btn btn-outline-success" id="favorite-remove-button">
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