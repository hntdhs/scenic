import React from "react";
import { render } from "@testing-library/react";
import CommentForm from "./CommentForm";
import { ToastProvider } from 'react-toast-notifications';
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";
import { loginTest, delay } from "../login_test.js";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BywayApi from "../api/api";
jest.mock('../api/api', () => ({
  makeComment: jest.fn()
}))

configure({adapter: new Adapter()});

it("clicking submit calls callback", async () => {
  const mockCallBack = jest.fn();

  const wrapper = mount(
    <ToastProvider><MemoryRouter initialEntries={["/byways/Talladega%20Scenic%20Drive"]}>
        <UserProvider>
          <Route path="/byways/:name">
          <CommentForm name="test" id="1" onAdd={mockCallBack}/>
          </Route>
        </UserProvider>
      </MemoryRouter></ToastProvider>,
  );

  const button = wrapper.find('#comment_submit')
  await button.simulate('click');
  expect(mockCallBack).toHaveBeenCalledTimes(1);
})

