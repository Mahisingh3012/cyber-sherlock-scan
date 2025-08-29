import { AlertTriangle, Shield, Eye, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  timestamp: string;
  address: string;
  category: string;
}

const AlertsPanel = () => {
  // Mock alerts data
  const alerts: Alert[] = [
    {
      id: "1",
      severity: "high",
      title: "Blacklist Interaction Detected",
      description: "Direct transaction with known malicious address 0x1234...5678",
      timestamp: "2 minutes ago",
      address: "0x9abc...def0",
      category: "Security"
    },
    {
      id: "2", 
      severity: "high",
      title: "Suspicious Pattern Match",
      description: "Transaction pattern matches known exploitation techniques",
      timestamp: "15 minutes ago",
      address: "0x3456...789a",
      category: "Behavior"
    },
    {
      id: "3",
      severity: "medium",
      title: "High-Frequency Activity",
      description: "Unusual number of transactions detected in short time window",
      timestamp: "1 hour ago", 
      address: "0x5678...9abc",
      category: "Volume"
    },
    {
      id: "4",
      severity: "medium",
      title: "Gas Pattern Anomaly",
      description: "Abnormal gas usage patterns detected",
      timestamp: "2 hours ago",
      address: "0x7890...cdef",
      category: "Behavior"
    },
    {
      id: "5",
      severity: "low",
      title: "New Address Activity",
      description: "First-time activity from previously inactive address",
      timestamp: "4 hours ago",
      address: "0xabcd...1234",
      category: "Discovery"
    },
    {
      id: "6",
      severity: "low",
      title: "Cross-Chain Transfer",
      description: "Bridge transaction to different blockchain network",
      timestamp: "6 hours ago",
      address: "0xef01...5678",
      category: "Network"
    }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "medium":
        return <Shield className="h-5 w-5 text-warning" />;
      case "low":
        return <Eye className="h-5 w-5 text-accent" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "high":
        return "neon-danger";
      case "medium":
        return "warning";  
      case "low":
        return "neon-success";
      default:
        return "outline";
    }
  };

  const getSeverityGlow = (severity: string) => {
    switch (severity) {
      case "high":
        return "shadow-glow-danger hover:shadow-glow-danger";
      case "medium":
        return "shadow-glow hover:shadow-glow";
      case "low":
        return "shadow-glow-success hover:shadow-glow-success";
      default:
        return "hover:shadow-glow";
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Security Alerts</h2>
          <Badge variant="neon" className="text-sm">
            {alerts.filter(a => a.severity === "high").length} High Priority
          </Badge>
        </div>
        
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card 
              key={alert.id}
              className={`bg-gradient-card border-border transition-all cursor-pointer group ${getSeverityGlow(alert.severity)}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Severity Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  
                  {/* Alert Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant={getSeverityVariant(alert.severity)} className="text-xs">
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {alert.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                        <Clock className="h-3 w-3" />
                        {alert.timestamp}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {alert.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Address:</span>
                        <code className="text-xs bg-secondary/50 px-2 py-1 rounded font-mono">
                          {truncateAddress(alert.address)}
                        </code>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/10 hover:shadow-glow"
                      >
                        View Evidence
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button variant="outline" className="hover:shadow-glow">
            View All Alerts ({alerts.length})
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AlertsPanel;