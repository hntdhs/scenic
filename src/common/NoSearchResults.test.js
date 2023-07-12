import React from "react";
import { render } from "@testing-library/react";
import NoSearchResults from "./NoSearchResults.js"
import { BrowserRouter } from "react-router-dom";

it("matches snapshot", function () {
    const { asFragment } = render(<BrowserRouter><NoSearchResults /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
  });