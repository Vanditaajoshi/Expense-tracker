import "./Login.css"; // Ensure you import the correct CSS file
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevents form submission
    navigate("/dashboard"); // Navigates to dashboard
  };

  return (
    <div className="login-container">
      <h2>Expense Tracker Login</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
        <button onClick={handleLogin}></button>
      </form>
    </div>
  );
};

export default Login;
