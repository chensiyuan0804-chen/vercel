import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./portfolio-update.css";
import "./project-layout-v4.css";
import "./project-layout-v5.css";
import "./project-layout-v6.css";
import "./project-media-v7.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim();
  const host = forwardedHost || requestHeaders.get("host") || "localhost:3000";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProtocol || (host.startsWith("localhost") ? "http" : "https");

  let metadataBase: URL;
  try {
    metadataBase = new URL(`${protocol}://${host}`);
  } catch {
    metadataBase = new URL("http://localhost:3000");
  }

  const socialImage = new URL("/og-v2.png", metadataBase).toString();

  return {
    metadataBase,
    title: {
      default: "CHEN SIYUAN | UI DESIGN PORTFOLIO",
      template: "%s | CHEN SIYUAN",
    },
    description:
      "陈思源的 UI 设计作品集，包含产品体验升级、小程序全案、运营设计与个人视觉练习。",
    keywords: ["陈思源", "UI设计师", "UX设计", "视觉设计", "作品集"],
    authors: [{ name: "陈思源" }],
    openGraph: {
      title: "CHEN SIYUAN | UI DESIGN PORTFOLIO",
      description: "从用户路径到视觉系统，把复杂体验整理得清晰、自然、有记忆点。",
      type: "website",
      locale: "zh_CN",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "Chen Siyuan UI Design Portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "CHEN SIYUAN | UI DESIGN PORTFOLIO",
      description: "Curious about everything. Designing clear digital experiences.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
