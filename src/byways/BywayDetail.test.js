import React from "react";
import { render } from "@testing-library/react";
import BywayDetail from "./BywayDetail";
// when importing needed components from other files, if they're 'export default they can be named anything here. so this could be import Byway or import BywayDetail or anything else
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";
import { ToastProvider } from 'react-toast-notifications';


it("renders without crashing", function () {
    render(
      <ToastProvider>
        <MemoryRouter>
          <UserProvider>
            <BywayDetail />
          </UserProvider>
        </MemoryRouter>
      </ToastProvider>
    );
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <ToastProvider>
        <MemoryRouter initialEntries={["/byways/Merritt%20Parkway"]}>
          {/* starting from the route given in initialEntries, MemoryRouter is necessary, see line 17 of comp detail - const { handle } = useParams(); - it needs a handle because the component is taking the company from the parameters */}
          {/* just storing the rendering in memory since nothing is actually rendering it */}
          <UserProvider>
            {/* feeding in current user info */}
            <Route path="/byways/:name">
              <BywayDetail name="Merritt%20Parkway" state="Connecticut" length="37" geographic_features="Forest"/>
            </Route>
          </UserProvider>
        </MemoryRouter></ToastProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <ToastProvider>
        <MemoryRouter initialEntries={["/byways/Arroyo%20Seco%20Historic%20Parkway"]}>
          <UserProvider>
            <Route path="/byways/:name">
              <BywayDetail name="Arroyo%20Seco%20Historic%20Parkway" state="California" length="9" designation="National Scenic Byway" fees="none" image="https://fhwaapps.fhwa.dot.gov/bywaysp/uploads/asset_files/2176/36428_S20082-04_sq.jpg" description="The Arroyo Seco Parkway connects Los Angeles and Pasadena through the historic Arts and Crafts landscape of the Arroyo Seco. Conceived in the parkway tradition with gentle curves, lush landscaping, and scenic vistas, the byway incorporated the modern elements that would lay the groundwork for the California freeway system." geographic_features=""/>
            </Route>
          </UserProvider>
        </MemoryRouter></ToastProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <ToastProvider>
        <MemoryRouter initialEntries={["/byways/Talladega%20Scenic%20Drive"]}>
          <UserProvider>
            <Route path="/byways/:name">
              <BywayDetail name="Talladega%20Scenic%20Drive" state="Alabama" length="26.4" designation="National Scenic Byway" fees="There is a $1.00 per person fee to take an optional side trip into the Cheaha State Park." image="https://fhwaapps.fhwa.dot.gov/bywaysp/uploads/asset_files/2057/67321_talladega_primary_photo_sq.jpg" description="Talladega Drive offers a bird's-eye view of scenic mountains, rock outcroppings, and small rural settlements within the Talladega National Forest. Heading towards Cheaha State Park and Alabama's highest peak, with an elevation of 2,407 feet, travel the backbone of Horseblock and Cheaha Mountains, the southernmost extension of the Appalachian Mountains." geographic_features="Forest and mountains"/>
            </Route>
          </UserProvider>
        </MemoryRouter></ToastProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("matches snapshot", function () {
    const { asFragment } = render(
      <ToastProvider><MemoryRouter initialEntries={["/byways/Talladega%20Scenic%20Drive"]}>
          <UserProvider>
            <Route path="/byways/:name">
              <BywayDetail name="Glenn%20Highway" state="Alaska" length="135" designation="National Scenic Byway" fees="None" image="https://fhwaapps.fhwa.dot.gov/bywaysp/uploads/asset_files/2483/36398_S20074-16_sq.jpg'" description="Tracing the receding glaciers responsible for this rugged gateway to Alaska's interior, Glenn Highway tells of powerful geological processes and the resourceful people who have managed to thrive along its corridor. Begin your journey in Anchorage and wind along 135 miles through fascinating landscapes, historical sites, and cozy roadhouses." geographic_features="Mountains, forest, and river"/>
            </Route>
          </UserProvider>
        </MemoryRouter></ToastProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
