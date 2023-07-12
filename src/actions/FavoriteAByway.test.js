import React from "react";
import { render } from "@testing-library/react";
import FavoriteAByway from "./FavoriteAByway.js"
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("matches snapshot", function () {

    const { asFragment } = render( 
    <MemoryRouter>
      <UserProvider>
      <FavoriteAByway />
      </UserProvider>
    </MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
  });