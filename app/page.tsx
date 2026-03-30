import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import FeaturedWork from "@/components/sections/FeaturedWork";
import FeaturesStrip from "@/components/sections/FeaturesStrip";
import About from "@/components/sections/About";
import Speed from "@/components/sections/Speed";
import Capabilities from "@/components/sections/Capabilities";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      
      <main className="min-h-screen bg-white">
        <Hero />
        
        {/* Layered Content Sections */}
        <div className="relative z-10 bg-white">
          <TrustedBy className="bg-white border-b border-border-subtle" />
          
          <FeaturedWork className="bg-bg-base/50" />
          
          <FeaturesStrip className="bg-white" />
          
          <About className="bg-bg-soft/20" />
          
          <Speed className="bg-white" />
          
          <Capabilities className="bg-bg-soft/40" />
          
          <Pricing className="bg-white" />
          
          <Testimonials className="bg-bg-indigo-soft/30" />
          
          <FAQ className="bg-white" />
          
          <Contact className="bg-white" />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
