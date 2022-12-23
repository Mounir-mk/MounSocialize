import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import DisplayImageBlob from "./pages/DisplayImageBlob";

function App() {
  return (
    <div className="App h-screen w-screen relative">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/image" element={<DisplayImageBlob />} />
      </Routes>
    </div>
  );
}

export default App;
