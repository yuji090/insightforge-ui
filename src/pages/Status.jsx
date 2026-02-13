import { useEffect, useState } from "react";
import API from "../api";

function Status() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    API.get("/health").then(res => setStatus(res.data));
  }, []);

  if (!status) return <p>Checking...</p>;

  return (
    <div>
      <h2>System Status</h2>
      <p>App: {status.app}</p>
      <p>Database: {status.database}</p>
      <p>OpenAI: {status.openai}</p>
    </div>
  );
}

export default Status;
