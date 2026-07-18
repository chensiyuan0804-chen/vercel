const contactPrompt = "有合适的机会 / 项目？";

export function ContactFooter() {
  return (
    <footer className="contact-footer" id="contact">
      <div className="section-label footer-label">
        <span>04</span>
        <p>CONTACT / 期待与你合作</p>
      </div>
      <div className="contact-copy">
        <p>WELCOME TO MY HOMEPAGE</p>
        <a
          href="mailto:2428340991@qq.com"
          aria-label="有合适的机会 / 项目？通过邮件联系"
        >
          <span className="contact-jump-text" aria-hidden="true">
            {Array.from(contactPrompt).map((character, index) => (
              <span
                className="contact-jump-char"
                key={`${character}-${index}`}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {character === " " ? "\u00a0" : character}
              </span>
            ))}
          </span>
          <span className="contact-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="footer-meta">
        <a href="mailto:2428340991@qq.com">2428340991@qq.com</a>
        <a href="tel:+8619215173483">+86 192 1517 3483</a>
        <p>© 2026 CHEN SIYUAN</p>
      </div>
    </footer>
  );
}

