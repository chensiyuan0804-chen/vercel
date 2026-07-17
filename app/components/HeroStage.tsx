export function HeroStage() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-topline">
        <p>UI/UX &amp; VISUAL DESIGNER</p>
        <p className="hero-availability">
          <span /> Available for opportunities
        </p>
      </div>

      <div className="hero-main">
        <p className="hero-kicker">CHEN SIYUAN · PORTFOLIO 2026</p>
        <h1 id="hero-title">
          <span>让产品被看见，</span>
          <span>
            也被<em>理解。</em>
          </span>
        </h1>
        <div className="hero-support">
          <p>
            从用户洞察到视觉落地，
            <br />
            把复杂体验整理得清晰、自然、有记忆点。
          </p>
          <a className="circle-link" href="#work" aria-label="浏览精选项目">
            <span>浏览项目</span>
            <b aria-hidden="true">↓</b>
          </a>
        </div>
      </div>

      <div className="hero-footer">
        <p>Based in Hunan, China</p>
        <p>Scroll to explore</p>
      </div>

      <div className="marquee" aria-label="能力方向">
        <div className="marquee-track">
          <span>PRODUCT DESIGN</span><i>✦</i>
          <span>INTERACTION</span><i>✦</i>
          <span>VISUAL SYSTEM</span><i>✦</i>
          <span>AIGC</span><i>✦</i>
          <span aria-hidden="true">PRODUCT DESIGN</span><i aria-hidden="true">✦</i>
          <span aria-hidden="true">INTERACTION</span><i aria-hidden="true">✦</i>
          <span aria-hidden="true">VISUAL SYSTEM</span><i aria-hidden="true">✦</i>
          <span aria-hidden="true">AIGC</span><i aria-hidden="true">✦</i>
        </div>
      </div>
    </section>
  );
}

