function CardEmptyState({ drawing, title, message }: CardEmptyStateProps) {
  return (
    <div className="my-auto flex flex-col items-center gap-7 py-6 text-center">
      {drawing}
      <div className="space-y-2">
        <p className="text-xl font-extralight text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default CardEmptyState;
