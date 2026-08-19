import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F4F4F0",
        "paper-warm": "#E8E6E0",
        rule: "#1A1A1A",
        ink: "#1A1A1A",
        slate: "#4A5568",
        vermilion: "#C2410C",
        mute: "#9CA3AF",
      },
      fontFamily: {
        display: ['"Fraunces"', '"Source Han Serif SC"', '"Noto Serif SC"', "Georgia", "serif"],
        sans: ['"Inter"', '"Noto Sans SC"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', '"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        prose: "42rem",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            color: "#1A1A1A",
            backgroundColor: "transparent",
            maxWidth: "42rem",
            lineHeight: "1.75",
            a: {
              color: "#C2410C",
              textDecoration: "none",
              borderBottom: "1px solid rgba(194, 65, 12, 0.35)",
              transition: "border-color 0.2s ease",
            },
            "a:hover": {
              borderBottomColor: "#C2410C",
            },
            h1: { color: "#1A1A1A", fontWeight: "600", letterSpacing: "0.01em" },
            h2: { color: "#1A1A1A", fontWeight: "600", letterSpacing: "0.01em" },
            h3: { color: "#1A1A1A", fontWeight: "600" },
            h4: { color: "#1A1A1A", fontWeight: "600" },
            strong: { color: "#1A1A1A", fontWeight: "600" },
            blockquote: {
              color: "#4A5568",
              fontStyle: "italic",
              borderLeftColor: "#C2410C",
              borderLeftWidth: "2px",
              paddingLeft: "1.5rem",
            },
            "blockquote p::before": { content: '""' },
            "blockquote p::after": { content: '""' },
            code: {
              color: "#1A1A1A",
              backgroundColor: "#E8E6E0",
              padding: "0.15em 0.35em",
              borderRadius: "0.25rem",
              fontWeight: "400",
              fontFamily: '"Space Mono", "JetBrains Mono", ui-monospace, monospace',
              fontSize: "0.85em",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            ul: { listStyleType: "disc" },
            ol: { listStyleType: "decimal" },
            "ul li::marker": { color: "#C2410C" },
            "ol li::marker": { color: "#C2410C" },
            hr: { borderColor: "#1A1A1A" },
            sup: { color: "#C2410C", fontSize: "0.75em", verticalAlign: "super", lineHeight: "0" },
            "section.footnotes": {
              color: "#4A5568",
              fontSize: "0.85em",
              borderTop: "1px solid #1A1A1A",
              marginTop: "2.5rem",
              paddingTop: "1rem",
            },
            "section.footnotes ol": { listStyleType: "decimal" },
            "section.footnotes li": { marginTop: "0.5rem", color: "#4A5568" },
            "section.footnotes a": { color: "#C2410C", borderBottom: "none" },
            "section.footnotes li::marker": { color: "#C2410C" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
