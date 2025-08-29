import { useState } from "react";
import { Search, Target, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  const [scanType, setScanType] = useState<"wallet" | "hash">("wallet");
  const [inputValue, setInputValue] = useState("");

  const handleScan = () => {
    if (inputValue.trim()) {
      console.log(`Scanning ${scanType}: ${inputValue}`);
      // Add scan functionality here
    }
  };

  return (
    <section className="relative py-20 px-4 text-center">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-5 rounded-3xl blur-3xl" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            AI-Powered
          </span>
          <br />
          <span className="text-foreground">Fraud Radar</span>
          <br />
          <span className="text-muted-foreground text-3xl md:text-4xl">
            for Crypto
          </span>
        </h1>

        {/* Subcopy */}
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          Scan any wallet or transaction hash for risk assessment and detailed explanations.
          Powered by advanced AI detection algorithms.
        </p>

        {/* Scan Input Section */}
        <div className="bg-gradient-card rounded-2xl p-8 border border-border shadow-glow max-w-2xl mx-auto">
          {/* Toggle Buttons */}
          <div className="flex justify-center gap-2 mb-6">
            <Button
              variant={scanType === "wallet" ? "default" : "outline"}
              size="sm"
              onClick={() => setScanType("wallet")}
              className={
                scanType === "wallet"
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : ""
              }
            >
              <Target className="h-4 w-4 mr-2" />
              Wallet Address
            </Button>
            <Button
              variant={scanType === "hash" ? "default" : "outline"}
              size="sm"
              onClick={() => setScanType("hash")}
              className={
                scanType === "hash"
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : ""
              }
            >
              <Hash className="h-4 w-4 mr-2" />
              Transaction Hash
            </Button>
          </div>

          {/* Input and Scan Button */}
          <div className="flex gap-3">
            <Input
              placeholder={
                scanType === "wallet"
                  ? "Enter wallet address (0x...)"
                  : "Enter transaction hash (0x...)"
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-input/50 border-border/50 focus:border-primary focus:shadow-glow transition-all"
            />
            <Button
              onClick={handleScan}
              disabled={!inputValue.trim()}
              className="bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-glow-accent transition-all"
            >
              <Search className="h-4 w-4 mr-2" />
              Scan
            </Button>
          </div>

          {/* Quick Examples */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-muted-foreground">Quick examples:</span>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary/50">
              Tornado Cash
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary/50">
              Binance Hot Wallet
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary/50">
              Recent Exploit
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;