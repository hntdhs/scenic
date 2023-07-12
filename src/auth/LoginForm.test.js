import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router";
import { ToastProvider } from 'react-toast-notifications';

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <ToastProvider>
          <LoginForm />
        </ToastProvider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
// if a component renders a link or a route, etc, you'll get a warning about context unless you wrap the unit test in a router component like Memory Routeer