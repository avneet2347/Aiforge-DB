import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, Loader2, Database } from "lucide-react";

interface QueryInputProps {
  onAnalyze: (query: string, dialect: string) => void;
  isLoading: boolean;
}

const SAMPLE_QUERIES = [
  {
    label: "Slow JOIN",
    query: `SELECT u.name, o.total, p.name as product
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id
WHERE o.created_at > '2024-01-01'
AND u.status = 'active'
ORDER BY o.total DESC;`,
  },
  {
    label: "Subquery",
    query: `SELECT * FROM employees
WHERE department_id IN (
  SELECT id FROM departments
  WHERE budget > (
    SELECT AVG(budget) FROM departments
  )
)
AND salary > 50000
ORDER BY salary DESC;`,
  },
  {
    label: "Aggregation",
    query: `SELECT c.name, COUNT(o.id) as order_count,
  SUM(o.total) as revenue,
  AVG(o.total) as avg_order
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.status != 'cancelled'
GROUP BY c.name
HAVING COUNT(o.id) > 5
ORDER BY revenue DESC
LIMIT 100;`,
  },
];

const DIALECTS = ["PostgreSQL", "MySQL", "SQL Server", "SQLite"];

const QueryInput = ({ onAnalyze, isLoading }: QueryInputProps) => {
  const [query, setQuery] = useState("");
  const [dialect, setDialect] = useState("PostgreSQL");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">SQL Query</span>
        </div>
        <div className="flex gap-1">
          {DIALECTS.map((d) => (
            <button
              key={d}
              onClick={() => setDialect(d)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                dialect === d
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Paste your SQL query here..."
          className="w-full h-48 bg-muted/50 border border-border rounded-lg p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          spellCheck={false}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <span className="text-xs text-muted-foreground self-center">Try:</span>
          {SAMPLE_QUERIES.map((s) => (
            <button
              key={s.label}
              onClick={() => setQuery(s.query)}
              className="px-3 py-1.5 rounded-md text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border"
            >
              {s.label}
            </button>
          ))}
        </div>

        <Button
          onClick={() => onAnalyze(query, dialect)}
          disabled={!query.trim() || isLoading}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Zap className="h-4 w-4" />
          )}
          {isLoading ? "Analyzing..." : "Optimize Query"}
        </Button>
      </div>
    </div>
  );
};

export default QueryInput;
