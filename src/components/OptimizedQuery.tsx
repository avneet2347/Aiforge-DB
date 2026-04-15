import { Check, Copy, ArrowRight } from "lucide-react";
import { useState } from "react";

interface OptimizedQueryProps {
  original: string;
  optimized: string;
  explanation: string;
}

const OptimizedQuery = ({ original, optimized, explanation }: OptimizedQueryProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(optimized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 animate-fade-in-up">
      <div className="flex items-center gap-2">
        <ArrowRight className="h-4 w-4 text-success" />
        <h3 className="text-sm font-semibold text-foreground">Optimized Query</h3>
      </div>

      <div className="relative">
        <pre className="bg-muted/50 border border-success/20 rounded-lg p-4 font-mono text-sm text-foreground overflow-x-auto">
          <code>{optimized}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-success" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>
      </div>

      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
      </div>
    </div>
  );
};

export default OptimizedQuery;
