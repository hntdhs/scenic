import React, { useState, useEffect } from "react";
import BywayApi from "../api/api";

function UsersList() {

    const [users, setUsers] = useState('');

    useEffect(() => {
        async function getUsers() {
            users = BywayApi.getAllUsers();
            setUsers(users);
        }
        getUsers();
    }, []);

    return (
        <div>
            {users.length
            ? (
                <div>
                    {users.map(u => (
                        <a href="/profile/{u.username}">{u.username}</a>
                    ))}
                </div>
            ) : (
                <h4>Sorry, no results found.</h4>
            )}
        </div>
    )
}

export default UsersList;