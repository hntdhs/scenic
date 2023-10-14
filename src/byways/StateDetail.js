import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BywayApi from "../api/api";
import BywayCard from "./BywayCard";
import "./StateDetail.css";
import LoadingSpinner from "../common/LoadingSpinner";



// shows cards of each byway that's in the state



function StateDetail() {
    const { name } = useParams();

    const [stateByways, setStateByways] = useState([]);

    useEffect(() => {
        async function getStateDetail(name) {
            let stateByways = await BywayApi.findBywaysByState(name);
            setStateByways(stateByways);
        }
        getStateDetail(name);
    }, [name]);

    return (
        <div>
            <div class="container text-center" id="app-name">
                <Link class="link-offset-2 link-underline link-underline-opacity-0 homepage-link" to="/"><h1>NATIONAL SCENIC BYWAYS</h1></Link>
            </div>

            {stateByways.length
            // states.length > 0
            ? (
                <div>
                    <div className="check-out-box">
                        <h2 className="check-out-message">Check Out the Scenic Drives Available in {name}!</h2>
                    </div>
                    <div className='row'>
                        {stateByways.map(s => (
                            <div className="card col-4">
                                <BywayCard
                                    key={s.name}
                                    name={s.name}
                                    image={s.image}
                                    designation={s.designation}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <h4>Sorry, {name} has no byways.</h4>
            )}
        </div>
    )
}

export default StateDetail;




// this should be byway information, not state 0 look at CompanyDetail
// export default function (props) {
//     let { state } = useParams();
//     const routeParams = useParams();
//     console.log('state', routeParams);
//     const [stateData, setStateData] = useState({})
//     useEffect(() => {
//         // stateData = BywayApi.getState
//         // setStateData(stateData)
//         setStateData(BywayApi.getState(routeParams.name).then(e => {
//             console.log(e)
//         }))

//     }, [routeParams?.name])
//     // why the question mark?
    
//     // if (routeParams?.name) {
//     //     return <div>{routeParams.name}</div>;
//     // } else {
//     //     return <span></span>;
//     // }


// }