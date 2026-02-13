import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function ReportView() {

  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    API.get(`/reports/${id}`).then(res => {
      setReport(res.data);
    });
  }, [id]);

  if (!report) return <p>Loading...</p>;

  const data = JSON.parse(report.summaryData);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-6">{report.fileName}</h2>

      <p className="mb-4">{data.summary}</p>

      <h4 className="font-semibold">Key Trends</h4>
      <ul className="list-disc ml-6 mb-4">
        {data.key_trends.map((t, i) => <li key={i}>{t}</li>)}
      </ul>

      <h4 className="font-semibold">Outliers</h4>
      <ul className="list-disc ml-6 mb-4">
        {data.outliers.map((o, i) => <li key={i}>{o}</li>)}
      </ul>

      <h4 className="font-semibold">Recommended Checks</h4>
      <ul className="list-disc ml-6">
        {data.recommended_checks.map((r, i) => <li key={i}>{r}</li>)}
      </ul>

    </div>
  );
}

export default ReportView;
