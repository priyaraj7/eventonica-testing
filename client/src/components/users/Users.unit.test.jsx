import { render, screen } from "@testing-library/react";
//User-event dispatches the events like they would happen if a user interacted with the document.
import userEvent from "@testing-library/user-event";
import Users from "./Users";

describe("should render text in <Users /> component", () => {
  it("renders User Management text", () => {
    render(<Users />);
    const text = screen.getByText(/User Management/i);
    expect(text).toBeInTheDocument();
  });

  it("renders list of users text", () => {
    render(<Users />);
    const text = screen.getByText(/List of Users/i);
    expect(text).toBeInTheDocument();
  });

  it("renders add user text", () => {
    render(<Users />);
    const text = screen.getByText(/Add User/i);
    expect(text).toBeInTheDocument();
  });
});

describe("should render form  and form element", () => {
  it("render name input", () => {
    render(<Users />);

    const inputEl = screen.getByTestId("add-user-name");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });

  it("pass valid name to test name input field", () => {
    render(<Users />);

    const inputEl = screen.getByTestId("add-user-name");
    userEvent.type(inputEl, "test");

    expect(screen.getByTestId("add-user-name")).toHaveValue("test");
  });
  it("render email input", () => {
    render(<Users />);

    const inputEl = screen.getByTestId("add-user-email");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "email");
  });

  it("pass valid email to test email input field", () => {
    render(<Users />);

    const inputEl = screen.getByTestId("add-user-email");
    userEvent.type(inputEl, "test@mail.com");

    expect(screen.getByTestId("add-user-email")).toHaveValue("test@mail.com");
  });

  it("submit button should be disabled when Name is empty & should not disable when name field is not empty", () => {
    render(<Users />);
    const inputElName = screen.getByLabelText("Name");
    const inputElEmail = screen.getByLabelText("Email");
    let buttonElement = screen.getByRole("button", {
      name: /add/i,
    });

    expect(buttonElement).toHaveAttribute("disabled");
    // screen.debug(buttonElement);

    // This is also not working
    userEvent.type(inputElName, "John Doe");
    userEvent.type(inputElEmail, "John@gmail.com");

    expect(buttonElement).not.toHaveAttribute("disabled");
  });
});
