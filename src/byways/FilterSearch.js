
import React, { useState } from "react";
import BywayApi from "../api/api";
import SearchForm from "../common/SearchForm";

// search via filters, go to browse by state, go to display and search users


function FilterSearch() {
    
    const [byways, setByways] = useState(null);

    // useEffect for getting the byways? need methods for getting random ones or alphabetical order? or let byways, then for loop with those byways to shuffle, then display 10?
    useEffect(() => {
        async function getByways() {
            let byways = await BywayApi.getAllByways();
            // narrow it here?
            setByways(byways);
        }
        getByways();
    }, []);

    async function search(name) {
        let byways = await BywayApi.getByways(name);
        // is getByways right?
        setByways(byways);
    }

    return (
        <div>
            <SearchForm searchFor={search} />
            {/* byway card mapping - could I do a for loop to display 10 byways here too? */}
        </div>
    );
}

export default FilterSearch;


