import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {fireEvent} from "@testing-library/dom";
import CommentForm from "../actions//CommentForm";
import { ToastProvider } from 'react-toast-notifications';
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";
import { loginTest, delay } from "../login_test.js";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BywayApi from "../api/api";
import ProfileForm from "./ProfileForm";


jest.useFakeTimers();

configure({adapter: new Adapter()});

it("clicking submit calls callback", async () => {
  const mockCallBack = jest.fn();

  const wrapper = render(
    <ToastProvider><MemoryRouter initialEntries={["/profile"]}>
        {/* taking out the initialEntries because I don't know what the equivalent for login would be and it seems like /login would go with Route path */}
        <UserProvider>
          <Route path="/profile">
          <ProfileForm username="test" profileData="test" callback={mockCallBack}/>
          {/* not sure what to put for profile data since it's expecting bio, profile photo and two other things */}
          </Route>
        </UserProvider>
      </MemoryRouter></ToastProvider>,
  );

  const button = screen.getByTestId('save-button');
  
  await fireEvent.click(button);
  expect(mockCallBack).toHaveBeenCalledTimes(1);
})

