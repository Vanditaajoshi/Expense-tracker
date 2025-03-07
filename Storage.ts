export const saveUser = (user: { email: string, password: string }) => {
const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
storedUsers.push(user);
localStorage.setItem("users", JSON.stringify(storedUsers));
};
export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};
export const getUserByEmail = (email: string) => {
  const users = getUsers();
  return users.find((user: { email: string }) => user.email === email);
};
