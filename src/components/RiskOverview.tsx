import { Shield, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface RiskData {
  score: number;
  status: "safe" | "watch" | "flagged";
  chain: string;
  rulesHit: number;
  anomalyScore: number;
  blacklistDistance: number;
}

const RiskOverview = () => {
  // Mock data - in real app this would come from props or API
  const riskData: RiskData = {
    score: 78,
    status: "watch",
    chain: "ETH",
    rulesHit: 3,
    anomalyScore: 0.65,
    blacklistDistance: 2,
  };

  const getScoreVariant = (score: number) => {
    if (score >= 70) return "danger";
    if (score >= 40) return "neon";
    return "success";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "safe":
        return <Badge variant="neon-success">Safe</Badge>;
      case "watch":
        return <Badge variant="neon">Watch</Badge>;
      case "flagged":
        return <Badge variant="neon-danger">Flagged</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Risk Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Risk Score Card */}
          <Card className="bg-gradient-card border-border shadow-glow">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Risk Score
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {/* Circular Progress Visualization */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-secondary/20" />
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-secondary/30"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={
                      riskData.score >= 70
                        ? "text-destructive"
                        : riskData.score >= 40
                        ? "text-warning"
                        : "text-success"
                    }
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="transparent"
                    strokeDasharray={`${riskData.score}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    style={{
                      filter: `drop-shadow(0 0 8px hsl(var(--${
                        riskData.score >= 70
                          ? "destructive"
                          : riskData.score >= 40
                          ? "warning"
                          : "success"
                      })))`,
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{riskData.score}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Out of 100</p>
            </CardContent>
          </Card>

          {/* Status & Chain Card */}
          <Card className="bg-gradient-card border-border shadow-glow">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-5 w-5 text-accent" />
                Status & Chain
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Current Status</p>
                {getStatusBadge(riskData.status)}
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Blockchain</p>
                <Badge variant="outline" className="bg-secondary/50">
                  {riskData.chain}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Signals Summary Card */}
          <Card className="bg-gradient-card border-border shadow-glow">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Signals Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Rules Hit</span>
                <Badge variant="neon" className="bg-gradient-primary">
                  {riskData.rulesHit}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Anomaly Score</span>
                  <span className="text-sm font-medium">{riskData.anomalyScore}</span>
                </div>
                <Progress 
                  value={riskData.anomalyScore * 100}
                  variant="neon"
                  indicatorVariant={getScoreVariant(riskData.anomalyScore * 100)}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Blacklist Distance</span>
                <Badge variant={riskData.blacklistDistance <= 2 ? "neon-danger" : "outline"}>
                  {riskData.blacklistDistance} hops
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RiskOverview;