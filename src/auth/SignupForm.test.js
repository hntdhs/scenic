import React from "react";
import { render } from "@testing-library/react";
import SignupForm from "./SignupForm";
import { MemoryRouter } from "react-router";
import { ToastProvider } from "react-toast-notifications";

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <ToastProvider>
          <SignupForm />
        </ToastProvider>
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});