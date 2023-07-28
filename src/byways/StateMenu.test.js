import React from "react";
import { render, screen } from "@testing-library/react";
import {act} from 'react-dom/test-utils';
import '@testing-library/jest-dom'
import { ToastProvider } from 'react-toast-notifications';
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";
import { loginTest, delay } from "../login_test.js";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BywayApi from "../api/api";
import StateMenu from "./StateMenu.js";
import { JsonWebTokenError } from "jsonwebtoken";
import axios from "axios";

configure({adapter: new Adapter()});
jest.mock('axios')

it("clicking state link calls callback", async () => {
  axios.mockResolvedValue({
    data: [{
      "name": "Alabama",
      "nickname": "Yellowhammer State",
      "image": "/stateOutlines/Alabama.png"
  }]
  })
  
  const wrapper = await act( async () => render(
    <ToastProvider><MemoryRouter initialEntries={["/states/Alabama"]}>
        <UserProvider>
          <Route path="/states">
          <StateMenu/>
          </Route>
        </UserProvider>
      </MemoryRouter></ToastProvider>,
  ));
  await new Promise((r) => setTimeout(r, 2000))
  console.log(wrapper)
  expect(screen.getByText('Alabama')).toBeInTheDocument()

})

