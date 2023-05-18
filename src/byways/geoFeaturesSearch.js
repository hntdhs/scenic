import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

function GeographicFeaturesSearch({ onChange }) {
    const categories = [ 'canyon', 'coastline', 'desert', 'forest', 'grasslands', 'lake', 'mountains', 'swamp', 'river', 'urban'];
    const [selected, setSelected] = useState([])
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
                setSelected(seleted)
            }
            // this is used in SearchForm so that's where the value prop is given - value={geoFeaturesSelect}
            
        }
    }
    return (
        <div>
            {categories.map(c => (
                <div className="single-checkbox">
                    <label key={c} htmlFor={c}>{c}</label>
                    <Checkbox onChange={changeHandler} name={c}/>
                </div>
            ))
    
            }
        </div>
    )
}
 

export default GeographicFeaturesSearch;