import React from "react";
import { render } from "@testing-library/react";
import DesignationExplanation from "./DesignationExplanation.js"

it("matches snapshot", function () {
    const { asFragment } = render(<DesignationExplanation />);
    expect(asFragment()).toMatchSnapshot();
  });