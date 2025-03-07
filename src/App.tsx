import { useState, useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ColorModeContext } from "./ColorModeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./components/SideMenu";
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Categories/Profile";
import Dashboad from "pages/Dashboad/Dashboad";
import Report from "pages/Categories/Report";
import { AppProvider } from "AppContext";
function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "rgba(156, 231, 232, 0.37)",
                  paper: "rgb(241, 234, 234)",
                },
              }
            : {
                background: {
                  default: "#111010",
                  paper: "#1e1e1e",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppProvider> {/* 🎯 This will fix the whole Context Error */}
      <Router>
        <Routes>
          <Route path="/dashboad" element={<Dashboad />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/categories" element={<Profile />} />
          <Route path="/transactions" element={<Profile />} />
          <Route path="/budget" element={<Dashboad />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
    </AppProvider>
  </ThemeProvider>
</ColorModeContext.Provider>

  );
}

export default App;
