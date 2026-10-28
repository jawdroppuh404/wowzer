"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  ArrowUpRight,
  Phone,
  Menu,
  X,
  Pause,
  Play,
  MapPin,
  Droplets,
  Wind,
  Check,
  Plus,
} from "lucide-react";
import type { SiteSettings } from "@/lib/defaults";

declare global {
  interface Window {
    _scheduler?: { show: () => void };
  }
}
export function BookButton({
  children = "Schedule service",
  className = "",
  settings,
}: {
  children?: React.ReactNode;
  className?: string;
  settings?: Pick<SiteSettings, "bookingURL">;
}) {
  return (
    <Link href="/schedule" className={`button ${className}`}>
      {children}
      <ArrowUpRight size={20} aria-hidden="true" />
    </Link>
  );
}
export function Header({ site }: { site: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPaused(
      localStorage.getItem("wowzer-motion") === "paused" || pref.matches,
    );
    const onChange = () => setPaused(pref.matches);
    pref.addEventListener("change", onChange);
    return () => pref.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "running";
  }, [paused]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <div className="utility">
        <span>
          <MapPin size={13} /> Tampa Bay & the surrounding communities
        </span>
        <a href={`tel:+1${site.phone.replace(/\D/g, "")}`}>
          Good help is one call away <ArrowUpRight size={13} />
        </a>
      </div>
      <header className="header">
        <Link
          href="/"
          aria-label="Wowzer home"
          className="brand"
          onClick={() => setOpen(false)}
        >
          <img
            src={site.logoPath}
            alt="Wowzer! Plumbing · Air · Electric"
            width="160"
            height="106"
          />
        </Link>
        <nav
          aria-label="Main navigation"
          className={open ? "navigation open" : "navigation"}
        >
          <Link href="/plumbing" onClick={() => setOpen(false)}>
            Plumbing
          </Link>
          <Link href="/hvac" onClick={() => setOpen(false)}>
            Heating & air
          </Link>
          <Link href="/#why-wowzer" onClick={() => setOpen(false)}>
            Why Wowzer
          </Link>
          <Link href="/#service-area" onClick={() => setOpen(false)}>
            Service area
          </Link>
        </nav>
        <div className="header-actions">
          <a
            className="header-phone"
            href={`tel:+1${site.phone.replace(/\D/g, "")}`}
          >
            <Phone size={17} />
            <span>{site.phone}</span>
          </a>
          <BookButton className="small" />
          <button
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <button
        className="motion-toggle"
        onClick={() => {
          setPaused(!paused);
          localStorage.setItem("wowzer-motion", paused ? "running" : "paused");
        }}
        aria-label={paused ? "Play animations" : "Pause animations"}
        title={paused ? "Play animations" : "Pause animations"}
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
        <span>{paused ? "Play motion" : "Pause motion"}</span>
      </button>
    </>
  );
}
export function MotionScene({
  van,
  theme = "home",
  backdrop,
  alt = "The purple, orange and blue Wowzer service van",
}: {
  van: string;
  backdrop?: string;
  theme?: "home" | "water" | "air";
  alt?: string;
}) {
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scene.current;
    if (!el) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      if (
        document.documentElement.dataset.motion === "paused" ||
        !window.matchMedia("(pointer:fine)").matches
      )
        return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty(
          "--mx",
          `${((e.clientX - r.left) / r.width - 0.5) * 18}px`,
        );
        el.style.setProperty(
          "--my",
          `${((e.clientY - r.top) / r.height - 0.5) * 12}px`,
        );
      });
    };
    const reset = () => {
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, []);
  return (
    <div
      ref={scene}
      className={`motion-scene ${theme} ${backdrop ? "with-photo" : ""}`}
      aria-label="Wowzer service van"
    >
      <div className="scene-word" aria-hidden="true">
        WOW!
      </div>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      {backdrop ? (
        <div className="scene-photo">
          <Image
            sizes="(max-width: 600px) 90vw, 45vw"
            loading="eager"
            src={backdrop}
            alt="Illustrative South Florida suburban home with tropical landscaping"
            width={1536}
            height={1024}
            fetchPriority="high"
          />
        </div>
      ) : (
        <div className="sun-disc" aria-hidden="true">
          <div className="disc-inner" />
        </div>
      )}
      <div className="scene-spark spark-one" aria-hidden="true">
        <Plus />
      </div>
      <div className="scene-spark spark-two" aria-hidden="true">
        <Plus />
      </div>
      <div className="floating-label label-one">
        {theme === "water" ? <Droplets size={20} /> : <Wind size={20} />}
        <span>
          {theme === "water" ? "Keep life flowing." : "A breath of fresh air."}
        </span>
      </div>
      <div className="van-wrap">
        <img
          className="hero-van"
          src={van}
          alt={alt}
          width="800"
          height="380"
          fetchPriority="high"
        />
        <div className="van-shadow" />
      </div>
      <div className="floating-label label-two">
        <Check size={17} />
        <span>Service with a whole lotta Wow.</span>
      </div>
      <div className="road" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
export function MotionObserver() {
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
export function Scheduler({ site }: { site: SiteSettings }) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [allowedHost, setAllowedHost] = useState(false);
  useEffect(() => {
    setAllowedHost(window.location.hostname === "callwowzer.com");
  }, []);
  useEffect(() => {
    const timeout = setTimeout(
      () => setStatus((s) => (s === "loading" ? "error" : s)),
      15000,
    );
    return () => clearTimeout(timeout);
  }, []);
  if (!allowedHost)
    return (
      <div className="scheduler-control">
        <a className="button" href={site.bookingURL}>
          Book on our current website
          <ArrowUpRight size={20} />
        </a>
        <div className="booking-alternatives">
          <a href={`tel:+1${site.phone.replace(/\D/g, "")}`}>
            <Phone size={18} /> {site.phone}
          </a>
        </div>
        <p className="fine-print">
          Continue to Wowzer’s current website to request your appointment, or
          call our local team.
        </p>
      </div>
    );
  return (
    <div className="scheduler-control">
      <Script
        id="se-widget-embed"
        src="https://embed.scheduler.servicetitan.com/scheduler-v1.js"
        data-api-key={site.schedulerKey}
        data-schedulerid={site.schedulerID}
        strategy="afterInteractive"
        onReady={() => setStatus("ready")}
        onError={() => setStatus("error")}
      />
      {status === "loading" ? (
        <p role="status">Getting online scheduling ready…</p>
      ) : status === "error" ? (
        <p role="alert">
          Online scheduling could not load. Please call us or use the booking
          form on our current site.
        </p>
      ) : (
        <button
          className="button st-booking-show"
          onClick={() => {
            setTimeout(() => {
              if (!document.querySelector(".se-widget-iframe"))
                setStatus("error");
            }, 2000);
          }}
        >
          Open appointment scheduler
          <ArrowUpRight size={20} />
        </button>
      )}
      <div className="booking-alternatives">
        <a href={`tel:+1${site.phone.replace(/\D/g, "")}`}>
          <Phone size={18} /> {site.phone}
        </a>
        <a href={site.bookingURL}>
          Use the contact form <ArrowUpRight size={16} />
        </a>
      </div>
      <p className="fine-print">
        Choose an available appointment in our secure ServiceTitan scheduler.
        For urgent service, call our team.
      </p>
    </div>
  );
}
