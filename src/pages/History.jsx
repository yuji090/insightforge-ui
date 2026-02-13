import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function History() {

  const [reports, setReports] = useState([]);

  useEffect(() => {
    API.get("/reports").then(res => setReports(res.data));
  }, []);

  const handleDownload = (id) => {
    window.open(`http://localhost:8080/api/reports/${id}/download`);
  };

  return (
    <div className="max-w-4xl mx-auto">

      <h2 className="text-3xl font-bold mb-8">Last 5 Saved Reports</h2>

      <div className="space-y-4">

        {reports.map(r => (
          <div
            key={r.id}
            className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <Link
                to={`/report/${r.id}`}
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {r.fileName}
              </Link>
              <p className="text-gray-500 text-sm">
                {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => handleDownload(r.id)}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700"
            >
              Download CSV
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default History;
