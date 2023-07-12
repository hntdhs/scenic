import React from "react";
import { render } from "@testing-library/react";
import StateCard from "./StateCard";
import { MemoryRouter } from "react-router";
import { expect } from "@jest/globals";

it("matches snapshot", function () {
    const stateCard = { name: "Nebraska", image: "/stateOutlines/Nebraska.png", nickname: "Cornhusker State"  }
    const { asFragment } = render(
        <MemoryRouter>
            <StateCard stateCard={stateCard} />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});