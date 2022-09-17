import { render, screen, fireEvent } from "@testing-library/react";
//User-event dispatches the events like they would happen if a user interacted with the document.
import userEvent from "@testing-library/user-event";
import Users from "./Users";
import * as api from "../api"; // spyOn need property
// we want to run a function or some other code repeatedly “before each” test that code can be put in the beforeEach function.
beforeEach(() => {
  jest.spyOn(api, "getUsersApi").mockResolvedValue([]);
});
test("renders User Management text", () => {
  render(<Users />);
  const text = screen.getByText(/User Management/i);
  expect(text).toBeInTheDocument();
});

test("renders list of users text", () => {
  render(<Users />);
  const text = screen.getByText(/List of Users/i);
  expect(text).toBeInTheDocument();
});

test("renders add user text", () => {
  render(<Users />);
  const text = screen.getByText(/Add User/i);
  expect(text).toBeInTheDocument();
});

describe("<Users /> name field testing", () => {
  test("render name input", () => {
    render(<Users />);

    const inputEl = screen.getByTestId("add-user-name");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });

  test("pass valid name to test name input field", () => {
    render(<Users />);

    const inputEl = screen.getByTestId("add-user-name");
    userEvent.type(inputEl, "test");

    expect(screen.getByTestId("add-user-name")).toHaveValue("test");
    //   expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
  });

  //   test("pass invalid name to test input value", () => {
  //     render(<Users />);

  //     const inputEl = screen.getByTestId("add-user-name");
  //     userEvent.type(inputEl, "test");

  //     expect(screen.getByTestId("add-user-name")).toHaveValue("test");
  //     // expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
  //     // expect(screen.queryByTestId("error-msg").textContent).toEqual(
  //     //   "Please enter a valid email."
  //     // );
  //   });
});

describe("<Users /> email field testing", () => {
  test("render email input", () => {
    render(<Users />);

    const inputEl = screen.getByTestId("add-user-email");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "email");
  });

  test("pass valid email to test email input field", () => {
    render(<Users />);

    const inputEl = screen.getByTestId("add-user-email");
    userEvent.type(inputEl, "test@mail.com");

    expect(screen.getByTestId("add-user-email")).toHaveValue("test@mail.com");
    //   expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
  });

  test("pass invalid email to test input value", () => {
    render(<Users />);

    const inputEl = screen.getByTestId("add-user-email");
    userEvent.type(inputEl, "test");

    expect(screen.getByTestId("add-user-email")).toHaveValue("test");
    // expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
    // expect(screen.queryByTestId("error-msg").textContent).toEqual(
    //   "Please enter a valid email."
    // );
  });
});

// Form submission
describe("Test User Input Form submission", () => {
  it("Form can be submited & input field is modifiable", async () => {
    jest.spyOn(api, "addUserApi").mockResolvedValue({ name: "Joe Doe" });

    const { debug, queryByTestId, findByText } = render(<Users />);

    fireEvent.change(queryByTestId("add-user-name"), {
      target: { value: "Joe Doe" },
    }); // invoke handleChange
    fireEvent.submit(queryByTestId("user-form"));

    expect(api.addUserApi).toHaveBeenCalledWith({
      name: "Joe Doe",
      email: "",
      id: "",
    }); // Test if handleSubmit has been called

    expect(await findByText("Joe Doe")).toBeInTheDocument();
  });

  it("Form handle api error", () => {
    jest.spyOn(api, "addUserApi").mockRejectedValue({});

    const { debug, queryByTestId } = render(<Users />);

    fireEvent.submit(queryByTestId("user-form"));
  });
});
