import React from "react";
import { render } from "@testing-library/react";
import StateMenu from "./StateMenu";
import puppeteer from 'puppeteer-core'

it("matches snapshot", function () {
    const { asFragment } = render(<StateMenu />);
    expect(asFragment()).toMatchSnapshot();
});

