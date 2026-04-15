import { Key, AlertTriangle, CheckCircle2 } from "lucide-react";

export interface IndexRecommendation {
  table: string;
  columns: string[];
  type: string;
  impact: "high" | "medium" | "low";
  reason: string;
  createStatement: string;
}

interface IndexRecommendationsProps {
  recommendations: IndexRecommendation[];
}

const impactConfig = {
  high: { color: "text-success", bg: "bg-success/10", border: "border-success/20", label: "High Impact" },
  medium: { color: "text-warning", bg: "bg-warning/10", border: "border-warning/20", label: "Medium Impact" },
  low: { color: "text-info", bg: "bg-info/10", border: "border-info/20", label: "Low Impact" },
};

const IndexRecommendations = ({ recommendations }: IndexRecommendationsProps) => {
  if (!recommendations.length) return null;

  return (
    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-center gap-2">
        <Key className="h-4 w-4 text-warning" />
        <h3 className="text-sm font-semibold text-foreground">Index Recommendations</h3>
        <span className="px-2 py-0.5 rounded-full text-xs bg-warning/10 text-warning">
          {recommendations.length} suggested
        </span>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, i) => {
          const config = impactConfig[rec.impact];
          return (
            <div
              key={i}
              className={`bg-gradient-card border ${config.border} rounded-lg p-4 space-y-3`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {rec.impact === "high" ? (
                    <CheckCircle2 className={`h-4 w-4 ${config.color}`} />
                  ) : (
                    <AlertTriangle className={`h-4 w-4 ${config.color}`} />
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {rec.table} — {rec.type}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${config.bg} ${config.color}`}>
                  {config.label}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">{rec.reason}</p>

              <pre className="bg-muted/50 rounded-md px-3 py-2 font-mono text-xs text-primary overflow-x-auto">
                {rec.createStatement}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndexRecommendations;
