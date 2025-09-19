import { useState } from "react";
import "./App.css";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductDetail } from "./pages/ProductDetail";
import { Footer } from "./components/Footer";
import {Myadds} from './pages/Myadds'
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/Myadds" element={<Myadds/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
