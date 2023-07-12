import React from "react";
import { render } from "@testing-library/react";
import UsersList from "./UsersList";

it("matches snapshot", function () {
    const { asFragment } = render(<UsersList />);
    expect(asFragment()).toMatchSnapshot();
  });