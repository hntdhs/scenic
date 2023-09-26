import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

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

//   function loggedInNav() {
//     return (
//         <ul>
//           <li>
//             <NavLink to="/search">
//               View All Byways and Search
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/states">
//               View Byways by State
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to={`/profile/${currentUser.username}`}>
//               Profile
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/random">
//               See a Random Byway
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/users">
//               See All Users
//             </NavLink>
//           </li>
//           <li>
//             <Link to="/" onClick={logout}>
//               Log out {currentUser.first_name || currentUser.username}
//             </Link>
//           </li>
//         </ul>
//     );
//   }

//   function loggedOutNav() {
//     return (
//         <ul>
//           <li>
//             <NavLink to="/login">
//               Login
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/signup">
//               Sign Up
//             </NavLink>
//           </li>
//         </ul>
//     );
//   }

//   return (
//       <nav>
//         <Link to="/">
//           Scenic Byways
//         </Link>
//         {currentUser ? loggedInNav() : loggedOutNav()}
//       </nav>
//   );
// }

function loggedInNav() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="primary">
      <div class="container-fluid">
        <div className="outer-border">
          <div className="inner-border">
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <NavLink class="nav-link" to="/search">
                    View All Byways and Search
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink class="nav-link" to="/states">
                    View Byways by State
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink class="nav-link" to={`/profile/${currentUser.username}`}>
                    Profile
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink class="nav-link" to="/random">
                    See a Random Byway
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink class="nav-link" to="/users">
                    See All Users
                  </NavLink>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/" onClick={logout}>
                    Log out {currentUser.first_name || currentUser.username}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
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