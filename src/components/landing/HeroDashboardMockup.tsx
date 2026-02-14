const items = [
  { name: "Dish Soap", brand: "Dawn Ultra", price: "$4.99", confidence: 94 },
  { name: "Paper Towels", brand: "Bounty Select", price: "$12.49", confidence: 87 },
  { name: "Laundry Pods", brand: "Tide Original", price: "$18.99", confidence: 91 },
];

const HeroDashboardMockup = () => (
  <div className="relative mx-auto w-full max-w-3xl">
    <div className="rounded-xl border border-border bg-card p-1 shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 rounded-t-lg bg-surface-elevated px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
        </div>
        <span className="ml-3 text-xs text-muted-foreground">Foresight Dashboard</span>
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Pending Approval</p>
            <p className="font-display text-lg font-semibold text-foreground">3 Items Detected</p>
          </div>
          <div className="rounded-md bg-primary/10 px-3 py-1.5">
            <span className="text-xs font-medium text-primary">Monthly: $142 / $200</span>
          </div>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg border border-border bg-surface p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-elevated">
                  <div className="h-5 w-5 rounded bg-primary/20" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{item.price}</p>
                  <p className="text-xs text-primary">{item.confidence}% match</p>
                </div>
                <div className="flex gap-1.5">
                  <button className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary transition-colors hover:bg-primary/25">
                    ✓
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-md bg-destructive/15 text-destructive transition-colors hover:bg-destructive/25">
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Glow effect */}
    <div className="absolute -inset-4 -z-10 rounded-2xl bg-primary/5 blur-2xl" />
  </div>
);

export default HeroDashboardMockup;
