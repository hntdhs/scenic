import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BywayApi from "../api/api";
import BywayCard from "./BywayCard";
import LoadingSpinner from "../common/LoadingSpinner";



// shows cards of each byway that's in the state
// the issue is that i don't know how to do 'if byway is in this state, return it so it can be displayed on this page'. i don't see where in jobly it does 'if job is from this company return it so it can be displayed on company page.' (looks like it's in the models folder in the backend)
// has to load all the byways that are in this state - thinking something like 'return byways where state = x’ -  but where does this go? somewhere in the backend i'm sure. should there be a getBywaysByState method in api? otherwise it's basically the same as CompanyList
// checkout the routes folder in jobly backend, there's a lot in there i haven't done for scenic that needs doing that could be causing problems



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

    // if (stateByways.length === 0) return <LoadingSpinner />;
    // if I just link to the same 404 page that byway detail links to then it won't say 'this state doesn't have any byways'

    return (
        <div>
            <h2>Check Out the Scenic Drives Available in {name}!</h2>
            {/*  */}
            {stateByways.length
            // states.length > 0
            ? (
                <div>
                    {stateByways.map(s => (
                        <BywayCard
                            key={s.name}
                            name={s.name}
                            image={s.image}
                            designation={s.designation}
                        />
                    ))}
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