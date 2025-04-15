import React, { useState, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 import { getUsers } from "../utils/Storage"; // Assuming your getUsers function is properly defined for fetching users
 import "./LR.css"; // Your CSS file for styling
 
 const Login: React.FC = () => {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [error, setError] = useState<string>("");
   const navigate = useNavigate();
 
   // Add the login-page class to body when the component mounts, and clean it up on unmount
   useEffect(() => {
     document.body.classList.add("login-page");
     return () => {
       document.body.classList.remove("login-page");
     };
   }, []);
 
   const handleLogin = (e: React.FormEvent) => {
     e.preventDefault();
 
     // Get all users from localStorage (or other storage mechanism)
     const users = getUsers();
 
     // Find the user with the matching email and password
     const user = users.find(
       (user: { email: string; password: string }) => user.email === email && user.password === password
     );
 
     if (!user) {
       setError("Invalid email or password.");
       return;
     }
 
     // Navigate to the dashboard if the login is successful
     navigate("/dashboard");
   };
 
   return (
     <div className="login-container">
       <div className="login-box">
         <h2 className="login-title">Login</h2>
         <form onSubmit={handleLogin}>
           <div className="input-group">
             <label htmlFor="email" className="input-label">Email:</label>
             <input
               type="email"
               id="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="input-field"
               required
             />
           </div>
 
           <div className="input-group">
             <label htmlFor="password" className="input-label">Password:</label>
             <input
               type="password"
               id="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="input-field"
               required
             />
           </div>
 
           {error && <p className="error-message">{error}</p>}
 
           <button type="submit" className="login-button">Login</button>
         </form>
 
         <p className="register-link">
           Don't have an account? <a href="/register" className="register-link-text">Register</a>
         </p>
       </div>
     </div>
   );
 };
 
 export default Login;