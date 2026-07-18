"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type ManifestoSegment = {
  text: string;
  accent?: boolean;
};

const manifestoLines: ManifestoSegment[][] = [
  [
    { text: "四组项目都从" },
    { text: "真实场景", accent: true },
    { text: "出发：" },
  ],
  [
    { text: "先梳理" },
    { text: "用户路径", accent: true },
    { text: "与产品结构，" },
  ],
  [
    { text: "再用" },
    { text: "统一视觉", accent: true },
    { text: "建立清晰体验，" },
  ],
  [
    { text: "最后以运营思维与 " },
    { text: "AIGC", accent: true },
    { text: " 完成创意延展。" },
  ],
];

const manifestoLabel =
  "四组项目都从真实场景出发：先梳理用户路径与产品结构，再用统一视觉建立清晰体验，最后以运营思维与 AIGC 完成创意延展。";

export function ManifestoMotion() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const motionMatch = gsap.matchMedia();
      let isMounted = true;

      motionMatch.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          compact: "(max-width: 720px)",
        },
        (context) => {
          const conditions = context.conditions as {
            reduceMotion?: boolean;
            compact?: boolean;
          };
          const compact = Boolean(conditions.compact);
          const chars = gsap.utils.toArray<HTMLElement>(".manifesto-char", root);
          const lines = gsap.utils.toArray<HTMLElement>(".manifesto-line-inner", root);
          const accents = gsap.utils.toArray<HTMLElement>(".manifesto-segment-accent", root);
          const scan = root.querySelector<HTMLElement>(".manifesto-scan");
          const orbit = root.querySelector<HTMLElement>(".manifesto-orbit");
          const orbitCore = root.querySelector<HTMLElement>(".manifesto-orbit-core");

          if (conditions.reduceMotion) {
            gsap.set(chars, { autoAlpha: 1, clearProps: "transform,filter,visibility" });
            gsap.set(lines, { clearProps: "transform" });
            gsap.set(accents, { "--accent-progress": "100%", color: "#ff7655" });
            return;
          }

          gsap.set(chars, {
            autoAlpha: 0,
            yPercent: compact ? 48 : 120,
            rotationX: compact ? 0 : -92,
            rotationZ: compact ? 0 : (index) => (index % 2 === 0 ? -2.5 : 2.5),
            filter: compact ? "blur(0px)" : "blur(12px)",
            transformOrigin: "50% 100%",
          });
          gsap.set(lines, {
            xPercent: (index) => (index % 2 === 0 ? 5 : -5),
          });

          const timeline = gsap.timeline({
            defaults: { ease: "power4.out" },
            scrollTrigger: {
              trigger: root,
              start: "top 82%",
              end: compact ? "bottom 50%" : "bottom 38%",
              scrub: compact ? 0.5 : 0.75,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .addLabel("assemble", 0)
            .to(
              lines,
              {
                xPercent: 0,
                duration: compact ? 0.7 : 0.9,
                stagger: 0.08,
              },
              "assemble",
            )
            .to(
              chars,
              {
                autoAlpha: 1,
                yPercent: 0,
                rotationX: 0,
                rotationZ: 0,
                filter: "blur(0px)",
                duration: compact ? 0.78 : 1.1,
                stagger: {
                  each: compact ? 0.008 : 0.014,
                  from: "random",
                },
              },
              "assemble",
            )
            .to(
              accents,
              {
                "--accent-progress": "100%",
                color: "#ff7655",
                duration: 0.8,
                stagger: 0.11,
              },
              "assemble+=0.34",
            )
            .to(
              scan,
              {
                xPercent: 330,
                duration: 1.35,
                ease: "power2.inOut",
              },
              "assemble+=0.08",
            )
            .to(
              orbit,
              {
                rotation: 210,
                scale: 1.06,
                duration: 1.4,
                ease: "none",
              },
              "assemble",
            );

          const ambientOrbit = gsap.to(orbitCore, {
            rotation: 360,
            duration: compact ? 22 : 16,
            repeat: -1,
            ease: "none",
          });

          return () => ambientOrbit.kill();
        },
      );

      void document.fonts?.ready.then(() => {
        if (isMounted) ScrollTrigger.refresh();
      });

      return () => {
        isMounted = false;
        motionMatch.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="manifesto-method manifesto-motion">
      <div className="manifesto-orbit" aria-hidden="true">
        <span className="manifesto-orbit-core" />
      </div>
      <span className="manifesto-scan" aria-hidden="true" />
      <h2 id="manifesto-title" className="manifesto-title-motion" aria-label={manifestoLabel}>
        {manifestoLines.map((line, lineIndex) => (
          <span className="manifesto-line" aria-hidden="true" key={"line-" + lineIndex}>
            <span className="manifesto-line-inner">
              {line.map((segment, segmentIndex) => (
                <span
                  className={
                    "manifesto-segment" +
                    (segment.accent ? " manifesto-segment-accent" : "")
                  }
                  key={lineIndex + "-" + segmentIndex}
                >
                  {Array.from(segment.text).map((character, characterIndex) => (
                    <span
                      className="manifesto-char"
                      key={lineIndex + "-" + segmentIndex + "-" + characterIndex}
                    >
                      {character === " " ? "\u00a0" : character}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
