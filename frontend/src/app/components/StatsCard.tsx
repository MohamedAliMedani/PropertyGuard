import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({ title, value, change, changeType, icon: Icon, iconColor = "#059669" }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {change && (
            <p
              className={`text-xs mt-2 ${
                changeType === "positive"
                  ? "text-green-600"
                  : changeType === "negative"
                  ? "text-red-600"
                  : "text-muted-foreground"
              }`}
            >
              {change}
            </p>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
      </div>
    </div>
  );
}
