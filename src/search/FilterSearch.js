
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import BywayApi from "../api/api";
import SearchForm from "./SearchForm";
import BywayCard from "../byways/BywayCard";
import Pagination from "../common/Pagination";

// search via filters, go to browse by state, go to display and search users

function FilterSearch() {
    
    const [byways, setByways] = useState([]);
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
            let byways = await BywayApi.search(filters);
            setByways(byways);
            if (!byways.length) {
                history.push("/noresults");
            }
        } catch (errors) {
            return;
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
                <SearchForm searchFor={search} filterByways={filterByways} />
                {/* search and filterByways are defined here, passing them over to SearchForm to make them useable there */}
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


