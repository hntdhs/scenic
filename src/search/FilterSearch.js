
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BywayApi from "../api/api";
import SearchForm from "./SearchForm";
import BywayCard from "../byways/BywayCard";
import Pagination from "../common/Pagination";
import { useToasts } from 'react-toast-notifications';

// search via filters, go to browse by state, go to display and search users

function FilterSearch() {
    const { addToast } = useToasts();
    const [byways, setByways] = useState([]);
    const [errors, setErrors] = useState([]);
    const [currentByWays, setCurrentByWays] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [bywaysPerPage] = useState(10);
    
    const [nPages, setNPages] = useState(0); 

    const history = useHistory();
    
    useEffect(() => {
        setNPages(Math.ceil(byways.length / bywaysPerPage))
        const indexOfLastByway = currentPage * bywaysPerPage;
        const indexOfFirstByway = indexOfLastByway - bywaysPerPage;
        const currentByways = byways.slice(indexOfFirstByway, indexOfLastByway)
        setCurrentByWays(currentByways)

    }, [byways, currentPage])
    // every time currentPage changes, the useEffect runs

    useEffect(() => {
        async function getBywaysForDisplay() {
            let byways = await BywayApi.getAllByways();
            setByways(byways);
        }
        getBywaysForDisplay();
    }, []);
    // display error to user - try/catch?

    async function filterByways(filters) {
        try {
            debugger
            let byways = await BywayApi.search(filters);
            setByways(byways);
            if (!byways.length) {
                history.push("/noresults");
            }
        } catch (errors) {
            if (errors.length > 0) {
                addToast(errors[0], { appearance: 'error' });
                // can add error messaging/alerts with Toast before anything is sent to the back, like so:
                //addToast("your search term must be more than 3 characters", { appearance: 'error' });
            }
            setErrors(errors);
        }
    }

    async function search(name) {
        let byways = await BywayApi.search({name});
        setByways(byways);
        if (!byways.length) {
            history.push("/noresults");
            // Alert type="success" messages={["Updated successfully."]} 
        }
    }

    return (
        <div>
            <div>
                <SearchForm searchFor={search} filterByways={filterByways} errors={errors} />
                {/* search and filterByways are defined here, passing them over to SearchForm to make them useable there; don't actually know if errors is necessary to pass, didn't end up using it */}
            </div>
            <div>
                {currentByWays.length > 0
                ? (
                    <div>
                        <div>
                            {currentByWays.map(s => (
                                <BywayCard
                                    key={s.name + s.state}
                                    name={s.name}
                                    image={s.image}
                                    designation={s.designation}
                                />
                            ))}
                        </div>
                        <div>
                            <Pagination
                                nPages={nPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                        
                    </div>
                ) : (
                    <h4>no byways in system.</h4>
                )}
            </div>
        </div>
        
    );
}

export default FilterSearch;


