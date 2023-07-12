import React from "react";
import { render } from "@testing-library/react";
import Pagination from "./Pagination";

it("matches snapshot", function () {
    const { asFragment } = render(<Pagination nPages={3}
      currentPage={1}
      setCurrentPage={() => {}}/>);
    expect(asFragment()).toMatchSnapshot();
  });
