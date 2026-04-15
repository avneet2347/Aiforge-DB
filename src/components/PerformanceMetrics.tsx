import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingDown, Clock, Cpu, HardDrive } from "lucide-react";

export interface Metrics {
  estimatedTimeOriginal: number;
  estimatedTimeOptimized: number;
  cpuReductionPercent: number;
  ioReductionPercent: number;
  costReductionPercent: number;
}

interface PerformanceMetricsProps {
  metrics: Metrics;
}

const PerformanceMetrics = ({ metrics }: PerformanceMetricsProps) => {
  const improvement = Math.round(
    ((metrics.estimatedTimeOriginal - metrics.estimatedTimeOptimized) /
      metrics.estimatedTimeOriginal) *
      100
  );

  const chartData = [
    { name: "Original", value: metrics.estimatedTimeOriginal, fill: "hsl(0, 72%, 51%)" },
    { name: "Optimized", value: metrics.estimatedTimeOptimized, fill: "hsl(152, 69%, 45%)" },
  ];

  const statCards = [
    {
      icon: Clock,
      label: "Execution Time",
      value: `${improvement}%`,
      sub: "faster",
      color: "text-success",
    },
    {
      icon: Cpu,
      label: "CPU Usage",
      value: `${metrics.cpuReductionPercent}%`,
      sub: "reduction",
      color: "text-primary",
    },
    {
      icon: HardDrive,
      label: "I/O Operations",
      value: `${metrics.ioReductionPercent}%`,
      sub: "reduction",
      color: "text-warning",
    },
    {
      icon: TrendingDown,
      label: "Query Cost",
      value: `${metrics.costReductionPercent}%`,
      sub: "savings",
      color: "text-info",
    },
  ];

  return (
    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center gap-2">
        <TrendingDown className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Performance Impact</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <div key={s.label} className="bg-gradient-card border border-border rounded-lg p-3 text-center">
            <s.icon className={`h-4 w-4 mx-auto mb-1 ${s.color}`} />
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-card border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-3">Estimated Execution Time (ms)</p>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={chartData} layout="vertical" barSize={24}>
            <XAxis type="number" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fill: "hsl(210, 40%, 93%)", fontSize: 12 }} axisLine={false} tickLine={false} width={70} />
            <Tooltip
              contentStyle={{
                background: "hsl(222, 40%, 9%)",
                border: "1px solid hsl(222, 25%, 18%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 93%)",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value} ms`, "Time"]}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
