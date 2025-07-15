/*import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { getStats } from "../srvices/api";
import { logEvent } from "../logger";


const StatsPage = () => {
  const [shortcode, setShortcode] = useState("");
  const [stats, setStats] = useState<any>(null);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZGl0aWplZW5hMjIxMUBnbWFpbC5jb20iLCJleHAiOjE3NTI1NTc4MjYsImlhdCI6MTc1MjU1NjkyNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijc2MmQ3NWE5LThkZjItNDAyNC1iNTQ5LWYwMDk3MDQ1NjU2YiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFkaXRpIGplZW5hIiwic3ViIjoiMzY0YzMzNzYtNjE5ZS00OGQwLWE5YzAtMDIxNTRkNjQwMjUyIn0sImVtYWlsIjoiYWRpdGlqZWVuYTIyMTFAZ21haWwuY29tIiwibmFtZSI6ImFkaXRpIGplZW5hIiwicm9sbE5vIjoiMjIxODE5MSIsImFjY2Vzc0NvZGUiOiJRQWhEVXIiLCJjbGllbnRJRCI6IjM2NGMzMzc2LTYxOWUtNDhkMC1hOWMwLTAyMTU0ZDY0MDI1MiIsImNsaWVudFNlY3JldCI6Ik1FeGdKa0JOanhWc3NtWGEifQ.ZLeYkdhSsDNQ1G_4stx7PatIwYT8vPvo7AS-LSld_Hc"; // Replace with actual

  const handleFetch = async () => {
    try {
      const res = await getStats(shortcode);
      setStats(res);
      logEvent("frontend", "info", "component", "Fetched stats for shortcode", token);
    } catch (err) {
      logEvent("frontend", "error", "component", "Stats fetch failed", token);
      alert("Could not fetch stats");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <TextField fullWidth label="Enter Shortcode" value={shortcode} onChange={(e) => setShortcode(e.target.value)} sx={{ mb: 2 }} />
      <Button variant="contained" onClick={handleFetch}>Get Stats</Button>
      {stats && (
        <pre style={{ marginTop: "20px" }}>{JSON.stringify(stats, null, 2)}</pre>
      )}
    </Box>
  );
};

export default StatsPage;*/

import { useState } from "react";
import { getStats } from "../srvices/api";
import { logEvent } from "../logger";

const StatsPage = () => {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState<any>(null);

  const handleCheck = async () => {
    try {
      const data = await getStats(code);
      setStats(data);
      await logEvent("frontend", "info", "component", "Stats checked");
    } catch (err) {
      alert("Error fetching stats");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h2>Check Stats</h2>
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Shortcode" style={{ width: "100%", marginBottom: 8 }} />
      <button onClick={handleCheck}>Check Stats</button>
      {stats && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Original URL:</strong> {stats.url}</p>
          <p><strong>Clicks:</strong> {stats.clicks}</p>
          <p><strong>Created At:</strong> {stats.createdAt}</p>
          <p><strong>Expires At:</strong> {stats.expiry}</p>
          <ul>
            {stats.logs?.map((log: any, index: number) => (
              <li key={index}>
                {log.timestamp} - {log.referrer} - {log.location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StatsPage;

