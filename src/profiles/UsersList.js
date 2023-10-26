import React, { useState, useEffect } from "react";
import BywayApi from "../api/api";
import { Link } from "react-router-dom";
import "./UsersList.css"


function UsersList() {

    const [users, setUsers] = useState('');

    useEffect(() => {
        async function getUsers() {
            const u = await BywayApi.getAllUsers();
            setUsers(u.users);
        }
        getUsers();
    }, []);

    return (
        <div id="users-list-page">  
            <div class="container text-center" id="app-name">
                    <Link class="link-offset-2 link-underline link-underline-opacity-0 homepage-link" to="/"><h1>NATIONAL SCENIC BYWAYS</h1></Link>
            </div>
            <div className="user-list-explain">A list of all users and a link to their profiles</div>
            <div className="float-container">
                <div className="float-child w-50" id="users-list">
                    {users.length
                    ? users.map((u, i) => (
                                <div className="user-link">

                                <a key={i} href={`/profile/${u.username}`} >{u.username}</a>
                                </div>
                            ))
                    
                    : (
                        <h4>Sorry, no results found.</h4>
                    )}
                </div>
                <div className="float-child w-50" id="user-list-gallery-container">
                    <div className="user-list-gallery">
                        <figure class="gallery__item gallery__item--1">
                            <img src="https://www.rd.com/wp-content/uploads/2020/09/GettyImages-1020250788.jpg" class="gallery__img" alt="autumn trees" />
                        </figure>
                        <figure class="gallery__item gallery__item--2">
                            <img src="https://th.bing.com/th/id/R.3554556ffb99634a84bc6ac825a2d01c?rik=7QXUt22KeOtQow&riu=http%3a%2f%2f3.bp.blogspot.com%2f-pALHrs4KKw4%2fT2i34rmzGgI%2fAAAAAAAABLc%2fxHlFbzK4W1A%2fs1600%2fPeaceful%2bRiver%2bWallpapers%2b2.jpg&ehk=ruPe5klBA9bZTJPJEudbV4WdqK5laGDHJXJjlvYJ3kA%3d&risl=&pid=ImgRaw&r=0" class="gallery__img" alt="river" />
                        </figure>
                        <figure class="gallery__item gallery__item--3">
                            <img src="https://i.pinimg.com/736x/f0/a0/d0/f0a0d0b2913c40f6bea0b7f4593582b5--russia-travel.jpg" class="gallery__img" alt="forest in mountains" />
                        </figure>
                        <figure class="gallery__item gallery__item--4">
                            <img src="https://wallpapercave.com/wp/wp4806552.jpg" class="gallery__img" alt="pine tree forest" />
                        </figure>
                        <figure class="gallery__item gallery__item--5">
                            <img src="https://th.bing.com/th/id/OIP.-AnlLWi1HIBdYZhMxspfswHaFj?pid=ImgDet&rs=1" class="gallery__img" alt="palm tree forest" />
                        </figure>
                        <figure class="gallery__item gallery__item--6">
                            <img src="https://th.bing.com/th/id/OIP.DDXYBJZBwwfeUcrH1Em_TgHaE7?pid=ImgDet&rs=1" class="gallery__img" alt="Glen Canyon, Utah" />
                        </figure>        
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default UsersList;