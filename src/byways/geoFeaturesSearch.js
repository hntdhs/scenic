import React from "react";

function geographicFeaturesSearch() {
    const categories = [ canyon, coastline, desert, forest, grasslands, lake, mountains, swamp, river, urban];

    function updateFilters() {
        // send anything user checks as query values; send via params?
    }
}

return (
    <div>
        {categories.map(c => (
            <input
            type="checkbox"
            // name = categories[ind]
            onChange={(e) => updateFilters(e.target.checked)}
          />
        ))

        }
    </div>
)
// don't need to submit search here
// could also do checkbox search and send in categories as props?
// function checkboxSearch() {
//     const categories = props;

        // return (
        //     <div>
        //         {props.categories.map(category =>
        //             <input type="checkbox"
        //             name="{category}"
        //             onChange={(e) => updateFilters(e.target.checked)}
        //             />
        //         )}
        //     </div>
        // )

        // then in search form component...
        // <CheckboxSearch categories = [etc, etc]
        // does 'props' have to be imported anywhere?

        // you put 'props' into the component, then when that component is used elsewhere, you'd add the specifics in there - <geoFeaturesSearch categories=[etc etc] />
// }

export default geographicFeaturesSearch;