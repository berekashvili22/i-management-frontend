import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddInventory from "./pages/AddInventory";

function App() {
  return (
    <div className="container my-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddInventory />} />
      </Routes>
    </div>
  );
}

export default App;
