import { LOADING_DOT_DELAYS } from "@/lib/constants";

function LoadingDots({ label }: LoadingDotsProps) {
  return (
    <span role="status" className="flex items-center justify-center gap-1">
      <span className="sr-only">{label}</span>
      {LOADING_DOT_DELAYS.map((delay) => (
        <span key={delay} aria-hidden="true" className="loading-dot size-1 bg-current" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </span>
  );
}

export default LoadingDots;
