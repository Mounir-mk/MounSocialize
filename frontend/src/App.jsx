import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App w-screen relative">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
