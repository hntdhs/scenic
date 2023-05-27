import React from "react";
import { NavLink } from "react-router-dom";

function backToSearch() {
    


return(
    <div>
        <h1>BIG PROBLEMS! No byways match what you searched for!</h1>
        <NavLink to={`/search`}>Try again! Try harder!</NavLink>
    </div>
)

};

export default backToSearch;