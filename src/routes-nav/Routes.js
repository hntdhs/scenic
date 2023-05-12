import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from '../auth/LoginForm'
import SignupForm from '../auth/SignupForm'
import ProfileForm from "../profiles/ProfileForm";
import ProfilePage from "../profiles/ProfilePage"
import FilterSearch from "../byways/FilterSearch";
import PrivateRoute from "./PrivateRoute";
import StateMenu from "../byways/StateMenu";
import StateDetail from "../byways/StateDetail";
import BywayDetail from "../byways/BywayDetail";
import DisplayRandomByway from "../byways/RandomByway";



function Routes({ login, signup }) {
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `register=${typeof register}`,
    );
  // private route component will check if there is a valid current user and only continues to the route if so. If no user is present, redirects to login form.
    return (
        <div>
          <Switch>
  
            <Route exact path="/">
              <Homepage />
            </Route>
  
            <Route exact path="/login">
              <LoginForm login={login} />
            </Route>
  
            <Route exact path="/signup">
              <SignupForm signup={signup} />
            </Route>

{/* might just need to render the search form, see right above, not a filter search component */}
            <PrivateRoute exact path="/search">
              <FilterSearch />
            </PrivateRoute>

            <PrivateRoute exact path="/profile">
              <ProfileForm />
            </PrivateRoute>

            <PrivateRoute path="/profile/:username">
              <ProfilePage />
            </PrivateRoute>

            <PrivateRoute exact path="/browse">
              <FilterSearch />
            </PrivateRoute>

            {/* not sure if i need to change this to browse/:name or browse to /states */}

            <PrivateRoute exact path="/states">
              <StateMenu />
            </PrivateRoute>

            <PrivateRoute exact path="/states/:name">
              <StateDetail />
            </PrivateRoute>

            <PrivateRoute exact path="/byways/:name">
              <BywayDetail />
            </PrivateRoute>

            <PrivateRoute exact path="/random">
              <DisplayRandomByway />
            </PrivateRoute>
  
            <Redirect to="/" />
          </Switch>
        </div>
    );
  }
  
  export default Routes;
  