import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScrollProgress } from "../../components/ScrollProgress";
import { getProject, projects } from "../../data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className={`case-page case-page-${project.slug}`}>
      <ScrollProgress />
      <header className="case-nav">
        <Link href="/#work" aria-label="返回精选项目">← 返回项目</Link>
        <Link className="case-brand" href="/">CHEN SIYUAN</Link>
        <a href="mailto:2428340991@qq.com">联系 ↗</a>
      </header>

      <section
        className="case-hero"
        style={{
          "--case-accent": project.accent,
          "--case-foreground": project.foreground,
        } as CSSProperties}
      >
        <div className="case-number">{project.number}</div>
        <div className="case-heading">
          <h1>{project.title}</h1>
          <p className="case-english">{project.englishTitle}</p>
        </div>
        <div className="case-intro">
          <p>{project.description}</p>
          <p className="case-year">{project.year}</p>
        </div>
      </section>

      <section className="case-images" aria-label={`${project.title}完整项目展示`}>
        {project.pages.map((page, index) => (
          <img
            key={page}
            src={`/portfolio/${page}.webp`}
            alt={`${project.title}项目展示第 ${index + 1} 页`}
            width="1920"
            loading={index < 2 ? "eager" : "lazy"}
            decoding={index < 2 ? "sync" : "async"}
          />
        ))}

        {project.detailImages?.length ? (
          <div className="case-images-compact">
            {project.detailImages.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`${project.title} work ${index + 1}`}
                width="1920"
                loading={index < 2 ? "eager" : "lazy"}
                decoding={index < 2 ? "sync" : "async"}
              />
            ))}
          </div>
        ) : null}
      </section>

      {project.videos?.length ? (
        <section className="case-videos" aria-label={`${project.title} motion works`}>
          {project.videos.map((video) => (
            <figure className="case-video" key={video.src}>
              <video autoPlay loop muted playsInline preload="auto" aria-label={`${video.label} motion work`}>
                <source src={video.src} type="video/mp4" />
                Video playback is not supported by this browser.
              </video>
            </figure>
          ))}
        </section>
      ) : null}

      <section className="next-project">
        <p>NEXT PROJECT · {nextProject.number}</p>
        <Link href={`/work/${nextProject.slug}`}>
          <span>{nextProject.title}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}

