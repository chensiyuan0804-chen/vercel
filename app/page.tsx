import Link from "next/link";
import { ContactFooter } from "./components/ContactFooter";
import { HeroStage } from "./components/HeroStage";
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
        <Reveal>
          <h2 id="manifesto-title">
            用同理心理解问题，
            <br />
            用<span>秩序</span>建立体验，
            <br />
            用视觉留下记忆。
          </h2>
        </Reveal>
        <div className="manifesto-aside">
          <Reveal delay={120}>
            <p>
              我关注产品、用户与品牌之间的真实关系。面对复杂需求时，先梳理目标与路径，再用克制的视觉语言让体验变得准确、顺畅。
            </p>
          </Reveal>
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <div className="section-label">
            <span>02</span>
            <p>SELECTED WORK / 精选项目</p>
          </div>
          <h2 id="work-title">从策略到落地的完整案例</h2>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 80}>
              <article className="project-card">
                <Link
                  className="project-media"
                  href={`/work/${project.slug}`}
                  aria-label={`查看${project.title}项目`}
                >
                  <img
                    src={project.cover}
                    alt={`${project.title}项目封面`}
                    width="1920"
                    height={project.slug === "visual-lab" ? "1385" : "1200"}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="project-open" aria-hidden="true">↗</span>
                </Link>
                <div className="project-info">
                  <p className="project-number">{project.number}</p>
                  <div>
                    <p className="project-category">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>
                  <p className="project-year">{project.year}</p>
                </div>
              </article>
            </Reveal>
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
                src="/portrait.webp"
                alt="陈思源个人照片"
                width="350"
                height="482"
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
                一名相信“清晰本身就是美感”的 UI/UX 与视觉设计师。
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
                    "UI/UX",
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
                <p>校级“两笔一画”活动 · 一等奖</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}

