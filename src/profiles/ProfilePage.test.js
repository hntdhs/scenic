import React from "react";
import { render } from "@testing-library/react";
import ProfilePage from "./ProfilePage";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";
import { ToastProvider } from 'react-toast-notifications';

it("matches snapshot", function () {
    const { asFragment } = render(
        <ToastProvider>
            <MemoryRouter>
                <UserProvider>
                    <ProfilePage />
                </UserProvider>
            </MemoryRouter>
        </ToastProvider>
    );
    expect(asFragment()).toMatchSnapshot();
})

// UserProvider never feeds in a username or anything like that in jobly