import React from "react";
import { render } from "@testing-library/react";
import GeographicFeaturesSearch from "./GeographicFeaturesSearch.js";
import { expect } from "@jest/globals";

it("matches snapshot", function () {
  const testHandlerMock = jest.fn(x => 42 + x);
    const { asFragment } = render(<GeographicFeaturesSearch onChange={testHandlerMock}/>);
    expect(asFragment()).toMatchSnapshot();
    expect(testHandlerMock).toBeCalled()
  });