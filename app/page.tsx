import { ContactFooter } from "./components/ContactFooter";
import { HeroStage } from "./components/HeroStage";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { Reveal } from "./components/Reveal";
import { SiteHeader } from "./components/SiteHeader";
import { projects } from "./data/projects";

export default function Home() {
  return (
    <main>
      <div className="hero-shell">
        <SiteHeader inverse />
        <HeroStage />
      </div>

      <section className="manifesto" aria-labelledby="manifesto-title">
        <div className="section-label">
          <span>01</span>
          <p>PROFILE / 设计方法</p>
        </div>
        <Reveal className="manifesto-method">
          <h2 id="manifesto-title">
            四组项目都从真实场景出发：
            <br />
            先梳理用户路径与产品结构，
            <br />
            再用统一视觉建立清晰体验，
            <br />
            最后以运营思维与 AIGC 完成创意延展。
          </h2>
        </Reveal>
      </section>

      <section className="work-section" id="work" aria-label="精选项目">
        <div className="section-heading">
          <div className="section-label">
            <span>02</span>
            <p>SELECTED WORK / 精选项目</p>
          </div>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectShowcase
              key={project.slug}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="section-label section-label-light">
          <span>03</span>
          <p>ABOUT / 关于我</p>
        </div>
        <div className="about-grid">
          <Reveal className="about-portrait-wrap">
            <figure className="about-portrait">
              <img
                src="/portrait-casual.webp"
                alt="陈思源在镜前的生活照片"
                width="960"
                height="1280"
                loading="lazy"
                decoding="async"
              />
              <figcaption>CHEN SIYUAN · UI DESIGNER</figcaption>
            </figure>
          </Reveal>

          <div className="about-copy">
            <Reveal>
              <p className="about-eyebrow">你好，我是陈思源。</p>
              <h2 id="about-title">
                可以叫我胖虎，一名对任何事物都十分好奇的 UI 设计师。
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="about-summary">
                现就读于湖南人文科技学院视觉传达设计专业。具备从用户调研、信息架构、交互设计到高保真视觉输出的完整实践经验，也持续探索 AIGC 在运营视觉与创意表达中的边界。
              </p>
            </Reveal>

            <div className="resume-grid">
              <Reveal delay={140}>
                <div className="resume-item">
                  <p className="resume-label">教育经历</p>
                  <h3>湖南人文科技学院</h3>
                  <p>视觉传达设计 · 本科</p>
                  <time>2022.09 — 2026.06</time>
                </div>
              </Reveal>
              <Reveal delay={180}>
                <div className="resume-item">
                  <p className="resume-label">实习经历</p>
                  <h3>蓝鲲智创信息科技有限公司</h3>
                  <p>UI 设计师</p>
                  <time>2025.08 — 2026.02</time>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <div className="skills-block">
                <p className="resume-label">TOOLS &amp; CAPABILITIES</p>
                <div className="skill-list">
                  {[
                    "Figma",
                    "Illustrator",
                    "Photoshop",
                    "C4D",
                    "Midjourney",
                    "ChatGPT",
                    "Codex",
                    "Tapnow",
                    "AIGC",
                  ].map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="awards-block">
                <p className="resume-label">SELECTED AWARDS</p>
                <p>米兰设计周师生优秀作品展 · 全国赛区三等奖</p>
                <p>米兰设计周师生优秀作品展 · 湖南赛区二等奖</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
