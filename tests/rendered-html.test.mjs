import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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
  assert.match(body, /id="manifesto-title"/);
  assert.match(body, /\u5c06\u89c6\u7ebf\u79fb\u5411\u8bbe\u8ba1\u4e4b\u5916\uff0c\u4e00\u4e9b\u6211\u7684\u65e5\u5e38\u7684\u8bb0\u5f55\u4e0e\u6210\u957f\u7684\u75d5\u8ff9/);
  const skills = body.slice(body.indexOf('<div class="skill-list">'), body.indexOf('</div>', body.indexOf('<div class="skill-list">')));
  assert.doesNotMatch(skills, /AIGC/);
  assert.match(body, /图标练习 · AIGC/);
  assert.doesNotMatch(body, /VIEW PROJECT|从策略到落地的完整案例|界面概念|2025—2026|2024—2026/);
});

test("removes the first three liangbulu catalog pages", async () => {
  const response = await render("/work/liangbulu");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /\/portfolio\/4\.webp/);
  assert.match(html, /\/portfolio\/16\.webp/);
  assert.ok(html.indexOf("/portfolio/4.webp") < html.indexOf("/portfolio/16.webp"));
  assert.doesNotMatch(html, /\/portfolio\/(?:1|2|3)\.webp/);
});

test("removes the first canopy catalog page", async () => {
  const response = await render("/work/canopy-coffee");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.doesNotMatch(html, /\/portfolio\/17\.webp/);
  assert.match(html, /\/portfolio\/18\.webp/);
  assert.match(html, /\/portfolio\/32\.webp/);
});

test("removes the first operation design catalog page", async () => {
  const response = await render("/work/visual-lab");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.doesNotMatch(html, /\/portfolio\/33\.webp/);
  assert.match(html, /\/portfolio\/34\.webp/);
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

test("personal practice renders three videos", async () => {
  const response = await render("/work/personal-practice");
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.equal((body.match(/<video/g) || []).length, 3);
  assert.equal((body.match(/autoplay=""/gi) || []).length, 3);
  assert.equal((body.match(/loop=""/gi) || []).length, 3);
  assert.equal((body.match(/muted=""/gi) || []).length, 3);
  assert.doesNotMatch(body, /<video[^>]*controls/i);
  assert.match(body, /\/videos\/jingdong\.mp4/);
  assert.match(body, /\/videos\/dinosaur\.mp4/);
  assert.match(body, /\/videos\/girl\.mp4/);
  assert.doesNotMatch(body, /<figcaption>/);
});

test("beyond design keeps all folder images in numeric order", async () => {
  const response = await render("/work/beyond-design");
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /class="case-images-compact"/);
  for (let index = 0; index < 28; index += 1) {
    assert.match(body, new RegExp(`/beyond-design/${index}\\.webp`));
  }
  assert.ok(body.indexOf("/beyond-design/2.webp") < body.indexOf("/beyond-design/10.webp"));
  assert.match(body, /\u5c06\u89c6\u7ebf\u79fb\u5411\u8bbe\u8ba1\u4e4b\u5916\uff0c\u4e00\u4e9b\u6211\u7684\u65e5\u5e38\u7684\u8bb0\u5f55\u4e0e\u6210\u957f\u7684\u75d5\u8ff9/);
});

test("ships the requested title fonts and manifesto motion styles", async () => {
  await access(new URL("../public/fonts/biaoxiaozhi-wujiehei.otf", import.meta.url));
  await access(new URL("../public/fonts/fzchaocuhei-m10s.ttf", import.meta.url));

  const css = await readFile(new URL("../app/portfolio-polish-v9.css", import.meta.url), "utf8");
  assert.match(css, /Biaoxiaozhi Wujiehei/);
  assert.match(css, /FZChaoCuHei-M10S/);

  const motion = await readFile(new URL("../app/components/ManifestoMotion.tsx", import.meta.url), "utf8");
  assert.match(motion, /ScrollTrigger/);
  assert.match(motion, /prefers-reduced-motion/);
});
