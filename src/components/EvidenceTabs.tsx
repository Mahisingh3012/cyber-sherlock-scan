import { useState } from "react";
import { BarChart3, Network, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const EvidenceTabs = () => {
  const [activeTab, setActiveTab] = useState("behavior");

  // Mock data for behavior sparklines
  const behaviorData = [
    { name: "Transaction Volume", trend: "up", data: [20, 35, 45, 30, 60, 80, 95] },
    { name: "Frequency Pattern", trend: "stable", data: [40, 42, 38, 45, 43, 41, 44] },
    { name: "Gas Usage", trend: "down", data: [100, 85, 70, 60, 45, 35, 25] },
  ];

  // Mock data for network graph nodes
  const networkNodes = [
    { id: "target", type: "target", risk: "high" },
    { id: "blacklist1", type: "blacklist", risk: "critical" },
    { id: "blacklist2", type: "blacklist", risk: "critical" },
    { id: "neighbor1", type: "neighbor", risk: "medium" },
    { id: "neighbor2", type: "neighbor", risk: "low" },
    { id: "neighbor3", type: "neighbor", risk: "medium" },
  ];

  // Mock data for signals/rules
  const signals = [
    { 
      rule: "High-frequency transactions",
      severity: "high",
      description: "Detected 150+ transactions in 1 hour period",
      confidence: 0.92
    },
    {
      rule: "Known blacklist interaction",
      severity: "critical", 
      description: "Direct transaction with known malicious address",
      confidence: 0.98
    },
    {
      rule: "Unusual gas patterns",
      severity: "medium",
      description: "Abnormal gas usage compared to typical patterns",
      confidence: 0.76
    },
    {
      rule: "MEV bot behavior",
      severity: "low",
      description: "Transaction patterns consistent with MEV activities",
      confidence: 0.64
    },
  ];

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "critical":
        return "neon-danger";
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const renderSparkline = (data: number[], trend: string) => {
    const max = Math.max(...data);
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / max) * 100;
      return `${x},${y}`;
    }).join(" ");

    const trendColor = trend === "up" ? "stroke-success" : trend === "down" ? "stroke-destructive" : "stroke-accent";

    return (
      <svg className="w-24 h-12" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${trendColor} drop-shadow-[0_0_4px_currentColor]`}
          points={points}
        />
      </svg>
    );
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Evidence Analysis</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
            <TabsTrigger 
              value="behavior"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Behavior
            </TabsTrigger>
            <TabsTrigger 
              value="graph"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow"
            >
              <Network className="h-4 w-4 mr-2" />
              Graph
            </TabsTrigger>
            <TabsTrigger 
              value="signals"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow"
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Signals
            </TabsTrigger>
          </TabsList>

          {/* Behavior Tab */}
          <TabsContent value="behavior" className="mt-6">
            <div className="grid gap-6">
              {behaviorData.map((item, index) => (
                <Card key={index} className="bg-gradient-card border-border hover:shadow-glow transition-all">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {item.name}
                      <Badge variant={item.trend === "up" ? "neon-success" : item.trend === "down" ? "neon-danger" : "outline"}>
                        {item.trend}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Trend analysis over the last 7 periods
                      </p>
                      {renderSparkline(item.data, item.trend)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Graph Tab */}
          <TabsContent value="graph" className="mt-6">
            <Card className="bg-gradient-card border-border shadow-glow">
              <CardHeader>
                <CardTitle>Network Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-96 bg-background/50 rounded-lg border border-border/50 overflow-hidden">
                  {/* Simple node visualization */}
                  <div className="absolute inset-4 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Center target node */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center border-2 border-primary">
                        <span className="text-xs font-bold text-primary-foreground">Target</span>
                      </div>
                      
                      {/* Blacklist nodes (red) */}
                      <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-gradient-danger shadow-glow-danger flex items-center justify-center border-2 border-destructive">
                        <span className="text-xs font-bold text-white">BL1</span>
                      </div>
                      <div className="absolute top-1/4 right-1/4 w-12 h-12 rounded-full bg-gradient-danger shadow-glow-danger flex items-center justify-center border-2 border-destructive">
                        <span className="text-xs font-bold text-white">BL2</span>
                      </div>
                      
                      {/* Neighbor nodes (blue) */}
                      <div className="absolute bottom-1/4 left-1/6 w-10 h-10 rounded-full bg-accent/80 shadow-glow-accent flex items-center justify-center border border-accent">
                        <span className="text-xs text-background">N1</span>
                      </div>
                      <div className="absolute bottom-1/4 right-1/6 w-10 h-10 rounded-full bg-accent/80 shadow-glow-accent flex items-center justify-center border border-accent">
                        <span className="text-xs text-background">N2</span>
                      </div>
                      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-success/80 shadow-glow-success flex items-center justify-center border border-success">
                        <span className="text-xs text-background">N3</span>
                      </div>

                      {/* Connection lines */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge> 
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="hsl(var(--destructive))" strokeWidth="2" filter="url(#glow)" />
                        <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="hsl(var(--destructive))" strokeWidth="2" filter="url(#glow)" />
                        <line x1="50%" y1="50%" x2="16.66%" y2="75%" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.7" />
                        <line x1="50%" y1="50%" x2="83.33%" y2="75%" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.7" />
                        <line x1="50%" y1="50%" x2="50%" y2="66.66%" stroke="hsl(var(--success))" strokeWidth="1" opacity="0.7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Interactive network graph showing target address relationships. Red nodes indicate blacklisted addresses, blue nodes are neighbors.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Signals Tab */}
          <TabsContent value="signals" className="mt-6">
            <div className="space-y-4">
              {signals.map((signal, index) => (
                <Card key={index} className="bg-gradient-card border-border hover:shadow-glow transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant={getSeverityVariant(signal.severity)}>
                            {signal.severity.toUpperCase()}
                          </Badge>
                          <h4 className="font-semibold">{signal.rule}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {signal.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Confidence:</span>
                          <Badge variant="outline">
                            {Math.round(signal.confidence * 100)}%
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default EvidenceTabs;