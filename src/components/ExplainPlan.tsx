import { GitBranch, ArrowRight } from "lucide-react";

export interface PlanNode {
  operation: string;
  table?: string;
  cost: number;
  rows: number;
  details: string;
  children?: PlanNode[];
}

interface ExplainPlanProps {
  plan: PlanNode;
}

const costColor = (cost: number) => {
  if (cost > 1000) return "text-destructive";
  if (cost > 100) return "text-warning";
  return "text-success";
};

const PlanNodeView = ({ node, depth = 0 }: { node: PlanNode; depth?: number }) => {
  return (
    <div className="space-y-2">
      <div
        className="flex items-start gap-3 bg-muted/30 border border-border rounded-lg p-3 hover:border-primary/30 transition-colors"
        style={{ marginLeft: `${depth * 24}px` }}
      >
        <div className="mt-0.5">
          {depth > 0 ? (
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <GitBranch className="h-3.5 w-3.5 text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground">{node.operation}</span>
            {node.table && (
              <span className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary font-mono">
                {node.table}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{node.details}</p>
          <div className="flex gap-4 mt-2">
            <span className="text-xs">
              Cost: <span className={`font-mono font-medium ${costColor(node.cost)}`}>{node.cost}</span>
            </span>
            <span className="text-xs text-muted-foreground">
              Rows: <span className="font-mono text-foreground">{node.rows.toLocaleString()}</span>
            </span>
          </div>
        </div>
      </div>

      {node.children?.map((child, i) => (
        <PlanNodeView key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
};

const ExplainPlan = ({ plan }: ExplainPlanProps) => {
  return (
    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center gap-2">
        <GitBranch className="h-4 w-4 text-info" />
        <h3 className="text-sm font-semibold text-foreground">Explain Plan</h3>
      </div>

      <div className="bg-gradient-card border border-border rounded-lg p-4">
        <PlanNodeView node={plan} />
      </div>
    </div>
  );
};

export default ExplainPlan;
