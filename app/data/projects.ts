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
  pageBasePath?: string;
  detailImages?: string[];
  videos?: Array<{
    src: string;
    label: string;
  }>;
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
    pages: Array.from({ length: 20 }, (_, index) => index + 3),
    pageBasePath: "/portfolio/liangbulu",
    accent: "#58ef68",
    foreground: "#111312",
  },
  {
    slug: "canopy-coffee",
    number: "02",
    title: "轮本咖啡小程序",
    englishTitle: "Canopy Cash Co.",
    category: "小程序 · 交互全案 · 品牌体验",
    year: "2026",
    description:
      "以品牌氛围统领点单、外卖与会员路径，把消费任务、内容触点和视觉语言整合成连贯而有温度的小程序体验。",
    cover: "/covers/canopy.webp",
    coverHeight: 1000,
    pages: Array.from({ length: 15 }, (_, index) => index + 35),
    pageBasePath: "/portfolio/canopy-coffee",
    accent: "#ffcc43",
    foreground: "#121212",
  },
  {
    slug: "visual-lab",
    number: "03",
    title: "运营设计",
    englishTitle: "Operation Design",
    category: "运营活动 · 主视觉 · AIGC",
    year: "2026",
    description:
      "以运营目标确定视觉主题，再通过 AIGC 辅助概念发散与资产制作，将主视觉延展为可持续使用的成套传播物料。",
    cover: "/covers/visual.webp",
    coverHeight: 1000,
    pages: Array.from({ length: 12 }, (_, index) => index + 23),
    pageBasePath: "/portfolio/visual-lab",
    accent: "#a4150f",
    foreground: "#fff8ec",
  },
  {
    slug: "personal-practice",
    number: "04",
    title: "个人练习",
    englishTitle: "Personal Practice",
    category: "图标练习 · AIGC",
    year: "2026",
    description:
      "以 AI 主题界面、角色切换与图标资产为练习对象，持续探索界面氛围、信息层级和视觉风格的表达方式。",
    cover: "/covers/personal-practice.webp",
    coverHeight: 995,
    pages: [46],
    videos: [
      { src: "/videos/jingdong.mp4", label: "\u4eac\u4e1c" },
      { src: "/videos/dinosaur.mp4", label: "\u6050\u9f99" },
      { src: "/videos/girl.mp4", label: "\u5973\u5b69" },
    ],
    accent: "#302900",
    foreground: "#f4ead1",
  },
  {
    slug: "beyond-design",
    number: "05",
    title: "\u8bbe\u8ba1\u4e4b\u5916",
    englishTitle: "Beyond Design",
    category: "\u751f\u6d3b\u8bb0\u5f55 \u00b7 \u5174\u8da3\u63a2\u7d22",
    year: "2026",
    description:
      "\u5c06\u89c6\u7ebf\u79fb\u5411\u8bbe\u8ba1\u4e4b\u5916\uff0c\u4e00\u4e9b\u6211\u7684\u65e5\u5e38\u7684\u8bb0\u5f55\u4e0e\u6210\u957f\u7684\u75d5\u8ff9",
    cover: "/covers/beyond-design.webp",
    coverHeight: 592,
    pages: [],
    detailImages: Array.from(
      { length: 28 },
      (_, index) => `/beyond-design/${index}.webp`,
    ),
    accent: "#d9c9ad",
    foreground: "#171614",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
