import React from "react";
import { render } from "@testing-library/react";
import StateMenu from "./StateMenu";

it("matches snapshot", function () {
    const { asFragment } = render(<StateMenu />);
    expect(asFragment()).toMatchSnapshot();
});

