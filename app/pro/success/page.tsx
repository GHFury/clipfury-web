import Link from "next/link";

export default function ProSuccessPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#080808", color: "white", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .glow { background: linear-gradient(135deg, #fff, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        @keyframes pulse { 0%,100%{box-shadow:0 0 30px rgba(124,58,237,0.4);} 50%{box-shadow:0 0 60px rgba(124,58,237,0.7);} }
      `}</style>

      <div className="fade-up" style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
        {/* Success icon */}
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(52,211,153,0.1)", border: "2px solid rgba(52,211,153,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", animation: "pulse 2s infinite", fontSize: "2rem" }}>
          ✓
        </div>

        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", letterSpacing: 4, marginBottom: 8 }} className="glow">
          WELCOME TO PRO
        </div>

        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", lineHeight: 1.7, marginBottom: 32 }}>
          Your license key is on its way to your inbox. Check your email and follow the instructions to activate ClipFury Pro.
        </p>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "20px 24px", marginBottom: 32, textAlign: "left" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: 2, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 12 }}>Next Steps</div>
          {[
            "Check your email for your license key",
            "Open ClipFury → right-click tray icon → Settings",
            "Go to the Pro tab and paste your key",
            "Hit Activate — Pro unlocks immediately",
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.7rem", color: "#a78bfa", fontWeight: 700 }}>
                {i + 1}
              </div>
              <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{step}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://github.com/GHFury/clipfury/releases/latest" style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "white", padding: "12px 28px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "0.875rem", letterSpacing: 0.5 }}>
            Download ClipFury
          </a>
          <Link href="/" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", padding: "12px 24px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "0.875rem", border: "1px solid rgba(255,255,255,0.1)" }}>
            Back to Home
          </Link>
        </div>

        <p style={{ marginTop: 24, fontSize: "0.78rem", color: "rgba(255,255,255,0.2)" }}>
          Didn't get the email? Check spam or contact{" "}
          <a href="mailto:m.snapfury@gmail.com" style={{ color: "#a78bfa" }}>m.snapfury@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
