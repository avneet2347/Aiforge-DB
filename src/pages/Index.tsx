import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import QueryInput from "@/components/QueryInput";
import OptimizedQuery from "@/components/OptimizedQuery";
import IndexRecommendations, { type IndexRecommendation } from "@/components/IndexRecommendations";
import PerformanceMetrics, { type Metrics } from "@/components/PerformanceMetrics";
import ExplainPlan, { type PlanNode } from "@/components/ExplainPlan";
import { Shield, Layers, BarChart3, Zap } from "lucide-react";

interface AnalysisResult {
  optimizedQuery: string;
  explanation: string;
  indexRecommendations: IndexRecommendation[];
  metrics: Metrics;
  explainPlan: PlanNode;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (query: string, dialect: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, dialect }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      setResult(data);
    } catch (err: any) {
      console.error("Analysis error:", err);
      toast({
        title: "Analysis Failed",
        description: err.message || "Failed to analyze the query.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Zap, title: "Query Rewriting", desc: "AI transforms slow queries into optimized equivalents" },
    { icon: Shield, title: "Index Advisor", desc: "Smart recommendations based on query patterns" },
    { icon: BarChart3, title: "Performance Metrics", desc: "Execution time & cost estimates before running" },
    { icon: Layers, title: "Explain Plans", desc: "Visual breakdown of query execution strategy" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Query Input Section */}
        <section className="bg-card border border-border rounded-xl p-6">
          <QueryInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        </section>

        {/* Results */}
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="bg-card border border-border rounded-xl p-6 space-y-6">
              <OptimizedQuery
                original=""
                optimized={result.optimizedQuery}
                explanation={result.explanation}
              />
              <IndexRecommendations recommendations={result.indexRecommendations} />
            </section>

            <section className="bg-card border border-border rounded-xl p-6 space-y-6">
              <PerformanceMetrics metrics={result.metrics} />
              <ExplainPlan plan={result.explainPlan} />
            </section>
          </div>
        )}

        {/* Features Grid */}
        {!result && !isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-gradient-card border border-border rounded-xl p-5 space-y-3 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        )}

        <footer className="text-center py-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            AIForge DB — AI-Powered Database Query Optimizer • Assigned to Suman
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;