export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-screen items-center justify-center"
    >
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-accent-cyan" />
    </div>
  );
}
