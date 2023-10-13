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
        <div className="float-container" id="users-list">
            <div class="container text-center" id="app-name">
                <Link class="link-offset-2 link-underline link-underline-opacity-0 homepage-link" to="/"><h1>NATIONAL SCENIC BYWAYS</h1></Link>
            </div>
            <div className="user-list-explain">A list of all users and a link to their profiles</div>
            <div className="float-child w-50">
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
            <div className="float-child w-50">
                <div className="gallery">
                    <figure class="gallery__item gallery__item--1">
                        <img src="" class="gallery__img" alt="" />
                    </figure>
                    <figure class="gallery__item gallery__item--2">
                        <img src="" class="gallery__img" alt="" />
                    </figure>
                    <figure class="gallery__item gallery__item--3">
                        <img src="" class="gallery__img" alt="" />
                    </figure>
                    <figure class="gallery__item gallery__item--4">
                        <img src="" class="gallery__img" alt="" />
                    </figure>
                    <figure class="gallery__item gallery__item--5">
                        <img src="" class="gallery__img" alt="" />
                    </figure>
                    <figure class="gallery__item gallery__item--6">
                        <img src="" class="gallery__img" alt="" />
                    </figure>        
                </div>
            </div>
        </div>
        
    )
}

export default UsersList;