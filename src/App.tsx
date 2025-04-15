import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppProvider } from "AppContext";
import NavBar from "pages/Expense/NavBar";
import Report from "pages/Expense/Report";
import Categories from "pages/Categories/Categories";
import Setting from "pages/Expense/Setting";
import Expense from "pages/Expense/Expense";
import Register from "components/Register";
import Dashboard from "pages/Expense/Dashboard";
import Pages from "pages/Expense/Pages";
import Login from "components/login";

const App: React.FC = () => {
  const [categories, setCategories] = useState<{ name: string; type: "Income" | "Expense" }[]>([]);

  // Load categories from localStorage
  useEffect(() => {
    try {
      const storedCategories = localStorage.getItem("categories");
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      }
    } catch (error) {
      console.error("Error parsing categories:", error);
      setCategories([]);
    }
  }, []);

  return (
    <Router>
      <AppProvider>
        <Routes>
          {/* No Navbar on Login & Register */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Navbar included on all other pages */}
          <Route
            path="/*"
            element={
              <>
                <NavBar />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/pages" element={<Pages />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/setting" element={<Setting />} />
                  <Route path="/expense" element={<Expense categories={categories} />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </AppProvider>
    </Router>
  );
};

export default App;
