import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";


function InsightsDisplay({ summaryData }) {

  const data = JSON.parse(summaryData);

  return (
    <div>
      <h3>Summary</h3>
      <p>{data.summary}</p>

      <h3>Key Trends</h3>
      <ul>
        {data.key_trends.map((t, i) => <li key={i}>{t}</li>)}
      </ul>

      <h3>Outliers</h3>
      <ul>
        {data.outliers.map((o, i) => <li key={i}>{o}</li>)}
      </ul>

      <h3>Recommended Checks</h3>
      <ul>
        {data.recommended_checks.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
    </div>
  );
}

export default InsightsDisplay;
