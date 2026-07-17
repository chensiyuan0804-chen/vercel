import Link from "next/link";

type SiteHeaderProps = {
  inverse?: boolean;
};

export function SiteHeader({ inverse = false }: SiteHeaderProps) {
  return (
    <header className={`site-header${inverse ? " site-header-inverse" : ""}`}>
      <Link className="brand" href="/" aria-label="陈思源作品集首页">
        <span>CHEN</span>
        <span>SIYUAN</span>
      </Link>
      <nav aria-label="主要导航">
        <Link href="/#work">项目</Link>
        <Link href="/#about">关于</Link>
        <a href="mailto:2428340991@qq.com">联系 ↗</a>
      </nav>
    </header>
  );
}

