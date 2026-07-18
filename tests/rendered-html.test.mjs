import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders four cleanly separated homepage projects", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN"/i);
  assert.match(html, /四组项目都从真实场景出发/);
  assert.match(html, /两步路用户体验升级/);
  assert.match(html, /轮本咖啡小程序/);
  assert.match(html, />运营设计</);
  assert.match(html, />个人练习</);
  assert.match(html, /\/work\/personal-practice/);
  assert.match(html, /\/portfolio\/46\.webp/);
  assert.doesNotMatch(html, /\/portfolio\/43\.webp|\/portfolio\/44\.webp|运营设计与个人练习/);
});

test("keeps the product case pages in their requested order", async () => {
  const response = await render("/work/liangbulu");
  assert.equal(response.status, 200);

  const html = await response.text();
  const firstPage = html.indexOf("/portfolio/1.webp");
  const lastPage = html.indexOf("/portfolio/16.webp");

  assert.ok(firstPage >= 0, "first project page should be present");
  assert.ok(lastPage > firstPage, "project pages should remain in ascending order");
});

test("keeps pages 33 through 45 inside operation design", async () => {
  const response = await render("/work/visual-lab");
  assert.equal(response.status, 200);

  const html = await response.text();
  const firstPage = html.indexOf("/portfolio/33.webp");
  const lastPage = html.indexOf("/portfolio/45.webp");

  assert.match(html, />运营设计</);
  assert.ok(firstPage >= 0, "operation design should start with page 33");
  assert.ok(lastPage > firstPage, "operation design should include page 45");
  assert.doesNotMatch(html, /\/portfolio\/46\.webp|运营设计与个人练习/);
});

test("limits personal practice to page 46", async () => {
  const response = await render("/work/personal-practice");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, />个人练习</);
  assert.match(html, /\/portfolio\/46\.webp/);
  assert.doesNotMatch(html, /\/portfolio\/43\.webp|\/portfolio\/44\.webp|\/portfolio\/45\.webp/);
});
