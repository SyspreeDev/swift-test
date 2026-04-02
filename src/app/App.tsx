import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ProblemsAndSolutionsSection } from './components/ProblemsAndSolutionsSection';
import { ProcessSection } from './components/ProcessSection';
import { BrandsSection } from './components/BrandsSection';
import { ProductsSection } from './components/ProductsSection';
import { SocialProofSection } from './components/SocialProofSection';
import { FormSection } from './components/FormSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { CookieConsent } from './components/CookieConsent';
import { Footer } from './components/Footer';
import { BackgroundAnimations } from './components/BackgroundAnimations';
import { InteractiveDecorations, FormMagnetDecorations } from './components/InteractiveDecorations';
import { ScrollProgressIndicator, FormAttractorParticles } from './components/ScrollProgressIndicator';
import { SectionTransitionEffect } from './components/SectionTransitionEffect';
import { useEffect, useRef, useState } from 'react';
import { getAnimationSettings } from './utils/performance';
import { Routes, Route } from "react-router-dom";


function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 max-w-lg w-full text-center border border-gray-100">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-[#008873] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl lg:text-4xl font-semibold text-[#1c1c1e] mb-3 font-['Exo',sans-serif]">
          Thank You!
        </h1>

        {/* Message */}
        <p className="text-[#3a3a3c] text-base lg:text-lg mb-6 font-['Barlow',sans-serif]">
          Your form has been submitted successfully.  
          Our team will contact you shortly.
        </p>

        {/* Highlight Box */}
        <div className="bg-[#008873]/10 border border-[#008873]/20 rounded-lg p-4 mb-6">
          <p className="text-[#008873] font-medium text-sm lg:text-base font-['Inter',sans-serif]">
            ⏱ We usually respond within 12 hours
          </p>
        </div>

        {/* Button */}
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#008873] text-white rounded-xl font-semibold hover:bg-[#006d5c] transition-all"
        >
          Go Back Home →
        </a>
      </div>
    </div>
  );
}

function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [animationSettings, setAnimationSettings] = useState(getAnimationSettings());
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    
    // Use passive event listener for better scroll performance
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Force scroll to top on page load/reload
  useEffect(() => {
    // Scroll to top immediately
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);

    // Also reset history scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Get performance settings
    setAnimationSettings(getAnimationSettings());
  }, []);

  

  return (
    <>
      <Navigation />
      
      {/* Interactive Decorations Layer - ONLY on desktop devices */}
      {!isMobile && animationSettings.enableAnimations && animationSettings.enableParallax && (
        <>
          <InteractiveDecorations />
          <FormMagnetDecorations />
        </>
      )}
      
      {/* Scroll Progress - Simplified on low-end */}
      {animationSettings.enableAnimations && <ScrollProgressIndicator />}
      
      {/* Particles - ONLY on desktop devices */}
      {!isMobile && animationSettings.enableParticles && <FormAttractorParticles />}
      
      {/* Section Transitions - ONLY on desktop devices */}
      {!isMobile && animationSettings.enableTransitions && <SectionTransitionEffect />}
      
      <div 
        ref={scrollContainerRef}
        className={`overflow-y-scroll h-screen ${!isMobile ? 'scroll-smooth lg:snap-y lg:snap-proximity' : ''}`}
        style={{ 
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          scrollBehavior: isMobile ? 'auto' : 'smooth'
        }}
      >
        {/* Hero Section with optional video background */}
        <HeroSection 
          enableVideo={animationSettings.enableAnimations} 
          videoUrl="https://www.youtube.com/embed/aP4L7jnKxYA"
          mobileVideoUrl="https://www.youtube.com/embed/wwrYl-50v2E"
        />

        <div className="relative">
          {/* Background Animations - ONLY on desktop devices */}
          {!isMobile && animationSettings.enableParallax && <BackgroundAnimations />}
          
          {/* Products Carousel Section */}
          <ProductsSection />

          {/* Combined Problems & Solutions Section */}
          <ProblemsAndSolutionsSection />

          {/* Process Section */}
          <ProcessSection />

          {/* Brands Section */}
          <BrandsSection />

          {/* Social Proof / Instagram Section */}
          <SocialProofSection />

          {/* Form Section */}
          <FormSection />

          {/* Gallery Section */}
          <GallerySection />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* FAQ Section */}
          <FAQSection />

          {/* Cookie Consent Section */}
          <CookieConsent />
        </div>

        {/* Footer Section */}
        <Footer />
      </div>
    </>
    
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}