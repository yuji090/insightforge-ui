import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function History() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await API.get("/reports");
        setReports(res.data);
      } catch {
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // ✅ Force Indian Time (IST)
  const formatIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
  };

  // ✅ Download handler (uses backend base URL automatically)
  const handleDownload = (id) => {
    window.open(`${API.defaults.baseURL}/reports/${id}/download`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      <h2 className="text-3xl font-bold">Last 5 Saved Reports</h2>

      {loading && (
        <div className="flex items-center gap-3 text-gray-600 font-semibold">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
          Loading reports...
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && reports.length === 0 && (
        <p className="text-gray-500">No reports found.</p>
      )}

      <div className="space-y-4">

        {reports.map((r) => (
          <div
            key={r.id}
            className="bg-white p-6 rounded-xl shadow flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <Link
                to={`/report/${r.id}`}
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {r.fileName}
              </Link>

              <p className="text-gray-500 text-sm">
                {formatIST(r.createdAt)}
              </p>
            </div>

            <button
              onClick={() => handleDownload(r.id)}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
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
