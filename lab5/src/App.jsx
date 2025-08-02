import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Workouts from "./components/Workouts";
import ContactForm from "./components/ContactForm";
import "./App.css";
function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-900 text-white">
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/workouts" className="hover:underline">Workouts</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
