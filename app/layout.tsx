import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ClipFury — Automatic Game Clip Capture",
  description: "Never miss a moment. ClipFury detects key gaming events and captures clips automatically. Built for content creators.",
  openGraph: {
    title: "ClipFury — Automatic Game Clip Capture",
    description: "Never miss a moment. ClipFury detects key gaming events and captures clips automatically.",
    type: "website",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#080808", color: "white" }}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9KLCGY2GM9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9KLCGY2GM9');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
