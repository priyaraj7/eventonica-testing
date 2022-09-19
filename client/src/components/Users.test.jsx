import { render, screen, fireEvent, waitFor } from "@testing-library/react";
//User-event dispatches the events like they would happen if a user interacted with the document.
import userEvent from "@testing-library/user-event";
import Users from "./Users";
import * as api from "../api"; // spyOn need property
import { act } from "react-dom/test-utils";
let getAllUserSpy;
// we want to run a function or some other code repeatedly “before each” test that code can be put in the beforeEach function.
beforeEach(() => {
  getAllUserSpy = jest.spyOn(api, "getUsersApi").mockResolvedValue([]);
});

// afterEach(() => {
//   jest.restoreAllMocks();
// });

describe("<Users /> renders text", () => {
  test("renders User Management text", () => {
    render(<Users />);
    const text = screen.getByText(/User Management/i);
    expect(text).toBeInTheDocument();
    expect(getAllUserSpy).toHaveBeenCalled();
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
  test("renders user form with elements correctly", () => {
    render(<Users />);
    expect(screen.getByTestId("user-form")).toBeInTheDocument();
    let buttonElement = screen.getByRole("button", {
      name: /add/i,
    });

    expect(buttonElement).toBeInTheDocument();
  });
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
  it("should submit the form  & input field is modifiable", async () => {
    jest.spyOn(api, "addUserApi").mockResolvedValue({ name: "Joe Doe" });

    render(<Users />);

    fireEvent.change(screen.queryByTestId("add-user-name"), {
      target: { value: "Joe Doe" },
    }); // invoke handleChange
    fireEvent.submit(screen.queryByTestId("user-form"));

    expect(api.addUserApi).toHaveBeenCalledWith({
      name: "Joe Doe",
      email: "",
      id: "",
    }); // Test if handleSubmit has been called

    expect(await screen.findByText("Joe Doe")).toBeInTheDocument();
  });

  // it("Form handle api error", () => {
  //   jest.spyOn(api, "addUserApi").mockRejectedValue({});

  //   render(<Users />);

  //   fireEvent.submit(screen.queryByTestId("user-form"));
  // });
});

describe("delete", () => {
  let users;
  beforeEach(() => {
    users = [{ name: "Subba", email: "subba@subbi.com", id: 22 }];
    getAllUserSpy.mockResolvedValue(users);
  });
  it("delete users", async () => {
    const deleteSpy = jest.spyOn(api, "deleteUserApi");
    render(<Users />);
    await waitFor(() => {
      screen.getByTestId(`delete-user-id-${users[0].id}`);
    });

    const deleteButton = screen.getByTestId(`delete-user-id-${users[0].id}`);
    act(() => {
      deleteButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(deleteSpy).toHaveBeenCalledWith(users[0].id);
  });
});

// https://handsonreact.com/docs/labs/js/T6-TestingForms

// https://community.redwoodjs.com/t/testing-forms-using-testing-library-user-event/2058/8
