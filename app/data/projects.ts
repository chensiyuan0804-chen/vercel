export type Project = {
  slug: string;
  number: string;
  title: string;
  englishTitle: string;
  category: string;
  year: string;
  description: string;
  cover: string;
  pages: number[];
  accent: string;
  foreground: string;
};

export const projects: Project[] = [
  {
    slug: "liangbulu",
    number: "01",
    title: "两步路用户体验升级",
    englishTitle: "Liangbulu 2.0",
    category: "产品重构 · UI/UX · 虚拟项目",
    year: "2026",
    description:
      "围绕户外用户的真实路径与核心任务，重构信息架构、交互逻辑与视觉系统，让复杂功能更直觉、更有秩序。",
    cover: "/portfolio/4.webp",
    pages: Array.from({ length: 16 }, (_, index) => index + 1),
    accent: "#58ef68",
    foreground: "#111312",
  },
  {
    slug: "canopy-coffee",
    number: "02",
    title: "轮本咖啡小程序",
    englishTitle: "Canopy Cash Co.",
    category: "小程序 · 交互全案 · 品牌体验",
    year: "2025",
    description:
      "从品牌调性到点单、外卖与会员路径，完成咖啡小程序的完整体验设计，建立统一又有温度的消费触点。",
    cover: "/portfolio/18.webp",
    pages: Array.from({ length: 16 }, (_, index) => index + 17),
    accent: "#ffcc43",
    foreground: "#121212",
  },
  {
    slug: "visual-lab",
    number: "03",
    title: "运营设计与个人练习",
    englishTitle: "Visual Lab",
    category: "运营活动 · 主视觉 · AIGC",
    year: "2025—2026",
    description:
      "聚合活动主视觉、运营增长场景与 AIGC 练习，展示从概念发散、氛围塑造到成套物料延展的视觉能力。",
    cover: "/portfolio/34.webp",
    pages: Array.from({ length: 14 }, (_, index) => index + 33),
    accent: "#a4150f",
    foreground: "#fff8ec",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

