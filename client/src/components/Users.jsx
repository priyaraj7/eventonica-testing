import { useState, useEffect } from "react";
import { addUserApi, getUsersApi, deleteUserApi } from "../api";

const Users = ({ handleSubmit }) => {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  console.log("users", users);

  // client/src/components/Users.js
  const getUsers = async () => {
    setUsers(await getUsersApi());
  };

  useEffect(() => {
    getUsers();
  }, []);

  //////////////////////
  // ADD USER
  const handleAddOnSubmit = async (e) => {
    e.preventDefault();
    const newUser = { id, name, email };
    //console.log(newUser)

    const response = await addUserApi(newUser);
    console.log(response);
    setUsers([...users, response]);
    setName("");
    setEmail("");
    setId("");
  };

  // Delete user
  const handleDeleteUser = async (deleteUser) => {
    // Simple DELETE HTTP request with async await

    deleteUserApi(deleteUser);
    // delete functionality
    const deleteUsers = users.filter((user) => user.id !== deleteUser);
    console.log(deleteUsers);
    setUsers(deleteUsers);
  };

  //////////////// User List
  const renderHeader = () => {
    let headerElement = ["Id", "Name", "Email"];

    return headerElement.map((ele, index) => {
      return <th key={index}>{ele}</th>;
    });
  };

  const renderBody = () => {
    return users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>

          <td className="deleteUserButton">
            <button
              data-testid={`delete-user-id-${user.id}`}
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };
  ////////////////////////////////////////////////////////////

  return (
    <section className="user-management">
      <h2>User Management</h2>
      <h3>List of Users</h3>
      <table className="listUser">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>

      <div>
        <h3>Add User</h3>
        <form
          id="add-user"
          data-testid="user-form"
          action="#"
          onSubmit={handleAddOnSubmit}
        >
          <fieldset>
            <label>Name</label>
            <input
              type="text"
              id="add-user-name"
              data-testid="add-user-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              id="add-user-email"
              data-testid="add-user-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </fieldset>

          <input type="submit" value="Add" />
        </form>
      </div>
    </section>
  );
};

export default Users;
