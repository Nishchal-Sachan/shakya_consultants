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
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      
      <main className="min-h-screen">
        <Hero />
        <TrustedBy className="bg-white" />
        <FeaturedWork className="bg-gray-50/50" />
        <FeaturesStrip className="bg-white" />
        <About className="bg-gray-50/50" />
        <Speed className="bg-white" />
        <Capabilities className="bg-gray-50/50" />
        <Pricing className="bg-white" />
        <FAQ className="bg-gray-50/50" />
        <Contact className="bg-white" />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
