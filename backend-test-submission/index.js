const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} | Body:`, req.body);
  next();
});

app.post("/shorturls", (req, res) => {
  const { url, validity, shortcode } = req.body;
  const code = shortcode || Math.random().toString(36).substr(2, 6);
  const expiry = new Date(Date.now() + (validity || 30) * 60000).toISOString();

  return res.status(201).json({
    shortLink: `http://localhost:5000/${code}`,
    expiry
  });
});


app.get("/shorturls/:code", (req, res) => {
  const { code } = req.params;
  return res.json({
    url: "https://example.com/original",
    clicks: 5,
    createdAt: "2025-07-15T12:00:00Z",
    expiry: "2025-07-15T12:30:00Z",
    logs: [
      {
        timestamp: "2025-07-15T12:10:00Z",
        referrer: "https://facebook.com",
        location: "India"
      }
    ]
  });
});

// ✅ Run Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Mock Backend running at http://localhost:${PORT}`);
});
