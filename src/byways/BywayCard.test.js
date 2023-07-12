import React from "react";
import { render } from "@testing-library/react";
import BywayCard from "./BywayCard";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <BywayCard
            name="Great River Road"
            image="https://fhwaapps.fhwa.dot.gov/bywaysp/uploads/asset_files/2279/82535_1-4Effigy%20Mounds%20National%20Monument%20Fire%20Point1_sq.jpg"
            designation="All-American Road"
            />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});


it("matches snapshot", function () {
    const byway = { name: "byway", image: "imageURL", designation: "designation" }
    const { asFragment } = render(
        <MemoryRouter>
            <BywayCard byway={byway} />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});

// should there be comma after closing bracket of memory router? that's how it is in jobly
