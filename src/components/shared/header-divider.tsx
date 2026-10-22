function HeaderDivider({ className }: HeaderDividerProps) {
    return <span aria-hidden="true" className={`h-9 w-px shrink-0 bg-border ${className}`} />;
}

export default HeaderDivider;
