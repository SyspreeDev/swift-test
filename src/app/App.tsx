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
    <div style={{ textAlign: "center", padding: "100px" }}>
      <h1>Thank You!</h1>
      <p>Your form has been submitted successfully.</p>
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