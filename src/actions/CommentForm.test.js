import React from "react";
import { render } from "@testing-library/react";
import CommentForm from "./CommentForm";
import { ToastProvider } from 'react-toast-notifications';
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("matches snapshot", function () {
    const { asFragment } = render(
    <ToastProvider>
      <MemoryRouter>
        <UserProvider>
        <CommentForm byway={'Great River Road'}/>
        </UserProvider>
        </MemoryRouter>
        </ToastProvider>);
    expect(asFragment()).toMatchSnapshot();
  });