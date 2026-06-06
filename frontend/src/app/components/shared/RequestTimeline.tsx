import { CheckCircle, Circle, Clock } from "lucide-react";
import { cn } from "../ui/utils";

export type TimelineStatus = "completed" | "active" | "pending";

export interface TimelineStep {
  label: string;
  status: TimelineStatus;
  date?: string;
}

interface RequestTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export function RequestTimeline({ steps, className }: RequestTimelineProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                step.status === "completed" && "bg-[--color-security-green] text-white",
                step.status === "active" && "bg-[--color-trust-blue] text-white",
                step.status === "pending" && "bg-gray-200 text-gray-400"
              )}
            >
              {step.status === "completed" && <CheckCircle className="w-5 h-5" />}
              {step.status === "active" && <Clock className="w-5 h-5" />}
              {step.status === "pending" && <Circle className="w-5 h-5" />}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-0.5 h-12 mt-1",
                  step.status === "completed" ? "bg-[--color-security-green]" : "bg-gray-200"
                )}
              />
            )}
          </div>
          <div className="flex-1 pb-8">
            <p
              className={cn(
                step.status === "pending" && "text-muted-foreground",
                step.status !== "pending" && "text-foreground"
              )}
            >
              {step.label}
            </p>
            {step.date && (
              <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
