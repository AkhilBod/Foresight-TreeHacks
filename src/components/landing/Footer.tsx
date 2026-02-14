import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="mx-auto max-w-7xl px-6">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <Link to="/" className="font-display text-lg font-bold text-primary">
          Foresight
        </Link>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#security" className="hover:text-foreground transition-colors">Security</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; 2026 Foresight. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
