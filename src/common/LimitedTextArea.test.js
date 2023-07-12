import React from "react";
import { render } from "@testing-library/react";
import LimitedTextArea from "./LimitedTextArea.js"
import { expect } from "@jest/globals";

it("matches snapshot", function () {
    const testHandlerMock = jest.fn(x => 42 + x);
    const { asFragment } = render(<LimitedTextArea value="Just some text" onChange={testHandlerMock} />);
    expect(testHandlerMock).toBeCalled()
  });