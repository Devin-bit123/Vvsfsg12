export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <div className="flex gap-2">
        <span className="w-2 h-2 rounded-full bg-ink breathe" />
        <span className="w-2 h-2 rounded-full bg-ink breathe [animation-delay:0.2s]" />
        <span className="w-2 h-2 rounded-full bg-ink breathe [animation-delay:0.4s]" />
      </div>
    </div>
  );
}
