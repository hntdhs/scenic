import React from "react";
import { render } from "@testing-library/react";
import { UserProvider } from "../testUtils.js"
// ../actions/FavoriteAByway
import { MemoryRouter, Route  } from "react-router-dom";
import StateDetail from "./StateDetail";
 

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter>
          <UserProvider>
            <Route path="/states/:name">
              <StateDetail name="" image="" designation=""/>
              {/* test like this for byways that would appear on the state page? */}
            </Route>
          </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });