import { useEffect, useState } from "react";
import API from "../api";

function Status() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await API.get("/health");
      setStatus(res.data);
    } catch (err) {
      setStatus({
        app: "DOWN",
        database: "DOWN",
        openai: "DOWN"
      });
    } finally {
      setLoading(false);
    }
  };

  const StatusBadge = ({ value }) => {
    const isUp = value === "UP";

    return (
      <span
        className={`px-4 py-1 rounded-full text-sm font-semibold ${
          isUp
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {value}
      </span>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">

      <div className="bg-white p-10 rounded-2xl shadow-xl">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            System Status
          </h2>

          <button
            onClick={fetchStatus}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex items-center gap-3 text-gray-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
            Checking system health...
          </div>
        ) : (
          <div className="space-y-6">

            <div className="flex justify-between items-center border p-5 rounded-xl">
              <span className="font-medium text-gray-700">Application</span>
              <StatusBadge value={status.app} />
            </div>

            <div className="flex justify-between items-center border p-5 rounded-xl">
              <span className="font-medium text-gray-700">Database</span>
              <StatusBadge value={status.database} />
            </div>

            <div className="flex justify-between items-center border p-5 rounded-xl">
              <span className="font-medium text-gray-700">OpenAI Connection</span>
              <StatusBadge value={status.openai} />
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Status;
