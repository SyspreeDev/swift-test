import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LeadForm } from './LeadForm';
import { LeadFormAndroid } from './LeadFormAndroid';
import svgPaths from '../../imports/svg-xtdnlxzlx3';
import { HeroCADElements } from './CADFloatingElements';
import { CTADecoration } from './InteractiveDecorations';

interface HeroSectionProps {
  enableVideo?: boolean;
  videoUrl?: string;
  mobileVideoUrl?: string;
}

export function HeroSection({ enableVideo = false, videoUrl, mobileVideoUrl }: HeroSectionProps) {
  const [showMobileForm, setShowMobileForm] = useState(false);

  // Ensure page loads at the top on mobile and when switching viewports
  useEffect(() => {
    // Scroll to top on initial load
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Track previous viewport size to detect mobile/desktop switches
    let previousIsMobile = window.innerWidth < 1024;

    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 1024;
      
      // If viewport type changed (mobile to desktop or desktop to mobile)
      if (previousIsMobile !== currentIsMobile) {
        // Scroll to top/hero section
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Update previous state
        previousIsMobile = currentIsMobile;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMobileCTA = () => {
    // On mobile, show the form in place
    if (window.innerWidth < 1024) {
      setShowMobileForm(true);
    } else {
      // On desktop, scroll to form as before
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center lg:snap-center">
      {/* CAD Floating Elements */}
      <HeroCADElements />
      
      {/* Desktop Video Background */}
      {enableVideo && videoUrl && (
        <div className="absolute inset-0 overflow-hidden hidden lg:block">
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-110"
            style={{ minWidth: '100vw', minHeight: '100vh', width: '120vw', height: '120vh' }}
            src={`${videoUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd720&playlist=${videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? videoUrl.split('/').pop()?.split('?')[0] : ''}`}
            title="Background Video"
            allow="autoplay; fullscreen; encrypted-media; accelerometer; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-[#007969]/60" />
        </div>
      )}

      {/* Mobile Video Background */}
      {enableVideo && mobileVideoUrl && (
        <div className="absolute inset-0 overflow-hidden lg:hidden">
          <iframe
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-110"
            style={{ minWidth: '100vw', minHeight: '100vh', width: '120vw', height: '120vh' }}
            src={`${mobileVideoUrl}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=medium&playlist=${mobileVideoUrl.includes('youtube.com') || mobileVideoUrl.includes('youtu.be') ? mobileVideoUrl.split('/').pop()?.split('?')[0] : ''}`}
            title="Mobile Background Video"
            allow="autoplay; fullscreen; encrypted-media; accelerometer; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-[#007969]/60" />
        </div>
      )}

      {/* Static Background (if no video) */}
      {!enableVideo && (
        <div className="absolute inset-0 bg-[#007969]" />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-6 w-full py-6 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left Side - Content (Mobile switches between content and form) */}
          <div className="text-white space-y-3 lg:space-y-6">
            <AnimatePresence mode="wait">
              {!showMobileForm ? (
                <motion.div
                  key="hero-content"
                  initial={{ opacity: 1 }}
                  exit={{ 
                    opacity: 0,
                    scale: 0.95,
                    y: -20,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="space-y-3 lg:space-y-6"
                >
                  {/* Main Heading */}
                  <h1 className="font-['Exo',sans-serif] text-sm lg:text-2xl xl:text-3xl font-semibold leading-tight tracking-[0.12em] lg:tracking-[0.15em] uppercase">
                    <span className="block whitespace-nowrap">Performance Windows Doors</span>{' '}
                    <span className="block whitespace-nowrap">Engineered for Excellence</span>{' '}
                    <span className="block whitespace-nowrap">Designed for the UAE Climate</span>
                  </h1>

                  {/* Benefits List - All 5 benefits visible on mobile and desktop */}
                  <div className="space-y-1.5 lg:space-y-3 pt-0.5 lg:pt-2">
                    {/* Benefit 1 */}
                    <div className="flex items-start space-x-1.5 lg:space-x-2.5">
                      <div className="flex-shrink-0 w-3.5 h-3.5 lg:w-5 lg:h-5 mt-0.5">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                          <path d={svgPaths.p3cd23900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M9 11L12 14L22 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-base leading-4 lg:leading-6">Free quote & site visit within 24 hours</p>
                    </div>

                    {/* Benefit 2 */}
                    <div className="flex items-start space-x-1.5 lg:space-x-2.5">
                      <div className="flex-shrink-0 w-3.5 h-3.5 lg:w-5 lg:h-5 mt-0.5">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                          <path d={svgPaths.p3cd23900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M9 11L12 14L22 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-base leading-4 lg:leading-6">Custom-manufactured for perfect fit</p>
                    </div>

                    {/* Benefit 3 */}
                    <div className="flex items-start space-x-1.5 lg:space-x-2.5">
                      <div className="flex-shrink-0 w-3.5 h-3.5 lg:w-5 lg:h-5 mt-0.5">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                          <path d={svgPaths.p3cd23900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M9 11L12 14L22 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-base leading-4 lg:leading-6">Heat & dust insulation for UAE climate</p>
                    </div>

                    {/* Benefit 4 */}
                    <div className="flex items-start space-x-1.5 lg:space-x-2.5">
                      <div className="flex-shrink-0 w-3.5 h-3.5 lg:w-5 lg:h-5 mt-0.5">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                          <path d={svgPaths.p3cd23900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M9 11L12 14L22 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-base leading-4 lg:leading-6">Professional installation with 10-year warranty</p>
                    </div>

                    {/* Benefit 5 */}
                    <div className="flex items-start space-x-1.5 lg:space-x-2.5">
                      <div className="flex-shrink-0 w-3.5 h-3.5 lg:w-5 lg:h-5 mt-0.5">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                          <path d={svgPaths.p3cd23900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M9 11L12 14L22 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </div>
                      <p className="font-['Barlow',sans-serif] text-xs lg:text-base leading-4 lg:leading-6">European quality systems from AED 800/sqm</p>
                    </div>
                  </div>

                  {/* CTA Button for Mobile */}
                  <div className="pt-2 lg:hidden">
                    <CTADecoration>
                      <button
                        onClick={handleMobileCTA}
                        className="w-full bg-[#008873] text-white px-5 py-2.5 rounded-lg font-['Rajdhani',sans-serif] text-xs font-medium hover:bg-white hover:text-[#008873] hover:ring-2 hover:ring-[#008873] active:scale-95 transition-all duration-200 shadow-xl"
                      >
                        Start Your Swiftrooms Journey
                      </button>
                    </CTADecoration>
                  </div>

                  {/* Bottom Tagline */}
                  <div className="pt-2 lg:pt-8">
                    <p className="font-['Exo',sans-serif] text-[10px] lg:text-base font-medium tracking-[0.12em] lg:tracking-[0.2em] uppercase">
                      Glass & Aluminium Systems Built for Extreme Gulf Conditions
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hero-form"
                  initial={{ 
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                  }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="lg:hidden"
                >
                  {/* Back Button */}
                  <button
                    onClick={() => setShowMobileForm(false)}
                    className="mb-4 text-white text-sm font-['Barlow',sans-serif] flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                  </button>
                  
                  <LeadForm autoOpen={true} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side - Lead Form (Desktop only) */}
          <div className="hidden lg:block lg:pl-6">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}