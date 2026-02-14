const items = [
  { name: "Dish Soap", brand: "Dawn Ultra", price: "$4.99", confidence: 94 },
  { name: "Paper Towels", brand: "Bounty Select", price: "$12.49", confidence: 87 },
  { name: "Laundry Pods", brand: "Tide Original", price: "$18.99", confidence: 91 },
];

const HeroDashboardMockup = () => (
  <div className="relative mx-auto w-full max-w-3xl">
    <div className="rounded-xl border border-border bg-card p-1 shadow-2xl overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 rounded-t-lg bg-surface-elevated px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
        </div>
        <span className="ml-3 text-xs text-muted-foreground">Foresight Dashboard</span>
      </div>

      {/* Dashboard Image */}
      <div className="w-full">
        <img 
          src="https://i.ibb.co/4gPY40hH/image.png" 
          alt="Foresight Dashboard" 
          className="w-full h-auto"
        />
      </div>
    </div>
    {/* Glow effect */}
    <div className="absolute -inset-4 -z-10 rounded-2xl bg-primary/5 blur-2xl" />
  </div>
);

export default HeroDashboardMockup;
