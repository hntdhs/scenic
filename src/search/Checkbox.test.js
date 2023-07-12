import React from "react";
import { render } from "@testing-library/react";
import Checkbox from "./Checkbox.js"

it("matches snapshot", function () {
    const { asFragment } = render(<Checkbox />);
    expect(asFragment()).toMatchSnapshot();
  });