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

test("server-renders the reviewed portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN"/i);
  assert.match(html, /UI DESIGN/);
  assert.match(html, /PORTFOLIO\./);
  assert.match(html, /可以叫我胖虎/);
  assert.match(html, /WELCOME TO MY HOMEPAGE/);
  assert.match(html, /\/covers\/liangbulu\.webp/);
  assert.match(html, /\/covers\/canopy\.webp/);
  assert.match(html, /\/covers\/visual\.webp/);
  assert.match(html, /陈思源在镜前的生活照片/);
  assert.doesNotMatch(html, /校级“两笔一画”活动|让产品被看见|codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("renders project artwork in the requested single-column order", async () => {
  const response = await render("/work/liangbulu");
  assert.equal(response.status, 200);

  const html = await response.text();
  const firstPage = html.indexOf("/portfolio/1.webp");
  const lastPage = html.indexOf("/portfolio/16.webp");

  assert.ok(firstPage >= 0, "first project page should be present");
  assert.ok(lastPage > firstPage, "project pages should remain in ascending order");
  assert.match(html, /完整项目展示/);
});
