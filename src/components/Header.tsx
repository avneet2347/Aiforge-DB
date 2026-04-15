import { Database, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <Sparkles className="h-3 w-3 text-primary absolute -top-1 -right-1 animate-pulse-glow" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">
              AIForge <span className="text-gradient-primary">DB</span>
            </h1>
            <p className="text-[11px] text-muted-foreground -mt-0.5">Database Query Optimizer</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="hidden sm:inline">AI-Powered</span>
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-success text-xs font-medium">Online</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
