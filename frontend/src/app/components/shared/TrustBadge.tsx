import { Shield, CheckCircle, Lock, FileCheck } from "lucide-react";
import { cn } from "../ui/utils";

interface TrustBadgeProps {
  icon?: "shield" | "check" | "lock" | "file";
  text: string;
  className?: string;
}

export function TrustBadge({ icon = "shield", text, className }: TrustBadgeProps) {
  const icons = {
    shield: Shield,
    check: CheckCircle,
    lock: Lock,
    file: FileCheck,
  };

  const Icon = icons[icon];

  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <Icon className="w-4 h-4 text-[--color-security-green]" />
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}
