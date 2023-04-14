const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");
const HttpsProxyAgent = require("https-proxy-agent");

const app = express();
app.use(cors());

const appScriptUrl = "https://script.google.com/macros/s/AKfycbxUQIWOfufQ3Kkya7lFW_SjbxERPXE2sXCbJ2HaqZLFaLwd5RWabJHON3SMv-DlLM1oqw/exec";

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

app.get("/demo", async (req, res) => {
  try {
    const response = await fetchWithTimeout(`${appScriptUrl}?path=demo`, { agent });
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error("Error fetching App Script:", error);
    res.status(500).send("Error fetching App Script");
  }
});

app.get("/allDocsId", async (req, res) => {
  try {
    const response = await fetchWithTimeout(`${appScriptUrl}?path=allDocsId`, { agent });
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error("Error fetching App Script:", error);
    res.status(500).send("Error fetching App Script");
  }
});


app.get("/query", async (req, res) => {
  try {
    const response = await fetchWithTimeout(`${appScriptUrl}?path=query`, { agent });
    const data = await response.json();
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
