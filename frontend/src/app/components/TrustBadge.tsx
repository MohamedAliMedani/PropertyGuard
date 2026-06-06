import { Shield, Lock, CheckCircle, Award } from "lucide-react";

interface TrustBadgeProps {
  type: "secure" | "verified" | "protected" | "certified";
  label: string;
}

export function TrustBadge({ type, label }: TrustBadgeProps) {
  const icons = {
    secure: Lock,
    verified: CheckCircle,
    protected: Shield,
    certified: Award,
  };

  const Icon = icons[type];

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg">
      <Icon className="w-4 h-4 text-[#059669]" />
      <span className="text-sm font-medium text-emerald-900">{label}</span>
    </div>
  );
}
