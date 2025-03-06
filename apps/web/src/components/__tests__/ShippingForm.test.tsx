import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ShippingForm } from "../ShippingForm";
import userEvent from "@testing-library/user-event";

jest.mock("@hooks", () => ({
  useCountries: () => ({
    countries: [
      { cca2: "US", name: "United States" },
      { cca2: "CA", name: "Canada" },
      { cca2: "MX", name: "Mexico" },
      { cca2: "ES", name: "Spain" },
    ],
    fetchCountries: jest.fn(),
    isValidCountry: (country: string) =>
      ["United States", "Canada", "Mexico"].includes(country),
  }),
}));

describe("ShippingForm component", () => {
  const mockOnSubmit = jest.fn();
  it("renders form with all required fields ", () => {
    render(<ShippingForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/país/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /confirmar envío/i })
    ).toBeDisabled();
  });

  it("enables submit button when all fields are valid", async () => {
    const user = userEvent.setup();
    render(<ShippingForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/nombre/i), "Diego");
    await user.type(screen.getByLabelText(/email/i), "correo@gmail.com");
    await user.type(screen.getByLabelText(/teléfono/i), "3008536112");

    const countrySelect = screen.getByLabelText(/país/i);
    fireEvent.mouseDown(countrySelect);

    await waitFor(() => {
      const mexicoOption = screen.getByText("Mexico");
      fireEvent.click(mexicoOption);
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /confirmar envío/i })
      ).toBeEnabled();
    });
  });

  it("shows error when country not in America is selected", async () => {
    const user = userEvent.setup();

    render(<ShippingForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/nombre/i), "Diego");
    await user.type(screen.getByLabelText(/email/i), "correo@gmail.com");
    await user.type(screen.getByLabelText(/teléfono/i), "3008536112");

    const countrySelect = screen.getByLabelText(/país/i);
    fireEvent.mouseDown(countrySelect);

    await waitFor(() => {
      const spainOption = screen.getByText("Spain");
      fireEvent.click(spainOption);
    });

    await waitFor(() => {
      expect(
        screen.getByText(/el país seleccionado no está en américa/i)
      ).toBeInTheDocument();
    });

    expect(
      screen.getByRole("button", { name: /confirmar envío/i })
    ).toBeDisabled();
  });
});
