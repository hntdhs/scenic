import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

function GeographicFeaturesSearch({ onChange }) {
    const categories = [ 'canyon', 'coastline', 'desert', 'forest', 'grasslands', 'lake', 'mountains', 'swamp', 'river', 'urban'];
    const [selected, setSelected] = useState([]);
    // didn't work properly without doing the useState and useEffect and changeHandler here and instead doing it in the SearchForm component where it's called
        
    useEffect(() => {
        onChange(selected)
    }, [selected]);

    const changeHandler = (props) => {
        if (props.checked) {
            const index = selected.indexOf(props.value)
            if (index > -1) {
                selected.splice(index, 1)
                setSelected(selected)
            } else {
                selected.push(props.value);
                setSelected(selected)
            }
            // this is creating an array, checking to be sure that what's selected isn't already in the array then adding
            // this is used in SearchForm so that's where the value prop is given - value={geoFeaturesSelect}
            
        }
    }
    return (
        <div>
            {categories.map((c,i) => (
                <div key={i} className="form-check form-check-inline">
                    <Checkbox onChange={changeHandler} name={c}/>
                    {/* <label key={c} htmlFor={c} class="form-check-label">{c}</label> */}
                    <label key={c} htmlFor="flexCheckChecked" class="form-check-label">{c}</label>
                </div>
            ))
    
            }
        </div>
    )
}
 

export default GeographicFeaturesSearch;