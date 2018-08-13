import React from "react";
import { render } from "react-testing-library";
import LinkButton from ".";

describe("BigSofa LinkButton units", () => {
  it("renders LinkButton", () => {
    const { getByText } = render(<LinkButton>button text</LinkButton>);
    expect(getByText(/button text/i)).toBeInTheDocument();
  });

  it("button is disabled when 'disabled' attribute added", () => {
    const { getByText } = render(<LinkButton disabled>button text</LinkButton>);
    expect(getByText("button text")).toBeDisabled();
  });
});
