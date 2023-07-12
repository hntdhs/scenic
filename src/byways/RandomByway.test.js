import React from "react";
import { render } from "@testing-library/react";
import DisplayRandomByway from "./RandomByway";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <DisplayRandomByway
                name="Hells Canyon Scenic Byway"
                image="https://fhwaapps.fhwa.dot.gov/bywaysp/uploads/asset_files/2145/44834_OR_hells_canyon_sq.jpg"
            />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
}
)

// not sure how to go about testing whether truncate char count function is cutting off description at 500. can't load an actual page I don't think. it's just /random, not /random/whateverbyway. maybe feed it a description here that's > 500, and test that makes sure it's 500 or less because the function should shorten it after I feed it in?
// unit test that calls truncate char count twice, once > 500 and once < 500, so testing the function itself

// in JSX, it's <p>{truncateCharCount(byway)}</p>, not description. not even sure how i'd add that along with name and image

// try fireEvent that would load a new RandomByway

// is there a way to insert information?
// initialEntries