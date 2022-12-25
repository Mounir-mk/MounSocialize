import "./App.css";
import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./services/AuthContext";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";

function App() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      if (
        window.location.pathname !== "/register" &&
        window.location.pathname !== "/login"
      ) {
        navigate("/login");
      }
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <div className="App w-screen relative">
      {auth.isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        {auth.isAuthenticated && (
          <Route path="/homepage" element={<HomePage />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
