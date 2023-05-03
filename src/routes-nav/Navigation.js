import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
// import "./Navigation.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
        <ul>
          <li>
            <NavLink to="/search">
              View All Byways and Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/states">
              View Byways by State
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/:username">
              Profile
            </NavLink>
          </li>
          <li>
            <Link to="/" onClick={logout}>
              Log out {currentUser.first_name || currentUser.username}
            </Link>
          </li>
        </ul>
    );
  }

  function loggedOutNav() {
    return (
        <ul>
          <li>
            <NavLink to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
    );
  }

  return (
      <nav>
        <Link to="/">
          Scenic Byways
        </Link>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </nav>
  );
}

export default Navigation;
