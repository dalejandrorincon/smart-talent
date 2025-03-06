import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Button from "../Button";

describe("Button component", () => {
  it("renders button with text", () => {
    render(<Button>Comprar</Button>);

    const buttonElement = screen.getByText("Comprar");
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Comprar</Button>);

    const buttonElement = screen.getByText("Comprar");
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies correct styles for primary variant", () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole("button", { name: /primary/i });
    expect(window.getComputedStyle(button).backgroundColor).toBe(
      "rgb(2, 40, 79)"
    );
  });

  it("applies correct styles for secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button", { name: /secondary/i });
    expect(window.getComputedStyle(button).backgroundColor).toBe(
      "rgb(194, 142, 64)"
    );
  });

  it('renders as a link when "to" prop is provided', () => {
    render(
      <BrowserRouter>
        <Button to="/some-path" variant="text">
          Link Button
        </Button>
      </BrowserRouter>
    );

    const linkButton = screen.getByText("Link Button");
    expect(linkButton.closest("a")).toHaveAttribute("href", "/some-path");
  });
});
