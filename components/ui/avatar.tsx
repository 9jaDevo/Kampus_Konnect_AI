import Image from "next/image";
import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: number;
  className?: string;
}

export function Avatar({ src, name, size = 40, className }: AvatarProps) {
  const initials = getInitials(name);
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden",
        "bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-cyan-500/30",
        "border border-white/10 text-white font-medium",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-label={name}
    >
      {src ? (
        <Image src={src} alt={name} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <span className="font-display">{initials}</span>
      )}
    </div>
  );
}

interface AvatarStackProps {
  names: string[];
  size?: number;
  max?: number;
  className?: string;
}

export function AvatarStack({ names, size = 36, max = 4, className }: AvatarStackProps) {
  const visible = names.slice(0, max);
  const overflow = names.length - visible.length;
  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((n, i) => (
        <div
          key={`${n}-${i}`}
          className="rounded-full"
          style={{ marginLeft: i === 0 ? 0 : -size * 0.32, zIndex: visible.length - i }}
        >
          <Avatar name={n} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="relative inline-flex items-center justify-center rounded-full bg-white/[0.06] border border-white/10 text-white text-xs font-medium"
          style={{
            width: size,
            height: size,
            marginLeft: -size * 0.32,
            fontSize: size * 0.32,
          }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
