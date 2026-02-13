import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">InsightForge</h1>

        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/history" className="hover:text-gray-300">History</Link>
          <Link to="/status" className="hover:text-gray-300">Status</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
