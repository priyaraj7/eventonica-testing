import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
//User-event dispatches the events like they would happen if a user interacted with the document.

import Users from "./Users";
import * as api from "../../api";

let getAllUserSpy;
// we want to run a function or some other code repeatedly “before each” test that code can be put in the beforeEach function.
beforeEach(() => {
  // spyOn need property
  getAllUserSpy = jest.spyOn(api, "getUsersApi").mockResolvedValue([]);
});

describe("render", () => {
  it("loads all the users", async () => {
    getAllUserSpy.mockResolvedValue([
      {
        name: "Jane Doe",
        email: "Jane@gmail.com",
        id: 42,
      },
    ]);

    render(<Users />);
    expect(getAllUserSpy).toHaveBeenCalled();
    await waitFor(() => screen.findByText("Jane Doe"));
    await expect(await screen.findByText("Jane@gmail.com")).toBeInTheDocument();
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
    users = [{ name: "Ram", email: "ram@ram.com", id: 22 }];
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
