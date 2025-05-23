const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // ✅ این خط حیاتی است
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  try {
    const { prompt, aspect_ratio } = req.body;

    const response = await axios.post("https://rasatest.app.n8n.cloud/webhook/generate-image", {
      prompt,
      aspect_ratio
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to forward request" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
