import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

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

  const socialImage = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
    title: {
      default: "陈思源 | UI/UX & 视觉设计作品集",
      template: "%s | 陈思源作品集",
    },
    description:
      "陈思源的 UI/UX 与视觉设计作品集，包含产品体验升级、小程序全案、运营视觉与 AIGC 练习。",
    keywords: ["陈思源", "UI设计师", "UX设计", "视觉设计", "作品集"],
    authors: [{ name: "陈思源" }],
    openGraph: {
      title: "陈思源 | UI/UX & 视觉设计作品集",
      description: "用同理心理解问题，用秩序建立体验，用视觉留下记忆。",
      type: "website",
      locale: "zh_CN",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "陈思源设计作品集" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "陈思源 | UI/UX & 视觉设计作品集",
      description: "让产品被看见，也被理解。",
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

