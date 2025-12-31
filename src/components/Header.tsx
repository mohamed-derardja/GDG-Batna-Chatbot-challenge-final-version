import { ExternalLink } from "lucide-react";

function GDGLogo() {
  return (
    <div className="relative w-10 h-10">
      {/* Outer ring with gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-google-blue via-google-red to-google-green p-0.5">
        <div className="w-full h-full rounded-[10px] bg-background flex items-center justify-center">
          {/* Inner G logo */}
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
            {/* Google G shape */}
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
              className="fill-google-blue"
            />
            <path
              d="M12 2c5.52 0 10 4.48 10 10 0 1.82-.49 3.53-1.34 5L12 12V2z"
              className="fill-google-red"
            />
            <path
              d="M12 12l8.66 5A9.953 9.953 0 0112 22c-5.52 0-10-4.48-10-10 0-1.82.49-3.53 1.34-5L12 12z"
              className="fill-google-yellow"
            />
            <path
              d="M3.34 7A9.953 9.953 0 0112 2v10L3.34 7z"
              className="fill-google-green"
            />
            {/* Center white circle */}
            <circle cx="12" cy="12" r="4" className="fill-background" />
            {/* G letter cutout */}
            <path
              d="M12 8v4h4c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4z"
              className="fill-google-blue"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GDGLogo />
          <div>
            <h1 className="font-semibold text-foreground leading-tight text-lg">GDG Batna</h1>
            <p className="text-xs text-muted-foreground">AI Assistant</p>
          </div>
        </div>
        
        <a
          href="https://www.gdgbatna.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Visit Website
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
}
