import React from "react";
import DesignationSearch from "./DesignationSearch";
import "./DesignationExplanation.css"
import { Link } from "react-router-dom";

function DesignationExplanation() {

    return (
        <div>
            <div class="container text-center" id="app-name">
                <Link class="link-offset-2 link-underline link-underline-opacity-0 homepage-link" to="/"><h1>NATIONAL SCENIC BYWAYS</h1></Link>
            </div>
            <div className="exp-desc">
                <h1>What's the difference between a National Scenic Byway and an All-American Road?</h1>
            </div>
            <div className="explanation">
                <p>To be designated as a National Scenic Byway, a byway must meet the criteria for at least one of six "intrinsic qualities": archeological, cultural, historic, natural, recreational, and scenic. The features contributing to the distinctive characteristics of the corridor’s intrinsic quality are recognized throughout the region and are considered regionally significant.</p><br></br>
                <p>To be designated as an All-American Road, a byway must meet criteria for at least two intrinsic qualities that are nationally significant and have one-of-a-kind features that do not exist elsewhere. The road or highway must also be considered a "destination unto itself." That is, the road must provide an exceptional traveling experience so recognized by travelers that they would make a drive along the highway a primary reason for their trip.</p>
            </div>
        </div>
    )
}

export default DesignationExplanation;