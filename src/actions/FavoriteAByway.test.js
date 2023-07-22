import React from "react";
import { render } from "@testing-library/react";
import FavoriteAByway from "./FavoriteAByway.js"
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

it("matches snapshot", function () {

    const { asFragment } = render( 
    <MemoryRouter>
      <UserProvider>
      <FavoriteAByway />
      </UserProvider>
    </MemoryRouter>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows up on a user's profile page when they favorite a byway", function() {

  })