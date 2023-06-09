import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

function DesignationSearch({onChange }) {
    const categories = ['All-American Road', 'National Scenic Byway'];
    const [selected, setSelected] = useState([]);

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
            // this is used in SearchForm so that's where the value prop is given - value={geoFeaturesSelect}
            
        }
    }

        return (
            <div>
                <a href="/designations-explanation">What are these?</a>
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

export default DesignationSearch;