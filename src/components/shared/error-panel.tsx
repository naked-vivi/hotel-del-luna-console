function ErrorPanel({ children }: ErrorPanelProps) {
  return <div className="flex min-h-128 flex-col border border-border bg-card px-6 py-24">{children}</div>;
}

export default ErrorPanel;
