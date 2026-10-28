import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local", quiet: true });
await fs.mkdir("../qa", { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const errors = [];
const desktop = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await desktop.newPage();
page.on("pageerror", (e) => errors.push(e.message));
for (const route of ["/", "/plumbing", "/hvac"]) {
  const response = await page.goto(`http://localhost:3019${route}`, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1200);
  const name = route === "/" ? "home" : route.slice(1);
  await page.screenshot({ path: `../qa/${name}-desktop.png`, fullPage: true });
  console.log(
    route,
    response.status(),
    await page.locator("h1").innerText(),
    "overflow:",
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  );
}
await page.goto("http://localhost:3019/");
await page.getByRole("button", { name: "Pause animations" }).click();
console.log(
  "Motion pause:",
  await page.locator("html").getAttribute("data-motion"),
);
await page.locator("summary").first().click();
console.log(
  "FAQ opens:",
  (await page.locator("details").first().getAttribute("open")) !== null,
);
await page.goto("http://localhost:3019/schedule", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
console.log(
  "Booking fallback:",
  await page
    .getByRole("link", { name: "Book on our current website" })
    .getAttribute("href"),
);
await page.goto("http://localhost:3019/admin", { waitUntil: "networkidle" });
await page.getByLabel("Email").fill(process.env.BOOTSTRAP_EMAIL);
await page
  .getByLabel("Password", { exact: true })
  .fill(process.env.BOOTSTRAP_PASSWORD);
await page.getByRole("button", { name: "Login", exact: true }).click();
await page.waitForURL("**/admin");
await page.waitForTimeout(1000);
console.log(
  "Studio login:",
  await page
    .locator("body")
    .innerText()
    .then((s) => s.includes("Website & homepage")),
);
await page.screenshot({ path: "../qa/studio.png", fullPage: true });
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const mp = await mobile.newPage();
mp.on("pageerror", (e) => errors.push(e.message));
for (const route of ["/", "/plumbing", "/hvac"]) {
  await mp.goto(`http://localhost:3019${route}`, { waitUntil: "networkidle" });
  await mp.waitForTimeout(1000);
  await mp.screenshot({
    path: `../qa/${route === "/" ? "home" : route.slice(1)}-mobile.png`,
    fullPage: true,
  });
  console.log(
    "Mobile",
    route,
    "overflow:",
    await mp.evaluate(() => document.documentElement.scrollWidth > innerWidth),
  );
}
await mp.getByRole("button", { name: "Open menu" }).click();
console.log(
  "Mobile menu:",
  await mp.getByRole("navigation", { name: "Main navigation" }).isVisible(),
);
await mp
  .getByRole("navigation", { name: "Main navigation" })
  .getByRole("link", { name: "Plumbing", exact: true })
  .click();
await mp.waitForURL("**/plumbing");
console.log("Menu navigation:", new URL(mp.url()).pathname);
const reduced = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
const rp = await reduced.newPage();
await rp.goto("http://localhost:3019/");
console.log(
  "Reduced motion:",
  await rp
    .locator(".hero-van")
    .evaluate((el) => getComputedStyle(el).animationName),
);
console.log("Browser errors:", JSON.stringify(errors));
await browser.close();
