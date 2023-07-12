import React, { useState } from "react";
import FilterSearch from "./FilterSearch";
// import "./SearchForm.css";
import GeographicFeaturesSearch from "./GeoFeaturesSearch";
import DesignationSearch from "./DesignationSearch";

/** Search widget.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor, filterByways }) {
  // searchFor and filterByways are defined in FilterSearch (searchFor as search); when that component calls this one, those become useable here
  console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");
  const [minLength, setMinLength] = useState(0);
  const [maxLength, setMaxLength] = useState("");
  const [geoFeaturesSelect, setGeoFeaturesSelect] = useState({});
  const [designationSearch, setDesignationSearch] = useState({});
  // added the geoFeaturesSelect useState, setGeoFeaturesSelect gets set in the onChange in GeographicFeaturesSearch (passed in when that component is called in the JSX below in this component)


  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm('');
  }

  function handleSubmitFilter(e) {
    e.preventDefault();
    filterByways({minLength, maxLength, geoFeaturesSelect, designationSearch})

  }
  // handles submit for searches involving filters, i.e. not searching by name. sends filters for search over to FilterSearch, which is where filterByways is defined
  // e comes from the onChange in min and max length's onChange; different from other filters because it's a value the user is typing in rather than a checkbox

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
      <div>
        <div className="all-searches">
          <form className="byway-name-search" onSubmit={handleSubmit}>
            <p>Search byways by name</p>
            <label htmlFor="searchTerm">Byway Name:</label>
            <input
                name="searchTerm"
                // through the handleSubmit and its searchFor, the input's name makes it over to the search function in FilterSearch
                placeholder="Enter search term.."
                onChange={handleChange}
                value={searchTerm}
            />
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="not-name-searches">
          <form onSubmit={handleSubmitFilter}>
            <p>Search byways by length. The longest of America's Byways&reg; is the Alaska Marine Highway at 3500 miles!</p>
            <label htmlFor="minLength">Minimum Byway Length:</label>
            <input
                name="minLength"
                placeholder="how many miles?"
                value={minLength}
                onChange={e => setMinLength(e.target.value)}
            />
            <label htmlFor="maxLength">Maximum Byway Length:</label>
            <input
                name="maxLength"
                placeholder="how many miles?"
                value={maxLength}
                onChange={e => setMaxLength(e.target.value)}
            />
            <p>Search byways by geographic features. You'll see byways that contain all entered criteria.</p>
            <GeographicFeaturesSearch 
              onChange={setGeoFeaturesSelect}
              value={geoFeaturesSelect}
            />
            <DesignationSearch 
              onChange={setDesignationSearch}
              value={designationSearch}
            />
            
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
  );
}

export default SearchForm;
