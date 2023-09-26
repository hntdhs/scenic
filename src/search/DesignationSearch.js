import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import "./DesignationSearch.css";


function DesignationSearch({ onChange }) {
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
                <div className="link">
                    <a href="/designations-explanation">What are these?</a>
                </div>
                {categories.map((c, i) => (
                    <div key={i} className="form-check form-check-inline">
                        <label key={c} htmlFor={c}>{c}</label>
                        <Checkbox onChange={changeHandler} name={c}/>
                    </div>
                ))
        
                }
            </div>
        )
}

export default DesignationSearch;