export default function ReaderLoading({
  failed = false,
}: {
  failed?: boolean;
  title?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] px-6 text-center bg-paper text-ink">
      {failed ? (
        <>
          <p className="font-display text-lg text-ink mb-2">File not found</p>
          <p className="font-mono text-xs text-mute">
            EPUB file missing in /public/books/
          </p>
        </>
      ) : (
        <>
          <div className="flex gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-ink breathe" />
            <span className="w-2 h-2 rounded-full bg-ink breathe [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-ink breathe [animation-delay:0.4s]" />
          </div>
          <p className="font-mono text-xs text-mute">Loading</p>
        </>
      )}
    </div>
  );
}
