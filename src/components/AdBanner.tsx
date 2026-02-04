interface AdBannerProps {
  size?: 'small' | 'large';
}

export function AdBanner({ size = 'small' }: AdBannerProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/50 ${
        size === 'large' ? 'h-32' : 'h-24'
      }`}
    >
      <div className="text-center">
        <p className="text-xs font-medium text-muted-foreground">Espaço Publicitário</p>
        <p className="text-[10px] text-muted-foreground/70">728 x {size === 'large' ? '128' : '96'}</p>
      </div>
    </div>
  );
}
