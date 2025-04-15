import React, { useState, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 import { saveUser } from "../utils/Storage"; // Assuming this utility function saves user data
 import "./LR.css";
 
 const Register: React.FC = () => {
   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [confirmPassword, setConfirmPassword] = useState<string>("");
   const [error, setError] = useState<string>("");
   const [success, setSuccess] = useState<string>("");
   const navigate = useNavigate();
 
   // Add the register-page class to body when the component mounts, and clean it up on unmount
   useEffect(() => {
     document.body.classList.add("register-page");
     return () => {
       document.body.classList.remove("register-page");
     };
   }, []);
 
   const handleRegister = (e: React.FormEvent) => {
     e.preventDefault();
     setError(""); // Reset previous error
     setSuccess(""); // Reset previous success message
 
     // Password mismatch check
     if (password !== confirmPassword) {
       setError("Passwords do not match.");
       return;
     }
 
     // Check if a user with the same email already exists
     const storedUser = localStorage.getItem("user");
     if (storedUser) {
       const user = JSON.parse(storedUser);
       if (user.email === email) {
         setError("A user with this email already exists.");
         return;
       }
     }
 
     // Save the user
     saveUser({ email, password });
     setSuccess("Registration successful! Redirecting to login...");
 
     // Reset form after successful registration
     setEmail("");
     setPassword("");
     setConfirmPassword("");
 
     setTimeout(() => {
       navigate("/login");
     }, 2000);
   };
 
   return (
     <div className="register-container">
       <div className="register-box">
         <h2 className="register-title">Register</h2>
         <form onSubmit={handleRegister}>
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
 
           <div className="input-group">
             <label htmlFor="confirmPassword" className="input-label">Confirm Password:</label>
             <input
               type="password"
               id="confirmPassword"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               className="input-field"
               required
             />
           </div>
 
           {error && <p className="error-message">{error}</p>}
           {success && <p className="success-message">{success}</p>}
 
           <button type="submit" className="register-button">Register</button>
         </form>
 
         <p className="login-link">
           Already have an account? <a href="/login" className="login-link-text">Login</a>
         </p>
       </div>
     </div>
   );
 };
 
 export default Register;