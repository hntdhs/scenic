import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {fireEvent} from "@testing-library/dom";
import FavoriteAByway from "./FavoriteAByway";
import { ToastProvider } from 'react-toast-notifications';
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import FavoriteAByway from "./FavoriteAByway";

jest.mock('../api/api', () => ({
    favoriteAByway: jest.fn()
}))

configure({adapter: new Adapter()});

it("clicking submit calls callback", async () => {
  const mockCallBack = jest.fn();

  const wrapper = render(
    <ToastProvider><MemoryRouter initialEntries={["/byways/Talladega%20Scenic%20Drive"]}>
        <UserProvider>
          <Route path="/byways/:name">
          <FavoriteAByway username="test" id="1" callback={mockCallBack}/>
          </Route>
        </UserProvider>
      </MemoryRouter></ToastProvider>,
  );
  const button = screen.getByTestId('submit_favorite');
  
  await fireEvent.click(button);
  expect(mockCallBack).toHaveBeenCalledTimes(1);
})
// it gave me an error saying that FavoriteAByway was already declared, so I commented out the import line and left the jest.mock. but in comment form those two things have different names, so I wonder if that's why this is erroring