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

test("initializes the Cloudflare worker without scheduling global timers", async () => {
  const originalSetTimeout = globalThis.setTimeout;
  globalThis.setTimeout = (...args) => {
    const stack = new Error().stack ?? "";
    if (stack.includes("ManifestoMotion")) {
      throw new Error("ManifestoMotion scheduled a timer during SSR module initialization");
    }
    return originalSetTimeout(...args);
  };

  try {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("global-scope-test", `${process.pid}-${Date.now()}`);
    const { default: worker } = await import(workerUrl.href);
    assert.equal(typeof worker.fetch, "function");
    const response = await worker.fetch(
      new Request("http://localhost/", { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    assert.equal(response.status, 200);
  } finally {
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("renders project information before each homepage cover", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  const body = html.slice(html.indexOf("<body"));

  assert.match(body, /<div class="project-info">[\s\S]*?<a href="\/work\/liangbulu" class="project-media"/);
  assert.match(body, /\/covers\/personal-practice\.webp/);
  assert.match(body, /id="manifesto-title"/);
  assert.match(body, /UI\/UX DESIGN/);
  assert.match(body, /\u5c06\u89c6\u7ebf\u79fb\u5411\u8bbe\u8ba1\u4e4b\u5916\uff0c\u4e00\u4e9b\u6211\u7684\u65e5\u5e38\u7684\u8bb0\u5f55\u4e0e\u6210\u957f\u7684\u75d5\u8ff9/);
  const skills = body.slice(body.indexOf('<div class="skill-list">'), body.indexOf('</div>', body.indexOf('<div class="skill-list">')));
  assert.doesNotMatch(skills, /AIGC/);
  assert.match(body, /图标练习 · AIGC/);
  assert.doesNotMatch(body, /VIEW PROJECT|从策略到落地的完整案例|界面概念|2025—2026|2024—2026/);
});

test("renders the replacement liangbulu pages in order", async () => {
  const response = await render("/work/liangbulu");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /\/portfolio\/liangbulu\/3\.webp/);
  assert.match(html, /\/portfolio\/liangbulu\/22\.webp/);
  assert.ok(
    html.indexOf("/portfolio/liangbulu/3.webp") <
      html.indexOf("/portfolio/liangbulu/22.webp"),
  );

});

test("renders the replacement canopy pages in order", async () => {
  const response = await render("/work/canopy-coffee");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /\/portfolio\/canopy-coffee\/38\.webp/);
  assert.match(html, /\/portfolio\/canopy-coffee\/53\.webp/);
  assert.ok(
    html.indexOf("/portfolio/canopy-coffee/38.webp") <
      html.indexOf("/portfolio/canopy-coffee/53.webp"),
  );
});

test("renders the replacement operation design pages in order", async () => {
  const response = await render("/work/visual-lab");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /\/portfolio\/visual-lab\/23\.webp/);
  assert.match(html, /\/portfolio\/visual-lab\/37\.webp/);
  assert.ok(
    html.indexOf("/portfolio/visual-lab/23.webp") <
      html.indexOf("/portfolio/visual-lab/37.webp"),
  );

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
  assert.match(motion, /finePointer/);
  assert.match(motion, /gsap\.quickTo/);
  assert.match(motion, /manifesto-pointer-glow/);
  assert.match(motion, /从真实场景出发/);
  assert.match(motion, /AIGC提效并辅助完成创意/);
  assert.doesNotMatch(motion, /四组项目都从|最后以运营思维与/);
  assert.doesNotMatch(motion, /出发：|与产品结构，|建立清晰体验，/);

  const contact = await readFile(new URL("../app/components/ContactFooter.tsx", import.meta.url), "utf8");
  assert.match(contact, /contact-jump-char/);
  assert.match(contact, /有合适的机会 \/ 项目？通过邮件联系/);

  const refinements = await readFile(new URL("../app/portfolio-polish-v11.css", import.meta.url), "utf8");
  assert.match(refinements, /\.hero h1[\s\S]*Biaoxiaozhi Wujiehei/);
  assert.match(refinements, /\.work-section \.project-info h3/);
  assert.match(refinements, /\.case-number[\s\S]*Biaoxiaozhi Wujiehei/);
  assert.match(refinements, /\.case-page-personal-practice \.case-videos[\s\S]*#0f1110/);

  const finalRefinements = await readFile(new URL("../app/portfolio-polish-v12.css", import.meta.url), "utf8");
  assert.match(finalRefinements, /\.case-title-row[\s\S]*justify-content: center/);
  assert.match(finalRefinements, /\.case-title-row \.case-number,[\s\S]*font-size: var\(--case-title-size\)/);
  assert.match(finalRefinements, /\.manifesto \.manifesto-title-motion \.manifesto-line[\s\S]*justify-content: center/);
  assert.match(finalRefinements, /@keyframes contact-jump-active/);
  assert.match(finalRefinements, /@media \(prefers-reduced-motion: reduce\)/);

  const caseTemplate = await readFile(new URL("../app/work/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(caseTemplate, /case-title-row/);
  assert.doesNotMatch(caseTemplate, /case-english/);
});

test("case heroes omit categories and preserve the aligned project identity", async () => {
  const cases = [
    ["/work/liangbulu", "产品重构 · UI/UX · 虚拟项目", "01", "两步路用户体验升级"],
    ["/work/canopy-coffee", "小程序 · 交互全案 · 品牌体验", "02", "轮本咖啡小程序"],
    ["/work/visual-lab", "运营活动 · 主视觉 · AIGC", "03", "运营设计"],
    ["/work/personal-practice", "图标练习 · AIGC", "04", "个人练习"],
    ["/work/beyond-design", "生活记录 · 兴趣探索", "05", "设计之外"],
  ];

  for (const [pathname, category, number, title] of cases) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    const heroStart = html.indexOf('<section class="case-hero"');
    const heroEnd = html.indexOf("</section>", heroStart);
    const hero = html.slice(heroStart, heroEnd);

    assert.ok(heroStart >= 0);
    assert.doesNotMatch(hero, new RegExp(category));
    assert.match(hero, new RegExp('<div class="case-number">' + number + '</div>[\\s\\S]*?<h1>' + title + '</h1>'));
    assert.match(hero, /class="case-title-row"/);
    assert.doesNotMatch(hero, /case-english/);
  }
});
