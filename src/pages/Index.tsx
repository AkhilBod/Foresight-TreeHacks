import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import Security from "@/components/landing/Security";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <main className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <HowItWorks />
    <Features />
    <Security />
    <Pricing />
    <FAQ />
    <Footer />
  </main>
);

export default Index;
