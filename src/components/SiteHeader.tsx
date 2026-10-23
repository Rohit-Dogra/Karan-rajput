"use client";

import { useEffect, useRef, useState } from "react";
import { navItems } from "@/data/nav";
import { CloseIcon } from "./icons";

export function SiteHeader({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.documentElement.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && menuRef.current) {
        const items = [...menuRef.current.querySelectorAll<HTMLElement>("a, button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-8 md:h-20">
          <a href="#top" className="display text-2xl tracking-tight md:text-3xl" aria-label={`${name} — back to top`}>
            {name}
            <span className="text-ember">.</span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="eyebrow group relative py-2 text-paper/80 transition-colors hover:text-paper">
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#music" className="eyebrow hidden rounded-full bg-paper px-5 py-3 text-ink transition-colors hover:bg-ember lg:inline-flex">
            Listen now
          </a>

          <button
            ref={toggleRef}
            type="button"
            className="eyebrow flex items-center gap-3 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            Menu
            <span aria-hidden className="flex w-6 flex-col gap-1.5">
              <span className="h-px w-full bg-paper" />
              <span className="h-px w-2/3 self-end bg-paper" />
            </span>
          </button>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="menu-in fixed inset-0 z-[60] flex h-dvh flex-col bg-ink px-4 pb-10 sm:px-8 lg:hidden"
        >
          <div className="flex h-16 items-center justify-between md:h-20">
            <span className="display text-2xl">
              {name}
              <span className="text-ember">.</span>
            </span>
            <button type="button" onClick={() => setOpen(false)} className="eyebrow flex items-center gap-2" aria-label="Close menu">
              Close <CloseIcon size={20} />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-6 flex-1 overflow-y-auto">
            <ul>
              {navItems.map((item, i) => (
                <li key={item.href} className="border-b border-line">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rise display flex items-baseline justify-between py-4 text-[clamp(2.75rem,13vw,5rem)] transition-colors hover:text-ember"
                    style={{ animationDelay: `${60 * i}ms` }}
                  >
                    {item.label}
                    <span className="eyebrow text-muted">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
