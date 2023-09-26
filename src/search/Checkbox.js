import React, { useState } from "react";

function Checkbox(props) {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
        props.onChange({'checked': !checked, 'value': props.name})
    };
    // wasn't handling the useState or handleChange here before and it didn't work; always best to handle it more directly like this

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    name={props.name}
                    value={props.name}
                    class="form-check-input"
                />
            </label>
        </div>
    );
};

export default Checkbox;