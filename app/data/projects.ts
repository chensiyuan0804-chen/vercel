export type Project = {
  slug: string;
  number: string;
  title: string;
  englishTitle: string;
  category: string;
  year: string;
  description: string;
  cover: string;
  coverHeight?: number;
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
      "从户外用户的真实任务出发，重新梳理信息架构与核心路径，并用统一的交互和视觉系统降低复杂产品的理解成本。",
    cover: "/covers/liangbulu.webp",
    coverHeight: 1000,
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
      "以品牌氛围统领点单、外卖与会员路径，把消费任务、内容触点和视觉语言整合成连贯而有温度的小程序体验。",
    cover: "/covers/canopy.webp",
    coverHeight: 1000,
    pages: Array.from({ length: 16 }, (_, index) => index + 17),
    accent: "#ffcc43",
    foreground: "#121212",
  },
  {
    slug: "visual-lab",
    number: "03",
    title: "运营设计",
    englishTitle: "Operation Design",
    category: "运营活动 · 主视觉 · AIGC",
    year: "2025—2026",
    description:
      "以运营目标确定视觉主题，再通过 AIGC 辅助概念发散与资产制作，将主视觉延展为可持续使用的成套传播物料。",
    cover: "/covers/visual.webp",
    coverHeight: 900,
    pages: Array.from({ length: 13 }, (_, index) => index + 33),
    accent: "#a4150f",
    foreground: "#fff8ec",
  },
  {
    slug: "personal-practice",
    number: "04",
    title: "个人练习",
    englishTitle: "Personal Practice",
    category: "界面概念 · 图标练习 · AIGC",
    year: "2024—2026",
    description:
      "以 AI 主题界面、角色切换与图标资产为练习对象，持续探索界面氛围、信息层级和视觉风格的表达方式。",
    cover: "/portfolio/46.webp",
    coverHeight: 1080,
    pages: [46],
    accent: "#102c3d",
    foreground: "#e9f4fa",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
