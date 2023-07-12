import React from "react";
import { render } from "@testing-library/react";
import DesignationSearch from "./DesignationSearch.js";
import { expect } from "@jest/globals";

it("matches snapshot", function () {
  const testHandlerMock = jest.fn(x => 42 + x);
    const { asFragment } = render(<DesignationSearch onChange={testHandlerMock} />);
    expect(asFragment()).toMatchSnapshot();
    expect(testHandlerMock).toBeCalled()
  });