"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Project } from "../data/projects";

type ProjectShowcaseProps = {
  project: Project;
  index: number;
};

export function ProjectShowcase({ project, index }: ProjectShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    node.dataset.ready = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        node.dataset.active = entry.isIntersecting ? "true" : "false";
      },
      { threshold: 0.28, rootMargin: "-8% 0px -12%" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="project-showcase"
      aria-labelledby={`project-${project.slug}`}
    >
      <article className="project-card">
        <Link
          className="project-media"
          href={`/work/${project.slug}`}
          aria-label={`查看${project.title}项目`}
        >
          <img
            src={project.cover}
            alt={`${project.title}项目封面`}
            width="1600"
            height={project.slug === "visual-lab" ? "900" : "1000"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding={index === 0 ? "sync" : "async"}
          />
          <span className="project-open" aria-hidden="true">↗</span>
          <span className="project-stage-index" aria-hidden="true">
            {project.number} / 03
          </span>
        </Link>

        <div className="project-info">
          <p className="project-number">{project.number}</p>
          <div className="project-copy">
            <p className="project-category">{project.category}</p>
            <h3 id={`project-${project.slug}`}>{project.title}</h3>
            <p className="project-description">{project.description}</p>
          </div>
          <p className="project-year">{project.year}</p>
        </div>
      </article>
    </section>
  );
}

