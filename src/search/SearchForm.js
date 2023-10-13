import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchForm.css";
// import "./SearchFormTest.css"
import GeographicFeaturesSearch from "./GeographicFeaturesSearch";
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
      <div className="float-container" id='search-form'>
        <div class="container text-center" id="app-name">
        <Link class="link-offset-2 link-underline link-underline-opacity-0 homepage-link" to="/"><h1>NATIONAL SCENIC BYWAYS</h1></Link>
        </div>
        <div className="float-child w-50">
          <div className="byway-name-search">
            <form onSubmit={handleSubmit}>
              <p>Search byways by name</p>
              <label htmlFor="searchTerm">Byway Name:</label>
              <input
                  name="searchTerm"
                  // through the handleSubmit and its searchFor, the input's name makes it over to the search function in FilterSearch
                  placeholder="Enter search term.."
                  onChange={handleChange}
                  value={searchTerm}
              />
              <div>
                <button type="submit" class="btn btn-success btn-lg">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="not-name-searches">
            <form onSubmit={handleSubmitFilter}>
              <div className="length-search">
                <p>Search byways by length. The longest of America's Byways&reg; is the Alaska Marine Highway at 3500 miles!</p>
                <div class="input-group input-group-lg" id="min-length">
                  <label class="input-group-text" id="inputGroup-sizing-lg" htmlFor="minLength">Minimum Byway Length:</label>
                  <input
                      name="minLength"
                      placeholder="how many miles?"
                      value={minLength}
                      onChange={e => setMinLength(e.target.value)}
                  />
                </div>
                <div class="input-group input-group-lg">
                  <label class="input-group-text" id="inputGroup-sizing-lg" htmlFor="maxLength">Maximum Byway Length:</label>
                  <input
                      name="maxLength"
                      placeholder="how many miles?"
                      value={maxLength}
                      onChange={e => setMaxLength(e.target.value)}
                  />
                </div>
              </div>
              <div className="geo-features-search">
                <p>Search byways by geographic features. You'll see byways that contain all entered criteria.</p>
                <GeographicFeaturesSearch 
                  onChange={setGeoFeaturesSelect}
                  value={geoFeaturesSelect}
                />
                <p>Search by official designation</p>
                <DesignationSearch 
                  onChange={setDesignationSearch}
                  value={designationSearch}
                />
                <div>
                  <button type="submit" class="btn btn-success btn-lg">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="float-child">
          <img src="https://images.unsplash.com/photo-1592743263126-bb241ee76ac7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwc2NlbmVyeXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="road through forest" className="forest" ></img>
        </div>
    </div>
  );
}

export default SearchForm;
