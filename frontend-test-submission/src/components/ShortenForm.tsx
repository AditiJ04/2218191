/*import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { shortenUrl } from "../srvices/api";
import { logEvent } from "../logger";


const ShortenForm = () => {
  const [url, setUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [validity, setValidity] = useState("");
  const [shortLink, setShortLink] = useState("");

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZGl0aWplZW5hMjIxMUBnbWFpbC5jb20iLCJleHAiOjE3NTI1NTc4MjYsImlhdCI6MTc1MjU1NjkyNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijc2MmQ3NWE5LThkZjItNDAyNC1iNTQ5LWYwMDk3MDQ1NjU2YiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFkaXRpIGplZW5hIiwic3ViIjoiMzY0YzMzNzYtNjE5ZS00OGQwLWE5YzAtMDIxNTRkNjQwMjUyIn0sImVtYWlsIjoiYWRpdGlqZWVuYTIyMTFAZ21haWwuY29tIiwibmFtZSI6ImFkaXRpIGplZW5hIiwicm9sbE5vIjoiMjIxODE5MSIsImFjY2Vzc0NvZGUiOiJRQWhEVXIiLCJjbGllbnRJRCI6IjM2NGMzMzc2LTYxOWUtNDhkMC1hOWMwLTAyMTU0ZDY0MDI1MiIsImNsaWVudFNlY3JldCI6Ik1FeGdKa0JOanhWc3NtWGEifQ.ZLeYkdhSsDNQ1G_4stx7PatIwYT8vPvo7AS-LSld_Hc"; // Replace with saved auth token

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createShortUrl({ url, shortcode, validity });
      setShortLink(res.shortLink);
      logEvent("frontend", "info", "component", "Short URL created successfully", token);
    } catch (err: any) {
      logEvent("frontend", "error", "component", "Short URL creation failed", token);
      alert("Error: " + err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <TextField fullWidth label="Long URL" value={url} onChange={(e) => setUrl(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Custom Shortcode (optional)" value={shortcode} onChange={(e) => setShortcode(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Validity in minutes (optional)" value={validity} onChange={(e) => setValidity(e.target.value)} sx={{ mb: 2 }} />
      <Button type="submit" variant="contained" color="primary">Shorten URL</Button>
      {shortLink && (
        <Box sx={{ mt: 2 }}>Short URL: <a href={shortLink} target="_blank" rel="noreferrer">{shortLink}</a></Box>
      )}
    </Box>
  );
};

export default ShortenForm;
*/

import { useState } from "react";
import { shortenUrl } from "../srvices/api";
import { logEvent } from "../logger";

const ShortenForm = () => {
  const [url, setUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [validity, setValidity] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<{ shortLink: string; expiry: string } | null>(null);

  const handleSubmit = async () => {
    if (!url) return alert("URL is required");

    try {
      const data = await shortenUrl({ url, shortcode, validity });
      setResult(data);
      await logEvent("frontend", "info", "component", "Shorten form submitted");
    } catch (err) {
      alert("Error creating short URL");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h2>Shorten a URL</h2>
      <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Long URL" style={{ width: "100%", marginBottom: 8 }} />
      <input value={shortcode} onChange={(e) => setShortcode(e.target.value)} placeholder="Custom Shortcode (optional)" style={{ width: "100%", marginBottom: 8 }} />
      <input value={validity ?? ""} onChange={(e) => setValidity(parseInt(e.target.value))} placeholder="Validity in minutes" type="number" style={{ width: "100%", marginBottom: 8 }} />
      <button onClick={handleSubmit}>Shorten URL</button>
      {result && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Short URL:</strong> <a href={result.shortLink} target="_blank" rel="noreferrer">{result.shortLink}</a></p>
          <p><strong>Expires at:</strong> {result.expiry}</p>
        </div>
      )}
    </div>
  );
};

export default ShortenForm;
