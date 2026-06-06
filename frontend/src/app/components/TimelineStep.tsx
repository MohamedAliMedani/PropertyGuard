import { Check, Circle, Clock } from "lucide-react";

interface TimelineStepProps {
  title: string;
  description?: string;
  status: "completed" | "current" | "upcoming";
  isLast?: boolean;
  date?: string;
}

export function TimelineStep({ title, description, status, isLast, date }: TimelineStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            status === "completed"
              ? "bg-[#059669] text-white"
              : status === "current"
              ? "bg-[#1e3a8a] text-white"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          {status === "completed" ? (
            <Check className="w-5 h-5" />
          ) : status === "current" ? (
            <Clock className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </div>
        {!isLast && (
          <div
            className={`w-0.5 h-16 mt-2 ${
              status === "completed" ? "bg-[#059669]" : "bg-gray-200"
            }`}
          />
        )}
      </div>
      <div className="flex-1 pb-8">
        <div className="flex items-center justify-between">
          <h4 className={`font-medium ${status === "upcoming" ? "text-muted-foreground" : ""}`}>
            {title}
          </h4>
          {date && (
            <span className="text-xs text-muted-foreground">{date}</span>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
