import React from "react";
import { render } from "@testing-library/react";
import FilterSearch from "./FilterSearch.js";
import { ToastProvider } from 'react-toast-notifications';

it("matches snapshot", function () {
    const { asFragment } = render(<ToastProvider><FilterSearch /></ToastProvider>);
    expect(asFragment()).toMatchSnapshot();
  });