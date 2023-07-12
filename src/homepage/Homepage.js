import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import "./Homepage.css";
import UserContext from "../auth/UserContext";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
      <div className="Homepage">
          <h1>NATIONAL SCENIC BYWAYS</h1>

          {currentUser
            ? <h2>
                Hello {currentUser.username}!<br></br>
                <Link to={`/profile/${currentUser.username}`}>View your profile, </Link>or if you haven't made one yet, <Link to="/profile">create and edit your profile here!</Link><br></br>
                {/* <Link to={`/byways/${name}`}> */}
                {/* <Link to="/browse">Browse through every national byway, select favorites, plan a trip, and connect with other users here!</Link> */}
                <Link to="/search">See all byways and search using filters here!</Link><br></br>
                <Link to="/states">See byways by state here!</Link><br></br>
                <Link to="/random">Or see a byway at random!</Link>
                
            </h2>
            : (
                <p>
                    <Link to="/login">Log in</Link>
                    <Link to="/signup">Sign up</Link>
                </p>
            )
          
          }

      </div>
  )
    
}

export default Homepage;