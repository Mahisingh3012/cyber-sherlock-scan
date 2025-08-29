import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import RiskOverview from "@/components/RiskOverview";
import EvidenceTabs from "@/components/EvidenceTabs";
import TransactionsTable from "@/components/TransactionsTable";
import AlertsPanel from "@/components/AlertsPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation Bar */}
      <TopBar />
      
      {/* Main Content */}
      <main>
        {/* Hero Section with Search */}
        <HeroSection />
        
        {/* Risk Overview Cards */}
        <RiskOverview />
        
        {/* Evidence Analysis Tabs */}
        <EvidenceTabs />
        
        {/* Transactions Table */}
        <TransactionsTable />
        
        {/* Alerts Panel */}
        <AlertsPanel />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Crypto Sherlock. AI-powered fraud detection for the decentralized future.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;