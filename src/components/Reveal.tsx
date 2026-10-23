"use client";

import { useEffect, useRef, type ElementType, type ComponentPropsWithoutRef } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  delay?: number;
} & ComponentPropsWithoutRef<T>;

/** Fades its content up the first time it scrolls into view. Static when motion is reduced (see globals.css). */
export function Reveal<T extends ElementType = "div">({ as, delay = 0, style, ...rest }: RevealProps<T>) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.dataset.reveal = "in";
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <Tag ref={ref} data-reveal="" style={{ transitionDelay: `${delay}ms`, ...style }} {...rest} />;
}
