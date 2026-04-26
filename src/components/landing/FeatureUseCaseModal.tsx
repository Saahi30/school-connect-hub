import * as React from "react";
import { type LucideIcon, X, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AnimatedTabs } from "@/components/ui/animated-tabs";

export type Segment = "k12" | "international" | "colleges" | "coaching";

export interface FeatureUseCase {
  headline: string;
  scenario: string;
  bullets: string[];
}

export interface FeatureContent {
  title: string;
  description: string;
  Icon: LucideIcon;
  accent: string; // "r g b"
  segments: Record<Segment, FeatureUseCase>;
}

interface FeatureUseCaseModalProps {
  feature: FeatureContent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const segmentLabels: Record<Segment, string> = {
  k12: "K-12",
  international: "International",
  colleges: "Colleges",
  coaching: "Coaching",
};

const SegmentPanel = ({ uc, accent }: { uc: FeatureUseCase; accent: string }) => (
  <div className="grid gap-4">
    <div>
      <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white mb-1.5">
        {uc.headline}
      </h3>
      <p className="text-sm text-white/75 leading-relaxed">{uc.scenario}</p>
    </div>
    <div className="space-y-2 pt-1">
      {uc.bullets.map((b) => (
        <div key={b} className="flex items-start gap-2 text-sm text-white/85">
          <CheckCircle2
            className="h-4 w-4 mt-0.5 shrink-0"
            style={{ color: `rgb(${accent})` }}
          />
          <span className="leading-relaxed">{b}</span>
        </div>
      ))}
    </div>
  </div>
);

export const FeatureUseCaseModal: React.FC<FeatureUseCaseModalProps> = ({
  feature,
  open,
  onOpenChange,
}) => {
  if (!feature) return null;

  const tabs = (Object.keys(segmentLabels) as Segment[]).map((seg) => ({
    id: seg,
    label: segmentLabels[seg],
    content: <SegmentPanel uc={feature.segments[seg]} accent={feature.accent} />,
  }));

  const Icon = feature.Icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 overflow-hidden max-w-2xl gap-0 border-0 shadow-2xl rounded-2xl sm:rounded-2xl"
        style={{
          background: `linear-gradient(160deg, rgb(${feature.accent}) 0%, rgb(${feature.accent}/0.85) 35%, #1a1a2e 100%)`,
        }}
      >
        <DialogTitle className="sr-only">{feature.title}</DialogTitle>

        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-10 rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative z-[1] p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-white/20 shrink-0"
                style={{ backgroundColor: `rgb(${feature.accent}/0.25)` }}
              >
                <Icon className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-1">
                  Use case
                </p>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white leading-tight">
                  {feature.title}
                </h2>
                <p className="text-sm text-white/75 mt-1.5 max-w-md">
                  {feature.description}
                </p>
              </div>
            </div>

            <AnimatedTabs tabs={tabs} defaultTab="k12" />

            <p className="mt-4 text-[11px] text-white/50 text-center">
              Switch tabs to see how this feature adapts to your institution type.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
