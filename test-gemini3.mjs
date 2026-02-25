import { setGlobalDispatcher, EnvHttpProxyAgent } from "undici";
setGlobalDispatcher(new EnvHttpProxyAgent());
process.env.HTTP_PROXY = "http://127.0.0.1:65533";
process.env.HTTPS_PROXY = "http://127.0.0.1:65533";

const apiKey = "AIzaSyDxrk27BmXBovzk_UP8kbsmK7V-iUamTOY";
const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-preview:generateContent?key=" +
  apiKey;
const body = JSON.stringify({
  contents: [{ parts: [{ text: "Hello, testing!" }] }],
});

fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body,
})
  .then((r) => r.json())
  .then((d) => console.log(JSON.stringify(d, null, 2)))
  .catch(console.error);
