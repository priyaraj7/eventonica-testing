export const addUserApi = async (newUser) => {
  const rawResponse = await fetch("http://localhost:4000/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  return await rawResponse.json();
};

export const getUsersApi = async () => {
  const response = await fetch("http://localhost:4000/users");
  const user = await response.json();
  return user;
};

export const deleteUserApi = async (deleteUser) => {
  let response = await fetch(`http://localhost:4000/users/${deleteUser}`, {
    method: "DELETE",
  });
  await response.json();
};
