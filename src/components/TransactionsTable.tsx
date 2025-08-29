import { ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  timestamp: string;
  hash: string;
  from: string;
  to: string;
  amount: string;
  currency: string;
  ruleHit: string | null;
  riskDelta: number;
}

const TransactionsTable = () => {
  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: "1",
      timestamp: "2h ago",
      hash: "0xa1b2c3d4...",
      from: "0x1234...5678",
      to: "0x9abc...def0", 
      amount: "1.5",
      currency: "ETH",
      ruleHit: "High Frequency",
      riskDelta: +25
    },
    {
      id: "2", 
      timestamp: "4h ago",
      hash: "0xe5f6g7h8...",
      from: "0x2345...6789",
      to: "0x1234...5678",
      amount: "0.8",
      currency: "ETH",
      ruleHit: null,
      riskDelta: -5
    },
    {
      id: "3",
      timestamp: "6h ago", 
      hash: "0xi9j0k1l2...",
      from: "0x1234...5678",
      to: "0x3456...789a",
      amount: "2.3",
      currency: "ETH",
      ruleHit: "Blacklist Interaction",
      riskDelta: +45
    },
    {
      id: "4",
      timestamp: "8h ago",
      hash: "0xm3n4o5p6...",
      from: "0x4567...89ab",
      to: "0x1234...5678", 
      amount: "0.25",
      currency: "ETH",
      ruleHit: "Unusual Gas",
      riskDelta: +12
    },
    {
      id: "5",
      timestamp: "10h ago",
      hash: "0xq7r8s9t0...",
      from: "0x1234...5678",
      to: "0x5678...9abc",
      amount: "3.7",
      currency: "ETH", 
      ruleHit: null,
      riskDelta: 0
    }
  ];

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getRiskDeltaBadge = (delta: number) => {
    if (delta > 20) return <Badge variant="neon-danger">+{delta}</Badge>;
    if (delta > 0) return <Badge variant="warning">+{delta}</Badge>;
    if (delta < 0) return <Badge variant="neon-success">{delta}</Badge>;
    return <Badge variant="outline">0</Badge>;
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Transaction History</h2>
        
        <Card className="bg-gradient-card border-border shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Transactions
              <Badge variant="neon" className="text-xs">
                {transactions.length} records
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Time</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Hash</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">From/To</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Rule Hit</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Risk Δ</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr 
                      key={tx.id}
                      className="border-b border-border/20 hover:bg-secondary/20 transition-colors group"
                    >
                      <td className="p-4">
                        <span className="text-sm text-muted-foreground">{tx.timestamp}</span>
                      </td>
                      
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <code className="text-sm bg-secondary/50 px-2 py-1 rounded font-mono">
                            {truncateAddress(tx.hash)}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">From:</span>
                            <code className="bg-secondary/50 px-1 py-0.5 rounded text-xs font-mono">
                              {truncateAddress(tx.from)}
                            </code>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">To:</span>
                            <code className="bg-secondary/50 px-1 py-0.5 rounded text-xs font-mono">
                              {truncateAddress(tx.to)}
                            </code>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <div className="text-sm font-medium">
                          {tx.amount} {tx.currency}
                        </div>
                      </td>
                      
                      <td className="p-4">
                        {tx.ruleHit ? (
                          <Badge variant="neon-danger" className="text-xs">
                            {tx.ruleHit}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">None</span>
                        )}
                      </td>
                      
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {tx.riskDelta > 0 ? (
                            <TrendingUp className="h-4 w-4 text-destructive" />
                          ) : tx.riskDelta < 0 ? (
                            <TrendingDown className="h-4 w-4 text-success" />
                          ) : null}
                          {getRiskDeltaBadge(tx.riskDelta)}
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <Button variant="outline" size="sm" className="text-xs">
                          Analyze
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Load More Button */}
            <div className="p-6 text-center border-t border-border/20">
              <Button variant="outline" className="hover:shadow-glow">
                Load More Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TransactionsTable;