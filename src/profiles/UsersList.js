import React, { useState, useEffect } from "react";
import BywayApi from "../api/api";

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
        <div>
            <div class="container text-center" id="app-name">
                <h1>NATIONAL SCENIC BYWAYS</h1>
            </div>
            {users.length
            ? users.map((u, i) => (
                        <div>

                        <a key={i} href={`/profile/${u.username}`}>{u.username}</a>
                        </div>
                    ))
               
             : (
                <h4>Sorry, no results found.</h4>
            )}
        </div>
    )
}

export default UsersList;