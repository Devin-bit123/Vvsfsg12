import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-paper text-ink px-6 text-center">
      <h1 className="font-display text-8xl text-ink">404</h1>
      <p className="font-mono text-xs text-mute uppercase tracking-wider">
        Not Found
      </p>
      <Link href="/" className="font-mono text-xs text-vermilion">
        ← home
      </Link>
    </div>
  );
}
