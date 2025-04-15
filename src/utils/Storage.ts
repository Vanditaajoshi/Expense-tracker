// Function to save user data in localStorage
export const saveUser = (user: { email: string; password: string; profilePicUrl?: string }) => {
  try {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if the user already exists
    const existingUserIndex = storedUsers.findIndex((storedUser: { email: string }) => storedUser.email === user.email);
    if (existingUserIndex !== -1) {
      // Update existing user
      storedUsers[existingUserIndex] = user;
    } else {
      // Add new user
      storedUsers.push(user);
    }

    // Save the updated user list back to localStorage
    localStorage.setItem("users", JSON.stringify(storedUsers));
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
};

// Function to get all users from localStorage
export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("users") || "[]");
  } catch (error) {
    console.error("Error retrieving users from localStorage:", error);
    return [];
  }
};

// Function to get a user by email from localStorage
export const getUserByEmail = (email: string) => {
  const users = getUsers();
  return users.find((user: { email: string }) => user.email === email);
};