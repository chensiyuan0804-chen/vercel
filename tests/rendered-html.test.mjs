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

test("server-renders the four reviewed homepage projects", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN"/i);
  assert.match(html, /UI DESIGN/);
  assert.match(html, /四组项目都从真实场景出发/);
  assert.match(html, /两步路用户体验升级/);
  assert.match(html, /轮本咖啡小程序/);
  assert.match(html, />运营设计</);
  assert.match(html, />个人练习</);
  assert.match(html, /\/work\/personal-practice/);
  assert.match(html, /\/portfolio\/43\.webp/);
  assert.match(html, /\/portfolio\/44\.webp/);
  assert.match(html, /\/portfolio\/46\.webp/);
  assert.doesNotMatch(html, /运营设计与个人练习|校级“两笔一画”活动|codex-preview|Your site is taking shape/i);
});

test("keeps the product case pages in their requested order", async () => {
  const response = await render("/work/liangbulu");
  assert.equal(response.status, 200);

  const html = await response.text();
  const firstPage = html.indexOf("/portfolio/1.webp");
  const lastPage = html.indexOf("/portfolio/16.webp");

  assert.ok(firstPage >= 0, "first project page should be present");
  assert.ok(lastPage > firstPage, "project pages should remain in ascending order");
  assert.match(html, /完整项目展示/);
});

test("limits operation design to pages 33 through 42", async () => {
  const response = await render("/work/visual-lab");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, />运营设计</);
  assert.match(html, /\/portfolio\/33\.webp/);
  assert.match(html, /\/portfolio\/42\.webp/);
  assert.doesNotMatch(html, /\/portfolio\/43\.webp|\/portfolio\/46\.webp|运营设计与个人练习/);
});

test("renders personal practice as its own fourth case", async () => {
  const response = await render("/work/personal-practice");
  assert.equal(response.status, 200);

  const html = await response.text();
  const firstPage = html.indexOf("/portfolio/43.webp");
  const lastPage = html.indexOf("/portfolio/46.webp");

  assert.match(html, />个人练习</);
  assert.ok(firstPage >= 0, "personal practice should start with page 43");
  assert.ok(lastPage > firstPage, "personal practice pages should remain ordered through page 46");
});
