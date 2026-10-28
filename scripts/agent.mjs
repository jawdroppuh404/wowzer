/** Minimal authenticated content harness. No secrets are stored in this script. */
import fs from "node:fs/promises";
const [command, ...args] = process.argv.slice(2);
const base = process.env.WOWZER_URL;
const key = process.env.WOWZER_API_KEY;
if (!base || !key)
  throw new Error("Set WOWZER_URL and WOWZER_API_KEY in your environment.");
const headers = {
  Authorization: `users API-Key ${key}`,
  "Content-Type": "application/json",
};
let path,
  method = "GET",
  body;
switch (command) {
  case "list":
    path = "/api/pages?limit=20&depth=0";
    break;
  case "site":
    path = "/api/globals/site?depth=0";
    break;
  case "get":
    if (!args[0]) throw new Error("Provide a page ID");
    path = `/api/pages/${encodeURIComponent(args[0])}?depth=0`;
    break;
  case "draft":
    if (!args[0] || !args[1])
      throw new Error("Usage: node scripts/agent.mjs draft ID content.json");
    path = `/api/pages/${encodeURIComponent(args[0])}?draft=true`;
    method = "PATCH";
    body = JSON.stringify({
      ...JSON.parse(await fs.readFile(args[1], "utf8")),
      _status: "draft",
    });
    break;
  case "publish":
    if (!args[0]) throw new Error("Provide a page ID");
    path = `/api/pages/${encodeURIComponent(args[0])}`;
    method = "PATCH";
    body = JSON.stringify({ _status: "published" });
    break;
  default:
    throw new Error("Commands: list, site, get ID, draft ID FILE, publish ID");
}
const response = await fetch(new URL(path, base), { method, headers, body });
if (!response.ok)
  throw new Error(
    `Request failed: ${response.status} ${await response.text()}`,
  );
console.log(JSON.stringify(await response.json(), null, 2));
