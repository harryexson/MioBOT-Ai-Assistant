import { useEffect } from "react";

// Progressive enhancement: content remains visible if motion or JS is unavailable.
export default function useLandingMotion(root, paused) {
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    let frame;
    const stage = node.querySelector(".hero-art");
    const reset = () => { if (stage) stage.style.transform = ""; };
    const move = (event) => {
      if (event.pointerType !== "mouse" || paused || preference.matches) return;
      const box = stage.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        stage.style.transform = `perspective(1200px) rotateX(${-y * 3}deg) rotateY(${x * 4}deg)`;
      });
    };
    const setup = () => {
      observer?.disconnect();
      reset();
      node.querySelectorAll(".motion-ready").forEach((item) => item.classList.remove("motion-ready"));
      if (paused || preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("motion-visible");
          observer.unobserve(entry.target);
        }
      }), { threshold: 0.12 });
      node.querySelectorAll(".section-heading, .service-card, .demo-copy, .phone-stage, .steps-grid article, .business-banner, .final-cta").forEach((item, index) => {
        item.classList.add("motion-ready");
        item.style.setProperty("--reveal-delay", `${(index % 4) * 55}ms`);
        observer.observe(item);
      });
    };
    setup();
    preference.addEventListener("change", setup);
    stage?.addEventListener("pointermove", move);
    stage?.addEventListener("pointerleave", reset);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", setup);
      stage?.removeEventListener("pointermove", move);
      stage?.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [root, paused]);
}
