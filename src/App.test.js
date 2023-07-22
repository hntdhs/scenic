import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

let windowSpy;


it("renders without crashing", function() {
  global.scrollTo = jest.fn()
  
  render(<App />);
});