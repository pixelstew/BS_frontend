import React from "react";
import { render } from "react-testing-library";
import Button from ".";

describe("BigSofa Button units", () => {
  it("renders button", () => {
    const { getByText } = render(<Button>button text</Button>);
    expect(getByText(/button text/i)).toBeInTheDocument();
  });

  it("Calls onClick function", () => {
    const clickHandler = jest.fn();
    const { getByText } = render(
      <Button onClick={() => clickHandler()}>button text</Button>
    );
    getByText("button text").click();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
