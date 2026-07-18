"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Project } from "../data/projects";

type ProjectShowcaseProps = {
  project: Project;
  index: number;
  total: number;
};

export function ProjectShowcase({ project, index, total }: ProjectShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    node.dataset.ready = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.active = "true";
        observer.unobserve(node);
      },
      { threshold: 0.2, rootMargin: "-6% 0px -10%" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const totalLabel = String(total).padStart(2, "0");
  const projectHref = `/work/${project.slug}`;

  return (
    <section
      ref={sectionRef}
      className="project-showcase"
      aria-labelledby={`project-${project.slug}`}
    >
      <article className="project-card">
        <Link
          className="project-media"
          href={projectHref}
          aria-label={`查看${project.title}项目`}
        >
          <img
            src={project.cover}
            alt={`${project.title}项目封面`}
            width="1600"
            height={project.coverHeight ?? 1000}
            loading={index === 0 ? "eager" : "lazy"}
            decoding={index === 0 ? "sync" : "async"}
          />
          <span className="project-open" aria-hidden="true">↗</span>
          <span className="project-stage-index" aria-hidden="true">
            {project.number} / {totalLabel}
          </span>
        </Link>

        <div className="project-info">
          <div className="project-info-top">
            <p className="project-number">PROJECT {project.number}</p>
            <p className="project-category">{project.category}</p>
            <p className="project-year">{project.year}</p>
          </div>
          <div className="project-info-main">
            <h3 id={`project-${project.slug}`}>
              <Link href={projectHref}>{project.title}</Link>
            </h3>
            <div className="project-summary">
              <p className="project-description">{project.description}</p>
              <Link className="project-view" href={projectHref}>
                VIEW PROJECT <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
