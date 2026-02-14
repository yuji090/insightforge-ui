import { useState } from "react";
import API from "../api";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [rawCsv, setRawCsv] = useState("");
  const [preview, setPreview] = useState([]);
  const [summary, setSummary] = useState(null);

  const [question, setQuestion] = useState("");
  const [followAnswer, setFollowAnswer] = useState("");

  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [thinking, setThinking] = useState(false);

  const [error, setError] = useState("");

  // ================= Upload =================
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSummary(null);
      setFollowAnswer("");

      const formData = new FormData();
      formData.append("file", file);

      const res = await API.post("/reports/upload", formData);

      setFileName(res.data.fileName);
      setRawCsv(res.data.rawCsv);
      setPreview(JSON.parse(res.data.previewData));

    } catch {
      setError("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  // ================= Generate Insights =================
  const handleAnalyze = async () => {
    try {
      setGenerating(true);
      setError("");
      setSummary(null);
      setFollowAnswer("");

      const res = await API.post("/reports/analyze", { rawCsv });

      setSummary(JSON.parse(res.data.summary));
      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch {
      setError("Failed to generate insights.");
    } finally {
      setGenerating(false);
    }
  };

  // ================= Follow Up =================
  const handleFollowUp = async () => {
    if (!question.trim()) return;

    try {
      setThinking(true);

      const res = await API.post("/reports/followup", {
        rawCsv,
        summary: JSON.stringify(summary),
        question
      });

      setFollowAnswer(res.data.answer);

    } catch {
      setError("Failed to process follow-up.");
    } finally {
      setThinking(false);
    }
  };

  // ================= Save =================
  const handleSave = async () => {
    try {
      setLoading(true);

      await API.post("/reports/save", {
        fileName,
        rawCsv,
        summary: JSON.stringify(summary)
      });

      alert("Report Saved Successfully!");

    } catch {
      setError("Failed to save report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">

      {/* CONTROL BAR */}
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-wrap gap-4 items-center sticky top-0 z-10">

        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-3 rounded-lg flex-1 min-w-[250px]"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {preview.length > 0 && (
          <button
            onClick={handleAnalyze}
            disabled={generating}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate Insights"}
          </button>
        )}

        {summary && (
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Save Report
          </button>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* ================= INSIGHTS ================= */}
      {(summary || generating) && (
        <div className="bg-green-50 border border-green-200 p-8 rounded-2xl shadow-lg">

          <h3 className="text-2xl font-bold mb-6 text-green-900">
            Insights
          </h3>

          {generating && (
            <div className="flex items-center gap-3 text-green-700 font-semibold">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-700"></div>
              Generating insights...
            </div>
          )}

          {summary && (
            <>
              <p className="mb-6">{summary.summary}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Key Trends</h4>
                  <ul className="list-disc ml-6">
                    {summary.key_trends.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">Outliers</h4>
                  <ul className="list-disc ml-6">
                    {summary.outliers.map((o, i) => (
                      <li key={i}>{o}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">Recommended Checks</h4>
                  <ul className="list-disc ml-6">
                    {summary.recommended_checks.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ================= FOLLOW UP SECTION ================= */}
              <div className="mt-10 bg-white p-6 rounded-xl shadow">

                <h4 className="text-lg font-semibold mb-3">
                  Ask Follow-up Question
                </h4>

                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Describe 4th entry"
                  className="border p-3 rounded w-full mb-4"
                />

                <button
                  onClick={handleFollowUp}
                  disabled={thinking}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  {thinking ? "Thinking..." : "Ask AI"}
                </button>

                {followAnswer && (
                  <div className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-line">
                    {followAnswer}
                  </div>
                )}

              </div>

            </>
          )}
        </div>
      )}

      {/* ================= PREVIEW TABLE ================= */}
      {preview.length > 0 && (
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Preview (First 50 Rows)
          </h3>

          <div className="overflow-x-auto border rounded-lg max-h-[500px] overflow-y-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  {Object.keys(preview[0]).map((key) => (
                    <th key={key} className="px-4 py-2 text-left">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="px-4 py-2">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

export default UploadForm;
