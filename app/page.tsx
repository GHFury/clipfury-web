"use client";

import { useState, useEffect, useRef } from "react";

const GITHUB_URL = "https://github.com/GHFury/clipfury/releases/latest/download/ClipFury-Setup-0.1.1-beta.exe";

const FREE_FEATURES = [
  "Automatic moment detection",
  "Unlimited local clip saves",
  "1 active game profile",
  "720p capture quality",
  "System tray — runs silently",
  "Manual upload to any platform",
];

const PRO_FEATURES = [
  "Everything in Free",
  "1080p / 4K capture quality",
  "All current & future game profiles",
  "Auto-upload to YouTube & TikTok",
  "Clip trimming and highlight reels",
  "Scheduled and batch uploads",
  "Custom profile builder",
  "Publish & sell profiles to the community",
  "Early access to new features",
  "Priority support",
];

const STEPS = [
  {
    n: "01",
    title: "Install ClipFury",
    desc: "Download and run the installer. ClipFury lives in your system tray — invisible while you play.",
    animType: "download",
  },
  {
    n: "02",
    title: "Pick your game",
    desc: "Select a game profile. Each profile knows what a moment looks like for that title.",
    animType: "profile",
  },
  {
    n: "03",
    title: "Calibrate once",
    desc: "One-time 30-second setup. ClipFury learns your screen and starts watching for moments.",
    animType: "calibrate",
  },
  {
    n: "04",
    title: "Press Start",
    desc: "Play normally. Every key moment captured automatically. Review, upload, or keep locally.",
    animType: "start",
  },
];

const PROFILES = [
  {
    game: "Marvel Snap",
    status: "available",
    desc: "Detects every snap via click detection. Captures the full play sequence automatically. Steam compatible.",
    method: "Click Detection",
    color: "#7C3AED",
    glow: "rgba(124,58,237,0.4)",
  },
  {
    game: "Call of Duty",
    status: "coming-soon",
    desc: "Kill streak and killcam detection. Never miss a multi-kill, nuke, or clutch warzone moment.",
    method: "Region Detection",
    color: "#16A34A",
    glow: "rgba(22,163,74,0.3)",
  },
  {
    game: "GTA Online",
    status: "coming-soon",
    desc: "Heist, race, and action moment detection. Capture your best GTA Online plays automatically.",
    method: "Region Detection",
    color: "#DC2626",
    glow: "rgba(220,38,38,0.3)",
  },
  {
    game: "Fortnite",
    status: "coming-soon",
    desc: "Kill feed monitoring and Victory Royale detection. Every elimination and clutch captured.",
    method: "Region Detection",
    color: "#2563EB",
    glow: "rgba(37,99,235,0.3)",
  },
  {
    game: "Marathon",
    status: "coming-soon",
    desc: "Bungie's new extraction shooter. Moment profiles ready at launch — day one support planned.",
    method: "Audio + Region",
    color: "#0891B2",
    glow: "rgba(8,145,178,0.3)",
  },
  {
    game: "Arc Raiders",
    status: "coming-soon",
    desc: "PvEvP extraction moments, boss kills, and squad wipes. Built for the Arc Raiders community.",
    method: "Region Detection",
    color: "#D97706",
    glow: "rgba(217,119,6,0.3)",
  },
  {
    game: "Your Game",
    status: "build-it",
    desc: "Build a custom profile for any game. Define your own moments and share with the community.",
    method: "Custom (Pro)",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.3)",
  },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeroVisible(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#080808", color: "white", overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* Noise texture overlay */
        body::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .glow-text {
          background: linear-gradient(135deg, #fff 0%, #a78bfa 50%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glow-text-gold {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #7c3aed, #6d28d9);
          color: white;
          border: none;
          padding: 16px 36px;
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 0 40px rgba(124,58,237,0.4), 0 4px 20px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 60px rgba(124,58,237,0.6), 0 8px 30px rgba(0,0,0,0.4); }
        .btn-primary:hover::before { opacity: 1; }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 15px 28px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-secondary:hover { border-color: rgba(255,255,255,0.4); color: white; background: rgba(255,255,255,0.05); }

        .section-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #7c3aed;
          margin-bottom: 16px;
        }

        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          transition: all 0.3s;
        }
        .card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(124,58,237,0.3);
          transform: translateY(-4px);
        }

        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Animated gradient border */
        .gradient-border {
          position: relative;
          border-radius: 12px;
          padding: 1px;
          background: linear-gradient(135deg, #7c3aed, #2563eb, #7c3aed);
          background-size: 200% 200%;
          animation: gradientShift 4s ease infinite;
        }
        .gradient-border-inner {
          background: #0e0e0e;
          border-radius: 11px;
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(124,58,237,0.3); }
          50%       { box-shadow: 0 0 60px rgba(124,58,237,0.6); }
        }
        @keyframes scan-line {
          0%   { top: -2px; }
          100% { top: 100%; }
        }

        .floating { animation: float 6s ease-in-out infinite; }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }

        /* Nav */
        .nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 20px 60px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.3s;
        }
        .nav.scrolled {
          background: rgba(8,8,8,0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 14px 60px;
        }

        .nav-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 3px;
          background: linear-gradient(135deg, #fff, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
        }

        .nav-links { display: flex; gap: 36px; align-items: center; }
        .nav-link {
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.3px;
          transition: color 0.2s;
        }
        .nav-link:hover { color: white; }

        /* Divider */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(37,99,235,0.4), transparent);
          margin: 0 60px;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 2px; }


        /* ── MOBILE RESPONSIVE ─────────────────────────────── */
        @media (max-width: 768px) {
          .nav { padding: 14px 20px !important; }
          .nav.scrolled { padding: 10px 20px !important; }
          .nav-links { display: none !important; }

          /* Hero */
          section:first-of-type { padding: 100px 20px 60px !important; }
          h1 { font-size: clamp(3rem, 16vw, 5rem) !important; }

          /* Terminal card */
          .floating { margin-top: 48px !important; }

          /* How it works */
          #how-it-works { padding: 80px 20px !important; }
          #how-it-works > div > div:last-child {
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }

          /* Profiles */
          #profiles { padding: 80px 20px !important; }
          #profiles > div > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }

          /* Pricing */
          #pricing { padding: 80px 20px !important; }
          #pricing > div > div:last-child {
            grid-template-columns: 1fr !important;
          }

          /* Story */
          #story { padding: 80px 20px !important; }

          /* Contact */
          #contact { padding: 80px 20px !important; }
          #contact > div:last-child {
            grid-template-columns: 1fr !important;
          }

          /* Final CTA */
          section:last-of-type { padding: 80px 20px !important; }

          /* Footer */
          footer { padding: 40px 20px 28px !important; }
          footer > div > div:first-child {
            flex-direction: column !important;
            gap: 32px !important;
          }
          footer > div > div:first-child > div:last-child {
            flex-direction: column !important;
            gap: 28px !important;
          }

          /* Discord banner */
          .divider + div { padding: 14px 20px !important; text-align: center; }

          /* Buttons stack on mobile */
          .btn-primary, .btn-secondary { padding: 14px 24px !important; font-size: 0.95rem !important; }
        }

        @media (max-width: 480px) {
          h1 { font-size: clamp(2.5rem, 18vw, 4rem) !important; }
          #how-it-works > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          .step-anim-wrap { width: 64px !important; height: 64px !important; }
        }

      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrollY > 50 ? "scrolled" : ""}`}>
        <a href="/" className="nav-logo">CLIPFURY</a>
        <div className="nav-links">
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#profiles" className="nav-link">Game Profiles</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#story" className="nav-link">Our Story</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <a href={GITHUB_URL} className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.9rem" }}>
          ⬇ Download Free
        </a>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "clamp(100px,12vw,120px) clamp(20px,5vw,60px) 80px", overflow: "hidden" }}>

        {/* Background radial glow */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 800, height: 800, background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", left: "20%", width: 400, height: 400, background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 2, opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(40px)", transition: "opacity 1s ease, transform 1s ease" }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", boxShadow: "0 0 8px #7c3aed", animation: "pulse-glow 2s infinite" }} />
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", letterSpacing: 1 }}>NOW IN BETA · FREE TO DOWNLOAD</span>
          </div>

          {/* Main headline */}
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem, 12vw, 9rem)", letterSpacing: "4px", lineHeight: 0.9, marginBottom: 32 }}>
            <span className="glow-text" style={{ display: "block" }}>NEVER MISS</span>
            <span style={{ display: "block", color: "white" }}>THE MOMENT</span>
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 48px", fontWeight: 400 }}>
            ClipFury detects key moments in your gameplay and captures them automatically. No manual recording. No missed clips. Just your best moments, ready to share.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={GITHUB_URL} className="btn-primary">
              ⬇ Download for Windows — Free
            </a>
            <a href="#how-it-works" className="btn-secondary">
              See how it works →
            </a>
          </div>

          <div style={{ marginTop: 20, fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>
            Windows 10+ · No account required to start
          </div>

          {/* Floating terminal card */}
          <div className="floating gradient-border" style={{ marginTop: 80, maxWidth: 560, margin: "80px auto 0", textAlign: "left" }}>
            <div className="gradient-border-inner" style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                  <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                ))}
                <span style={{ marginLeft: 8, fontSize: "0.75rem", color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>clipfury — moment detection</span>
              </div>
              {[
                { text: "● Monitoring active — Marvel Snap", color: "#a78bfa", delay: "0s" },
                { text: "● Snap button click detected at (1280, 960)", color: "rgba(255,255,255,0.5)", delay: "0.3s" },
                { text: "● Capturing last 90 seconds...", color: "#60a5fa", delay: "0.6s" },
                { text: "● Clip saved → ClipFury_2025-04-24.mp4", color: "#34d399", delay: "0.9s" },
                { text: "● Auto-uploading to YouTube...", color: "#fbbf24", delay: "1.2s" },
                { text: "● Done. Clip live in 3 seconds.", color: "#34d399", delay: "1.5s" },
              ].map((line, i) => (
                <div key={i} style={{ fontFamily: "monospace", fontSize: "0.8rem", color: line.color, marginBottom: 8, opacity: 0, animation: `fadeIn 0.5s ease ${line.delay} forwards` }}>
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>

      <div className="divider" />

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section id="how-it-works" style={{ padding: "clamp(60px,8vw,120px) clamp(20px,5vw,60px)", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-label">HOW IT WORKS</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: 2, lineHeight: 1 }}>
            FOUR STEPS.<br />
            <span className="glow-text">INFINITE CLIPS.</span>
          </h2>
        </div>

        <style>{`
          @keyframes downloadPulse {
            0%,100% { transform: translateY(0); opacity:1; }
            50% { transform: translateY(6px); opacity:0.6; }
          }
          @keyframes profileCycle {
            0%,20% { content: ""; }
          }
          @keyframes scanBar {
            0%   { width: 0%; opacity: 1; }
            80%  { width: 100%; opacity: 1; }
            100% { width: 100%; opacity: 0; }
          }
          @keyframes scanBar2 {
            0%,30%  { width: 0%; opacity: 0; }
            50%     { opacity: 1; }
            100%    { width: 70%; opacity: 1; }
          }
          @keyframes scanBar3 {
            0%,50%  { width: 0%; opacity: 0; }
            70%     { opacity: 1; }
            100%    { width: 45%; opacity: 1; }
          }
          @keyframes blink {
            0%,100% { opacity: 1; }
            50%     { opacity: 0; }
          }
          @keyframes insertCoin {
            0%,60%,100% { transform: translateY(0); opacity:1; }
            80%          { transform: translateY(8px); opacity:0; }
          }
          @keyframes pressStart {
            0%,100% { opacity: 1; }
            50%     { opacity: 0; }
          }
          @keyframes matrixRain {
            0%   { transform: translateY(-100%); opacity:1; }
            100% { transform: translateY(100%); opacity:0; }
          }
          .step-anim-wrap { width: 80px; height: 80px; margin: 0 auto 20px; position: relative; display: flex; align-items: center; justify-content: center; }
        `}</style>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, position: "relative" }}>
          <div style={{ position: "absolute", top: 56, left: "12%", right: "12%", height: 1, background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(37,99,235,0.4), transparent)", zIndex: 0 }} />

          {STEPS.map((step, i) => (
            <div key={i} className="card" style={{ padding: "32px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>

              {/* Animated icon */}
              <div className="step-anim-wrap">
                {step.animType === "download" && (
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2 }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ animation: "downloadPulse 1.8s ease-in-out infinite" }}>
                      <path d="M14 4v14M7 12l7 7 7-7" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 22h20" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <div style={{ width: 32, height: 2, background: "rgba(124,58,237,0.3)", borderRadius: 1 }} />
                  </div>
                )}
                {step.animType === "profile" && (
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 40 }}>
                      {["Marvel Snap", "Fortnite", "Call of Duty"].map((g, gi) => (
                        <div key={gi} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: gi === 0 ? "#a78bfa" : "rgba(255,255,255,0.15)", transition: "background 0.3s", flexShrink: 0, boxShadow: gi === 0 ? "0 0 6px #7c3aed" : "none" }} />
                          <div style={{ height: 3, borderRadius: 2, background: gi === 0 ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.08)", flex: 1 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {step.animType === "calibrate" && (
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <div style={{ width: 52, display: "flex", flexDirection: "column", gap: 5 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: "0.45rem", color: "#a78bfa", fontFamily: "monospace", whiteSpace: "nowrap" }}>SCAN</span>
                        <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "linear-gradient(90deg,#7c3aed,#a78bfa)", borderRadius: 2, animation: "scanBar 2s ease-in-out infinite" }} />
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: "0.45rem", color: "#60a5fa", fontFamily: "monospace", whiteSpace: "nowrap" }}>DATA</span>
                        <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "linear-gradient(90deg,#2563eb,#60a5fa)", borderRadius: 2, animation: "scanBar2 2s ease-in-out infinite" }} />
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: "0.45rem", color: "#34d399", fontFamily: "monospace", whiteSpace: "nowrap" }}>LOCK</span>
                        <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", background: "linear-gradient(90deg,#059669,#34d399)", borderRadius: 2, animation: "scanBar3 2s ease-in-out infinite" }} />
                        </div>
                      </div>
                      <div style={{ textAlign: "center", fontSize: "0.4rem", color: "#34d399", fontFamily: "monospace", animation: "blink 1s infinite", letterSpacing: 1 }}>CALIBRATED</div>
                    </div>
                  </div>
                )}
                {step.animType === "start" && (
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4 }}>
                    <div style={{ fontSize: "0.55rem", fontFamily: "monospace", color: "#a78bfa", letterSpacing: 2, animation: "pressStart 1.2s ease-in-out infinite", textAlign: "center", lineHeight: 1.4 }}>
                      PRESS<br />START
                    </div>
                    <div style={{ display: "flex", gap: 3 }}>
                      {[0, 1, 2].map(d => (
                        <div key={d} style={{ width: 4, height: 4, borderRadius: "50%", background: "#7c3aed", animation: `blink 1.2s ease-in-out ${d * 0.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: "rgba(124,58,237,0.2)", letterSpacing: 2, lineHeight: 1, marginBottom: 8 }}>{step.n}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 12, letterSpacing: 0.5 }}>{step.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DISCORD BANNER */}
      <div style={{ background: "rgba(88,101,242,0.08)", borderTop: "1px solid rgba(88,101,242,0.15)", borderBottom: "1px solid rgba(88,101,242,0.15)", padding: "14px 60px", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
        <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
          Still have questions after reading? Join the ClipFury community on Discord —
        </span>
        <a href="https://discord.gg/snapfury" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: "0.85rem", color: "#818cf8", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid rgba(129,140,248,0.3)", paddingBottom: 1 }}
          onMouseEnter={e => (e.currentTarget.style.color = "#a5b4fc")}
          onMouseLeave={e => (e.currentTarget.style.color = "#818cf8")}>
          discord.gg/snapfury →
        </a>
      </div>

      <div className="divider" />

      {/* ── GAME PROFILES ─────────────────────────────────────── */}
      <section id="profiles" style={{ padding: "clamp(60px,8vw,120px) clamp(20px,5vw,60px)", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-label">GAME PROFILES</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: 2, lineHeight: 1 }}>
            BUILT FOR YOUR GAME.<br />
            <span className="glow-text">EXPANDING FAST.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: 500, margin: "20px auto 0", lineHeight: 1.7 }}>
            Each game profile defines exactly what a "moment" looks like for that title. Install once, works across every supported game.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {PROFILES.map((profile, i) => (
            <div key={i} className="card" style={{ padding: "28px", position: "relative", overflow: "hidden" }}>
              {/* Glow effect */}
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: profile.glow, filter: "blur(40px)", pointerEvents: "none" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, position: "relative" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{profile.game}</h3>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
                  padding: "4px 10px", borderRadius: 100,
                  background: profile.status === "available" ? "rgba(52,211,153,0.12)" : profile.status === "build-it" ? "rgba(217,119,6,0.12)" : "rgba(255,255,255,0.06)",
                  color: profile.status === "available" ? "#34d399" : profile.status === "build-it" ? "#fbbf24" : "rgba(255,255,255,0.35)",
                  border: `1px solid ${profile.status === "available" ? "rgba(52,211,153,0.2)" : profile.status === "build-it" ? "rgba(217,119,6,0.2)" : "rgba(255,255,255,0.1)"}`,
                }}>
                  {profile.status === "available" ? "Available" : profile.status === "build-it" ? "Pro" : "Soon"}
                </span>
              </div>

              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20, position: "relative" }}>{profile.desc}</p>

              <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: profile.color, boxShadow: `0 0 8px ${profile.color}` }} />
                <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>{profile.method}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Steam + platform callout */}
        <div style={{ marginTop: 48, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "12px 20px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#a78bfa"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-1 3v6l5 3-1 1.732-6-3.464V7h2z" /></svg>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>Steam compatible — works with Steam games on Windows</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "12px 20px" }}>
            <span style={{ fontSize: "1rem" }}>🍎</span>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>macOS & iOS — coming soon</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "12px 20px" }}>
            <span style={{ fontSize: "1rem" }}>🎮</span>
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>More profiles added every month</span>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "0.8rem", marginTop: 24 }}>
          Pro users can build and publish custom profiles for any game. Community marketplace coming with Pro launch.
        </p>
      </section>

      <div className="divider" />

      {/* ── PRICING ───────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: "clamp(60px,8vw,120px) clamp(20px,5vw,60px)", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div className="section-label">PRICING</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: 2, lineHeight: 1 }}>
            START FREE.<br />
            <span className="glow-text">GO PRO WHEN YOU'RE READY.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {/* Free */}
          <div className="card" style={{ padding: "40px" }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 12 }}>Free Forever</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4rem", letterSpacing: 2, lineHeight: 1 }}>$0</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.875rem", marginTop: 8 }}>No account needed to start</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
              {FREE_FEATURES.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "0.6rem", color: "#34d399" }}>✓</span>
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>{f}</span>
                </div>
              ))}
            </div>
            <a href={GITHUB_URL} className="btn-secondary" style={{ width: "100%", justifyContent: "center" }}>
              Download Free
            </a>
          </div>

          {/* Pro */}
          <div style={{ position: "relative" }} className="gradient-border">
            <div className="gradient-border-inner" style={{ padding: "40px" }}>
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #7c3aed, #6d28d9)", padding: "4px 16px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700, letterSpacing: 1, whiteSpace: "nowrap" }}>
                MOST POPULAR
              </div>
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: 2, color: "#a78bfa", textTransform: "uppercase", marginBottom: 12 }}>ClipFury Pro</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4rem", letterSpacing: 2, lineHeight: 1 }}>$9</div>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.875rem" }}>/month</div>
                </div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.875rem", marginTop: 8 }}>or $79/year — save 27%</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                {PRO_FEATURES.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: "0.6rem", color: "#a78bfa" }}>✓</span>
                    </div>
                    <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", fontWeight: f === "All free features" ? 600 : 400 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center", cursor: "not-allowed", opacity: 0.7 }}>
                Coming Soon — Join Waitlist
              </button>
              <div style={{ textAlign: "center", marginTop: 12, fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}>
                Early adopters get 3 months free when Pro launches
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── ORIGIN STORY ──────────────────────────────────────── */}
      <section id="story" style={{ padding: "clamp(60px,8vw,120px) clamp(20px,5vw,60px)", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div className="section-label">OUR STORY</div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: 2, lineHeight: 1, marginBottom: 32 }}>
          BUILT FOR MARVEL SNAP.<br />
          <span className="glow-text">DESIGNED FOR EVERYONE.</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.05rem", lineHeight: 1.9, maxWidth: 680, margin: "0 auto 24px" }}>
          ClipFury started as a simple problem: Marvel Snap has incredible gameplay moments that disappear the second they happen. We built a tool to capture them automatically — and realized the same problem exists in every game.
        </p>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.95rem", lineHeight: 1.9, maxWidth: 620, margin: "0 auto 48px" }}>
          The Marvel Snap profile is where it began. Fortnite, Valorant, Rocket League, and dozens more are where it's going. Every game has moments worth capturing. ClipFury makes sure you never miss one.
        </p>

        {/* SnapFury callout */}
        <div style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)", borderRadius: 12, padding: "32px 40px", maxWidth: 580, margin: "0 auto" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: 3, color: "#7c3aed", marginBottom: 12 }}>MARVEL SNAP COMMUNITY</div>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 12 }}>SnapFury — The Snap Clip Community</h3>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: 20 }}>
            Share your best snaps, discover incredible plays, and compete for Snap of the Week. The community hub built alongside ClipFury for Marvel Snap creators.
          </p>
          <a href="https://snapfury.com" className="btn-secondary" style={{ fontSize: "0.875rem", padding: "10px 20px" }}>
            Visit SnapFury →
          </a>
        </div>
      </section>

      <div className="divider" />

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section style={{ padding: "clamp(60px,8vw,120px) clamp(20px,5vw,60px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 8vw, 6rem)", letterSpacing: 3, lineHeight: 0.95, marginBottom: 32 }}>
            YOUR NEXT CLIP<br />
            <span className="glow-text">IS ALREADY HAPPENING.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.1rem", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.7 }}>
            Stop missing moments. Download ClipFury free and start capturing automatically today.
          </p>
          <a href={GITHUB_URL} className="btn-primary" style={{ fontSize: "1.2rem", padding: "18px 48px" }}>
            ⬇ Download ClipFury Free
          </a>
          <div style={{ marginTop: 16, fontSize: "0.8rem", color: "rgba(255,255,255,0.2)" }}>
            Windows 10+ · 97MB · No account required
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{ padding: "clamp(60px,8vw,100px) clamp(20px,5vw,60px)", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <div className="section-label">CONTACT</div>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: 2, lineHeight: 1, marginBottom: 16 }}>
          GET IN TOUCH
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 48px" }}>
          Questions about ClipFury, feedback, partnership ideas, or just want to talk gaming? Reach out — we actually respond.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, maxWidth: 640, margin: "0 auto" }}>
          {[
            {
              label: "Discord",
              sub: "Join the community",
              href: "https://discord.gg/snapfury",
              color: "#5865F2",
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#5865F2">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
              )
            },
            {
              label: "Twitter / X",
              sub: "Follow updates",
              href: "https://x.com/M_SnapFury",
              color: "#ffffff",
              icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              )
            },
            {
              label: "Email",
              sub: "Direct message",
              href: "mailto:m.snapfury@gmail.com",
              color: "#34d399",
              icon: (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              )
            },
          ].map((item, i) => (
            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = item.color; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "24px 16px", textAlign: "center", transition: "all 0.2s", cursor: "pointer" }}>
                <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>{item.icon}</div>
                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "white", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>{item.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* FOOTER */}
      <footer style={{ padding: "clamp(32px,5vw,48px) clamp(20px,5vw,60px) clamp(24px,4vw,36px)", maxWidth: "100%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Top row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap", gap: 32, flexDirection: "row" }}>

            {/* Brand */}
            <div style={{ maxWidth: 280 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: 4, background: "linear-gradient(135deg, #fff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 10 }}>CLIPFURY</div>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.7 }}>
                Automatic moment detection for gaming content creators. Never miss a clip.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {[
                  { href: "https://discord.gg/snapfury", color: "#5865F2", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#5865F2"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg> },
                  { href: "https://x.com/M_SnapFury", color: "#ffffff", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
                  { href: "https://youtube.com/@fury-msnap", color: "#FF0000", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg> },
                  { href: "https://github.com/GHFury/clipfury", color: "#ffffff", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg> },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", textDecoration: "none" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `rgba(255,255,255,0.1)`; (e.currentTarget as HTMLElement).style.borderColor = s.color; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 16 }}>Product</div>
                {[["How It Works", "#how-it-works"], ["Game Profiles", "#profiles"], ["Pricing", "#pricing"], ["Download", GITHUB_URL]].map(([l, h]) => (
                  <a key={l} href={h} style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>{l}</a>
                ))}
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 16 }}>Community</div>
                {[["SnapFury", "https://snapfury.com"], ["Discord", "https://discord.gg/snapfury"], ["YouTube", "https://youtube.com/@fury-msnap"], ["Twitter / X", "https://x.com/M_SnapFury"]].map(([l, h]) => (
                  <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>{l}</a>
                ))}
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 16 }}>Contact</div>
                {[["Email Us", "mailto:m.snapfury@gmail.com"], ["GitHub", "https://github.com/GHFury/clipfury"], ["Report a Bug", "https://github.com/GHFury/clipfury/issues"]].map(([l, h]) => (
                  <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "white")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>{l}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.2)" }}>
              © 2025 ClipFury · Not affiliated with any game publisher or studio
            </div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.15)" }}>
              v0.1.0-beta · Windows 10+
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
