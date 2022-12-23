import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App h-screen w-screen relative">
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
