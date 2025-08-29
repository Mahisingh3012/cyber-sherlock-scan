import { Shield, Moon, Sun, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const TopBar = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  
  const navTabs = ["Dashboard", "Alerts", "Docs"];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary animate-pulse-glow" />
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Crypto Sherlock
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 rounded-lg bg-secondary/50 p-1">
          {navTabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={
                activeTab === tab
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground"
              }
            >
              {tab}
            </Button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* API Status */}
          <div className="hidden md:flex items-center gap-2">
            <Wifi className="h-4 w-4 text-success" />
            <Badge variant="neon-success" className="text-xs">
              Operational
            </Badge>
          </div>

          {/* Connect Wallet (Disabled) */}
          <Button variant="outline" disabled className="opacity-50">
            Connect Wallet
          </Button>

          {/* Theme Toggle */}
          <Button variant="outline" size="icon" className="hover:shadow-glow">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;