

// if a component renders a link or a route, etc, you'll get a warning about context unless you wrap the unit test in a router component like Memory Routeer

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {fireEvent} from "@testing-library/dom";
import LoginForm from "./LoginForm";
import { ToastProvider } from 'react-toast-notifications';
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";
import { loginTest, delay } from "../login_test.js";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BywayApi from "../api/api";
jest.mock('../api/api', () => ({
  login: jest.fn()
}))

configure({adapter: new Adapter()});

it("clicking login calls callback", async () => {
  const mockCallBack = jest.fn();

  const wrapper = render(
    <ToastProvider><MemoryRouter  initialEntries={["/login"]}>
        {/* taking out the initialEntries because I don't know what the equivalent for login would be and it seems like /login would go with Route path */}
        <UserProvider>
          <Route path="/login">
          <LoginForm username="test" password="11111" login={mockCallBack}/>
          </Route>
        </UserProvider>
      </MemoryRouter></ToastProvider>,
  );

  
  userEvent.type(screen.getByTestId('username', 'test'));
  userEvent.type(screen.getByTestId('password', 'test'));
  const button = screen.getByTestId('loginSubmit');
  
  await fireEvent.click(button);

  expect(mockCallBack).toHaveBeenCalledTimes(1);
})

