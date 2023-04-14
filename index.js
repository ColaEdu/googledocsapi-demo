const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");
const HttpsProxyAgent = require("https-proxy-agent");

const app = express();
app.use(cors());

const appScriptUrl = "https://script.google.com/macros/s/AKfycbzAtwAGH_gPeZwve0La1Mi25LFfMkcInJKrstFmbTS-UN_5i1F_LGp4NJV-eBeFaaNn4g/exec";

const proxyUrl = "http://127.0.0.1:7890"; // 替换为本地代理地址
const agent = new HttpsProxyAgent(proxyUrl);

function fetchWithTimeout(url, options, timeout = 10000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
}

app.get("/app-script", async (req, res) => {
  try {
    const response = await fetchWithTimeout(appScriptUrl, { agent });
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error("Error fetching App Script:", error);
    res.status(500).send("Error fetching App Script");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
