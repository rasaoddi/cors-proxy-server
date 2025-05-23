const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 فعال کردن CORS به صورت کامل و دستی
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // یا فقط 'https://mz08c8.webwave.dev'
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  try {
    const { prompt, aspect_ratio } = req.body;

    const response = await axios.post(
      "https://rasatest.app.n8n.cloud/webhook/generate-image",
      { prompt, aspect_ratio },
      { headers: { "Content-Type": "application/json" } }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Error in workflow" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
