import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders project information before each homepage cover", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  const body = html.slice(html.indexOf("<body"));

  assert.match(body, /<div class="project-info">[\s\S]*?<a href="\/work\/liangbulu" class="project-media"/);
  assert.match(body, /\/covers\/personal-practice\.webp/);
  assert.match(body, /图标练习 · AIGC/);
  assert.doesNotMatch(body, /VIEW PROJECT|从策略到落地的完整案例|界面概念|2025—2026|2024—2026/);
});

test("keeps the product case pages in their requested order", async () => {
  const response = await render("/work/liangbulu");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.indexOf("/portfolio/1.webp") >= 0);
  assert.ok(html.indexOf("/portfolio/16.webp") > html.indexOf("/portfolio/1.webp"));
});

test("keeps pages 33 through 45 inside operation design", async () => {
  const response = await render("/work/visual-lab");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /\/portfolio\/33\.webp/);
  assert.match(html, /\/portfolio\/45\.webp/);
  assert.doesNotMatch(html, /\/portfolio\/46\.webp/);
});

test("limits personal practice to page 46", async () => {
  const response = await render("/work/personal-practice");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, />个人练习</);
  assert.match(html, /\/portfolio\/46\.webp/);
  assert.doesNotMatch(html, /\/portfolio\/43\.webp|\/portfolio\/44\.webp|\/portfolio\/45\.webp/);
});
