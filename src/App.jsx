import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Status from "./pages/Status";
import ReportView from "./pages/ReportView";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/status" element={<Status />} />
          <Route path="/report/:id" element={<ReportView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
