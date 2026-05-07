// import { useState, useEffect, useCallback, useRef } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import { LeadForm } from './LeadForm';
// import svgPaths from '../../imports/svg-xtdnlxzlx3';
// import { HeroCADElements } from './CADFloatingElements';
// import { CTADecoration } from './InteractiveDecorations';

// interface HeroSectionProps {
//   enableVideo?: boolean;
//   videoUrl?: string;
//   mobileVideoUrl?: string;
// }

// function NativeVideo({ isVisible }: { isVisible: boolean }) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [canAutoplay, setCanAutoplay] = useState(false);

//   // Test autoplay capability
//   useEffect(() => {
//     const testVideo = document.createElement('video');
//     testVideo.muted = true;
//     testVideo.playsInline = true;
//     const promise = testVideo.play();
//     if (promise !== undefined) {
//       promise.then(() => {
//         setCanAutoplay(true);
//       }).catch(() => {
//         setCanAutoplay(false);
//       });
//     }
//   }, []);

//   // Load video when section becomes visible
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video || !isVisible || isLoaded) return;

//     video.load();
//     setIsLoaded(true);
//   }, [isVisible, isLoaded]);

//   // Control playback based on visibility
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video || !isLoaded || !canAutoplay) return;

//     if (isVisible) {
//       video.play().catch(() => {
//         // Autoplay failed, video will show poster
//         console.log('Video autoplay failed');
//       });
//     } else {
//       video.pause();
//     }
//   }, [isVisible, isLoaded, canAutoplay]);

//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       <video
//         ref={videoRef}
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-110 object-cover"
//         style={{ width: '120vw', height: '120vh', minWidth: '100vw', minHeight: '100vh' }}
//         muted
//         loop
//         playsInline
//         preload="none"
//         poster="/videos/logo-swift.png"
//       >
//         <source src="/videos/hero-video.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// }

// export function HeroSection({ enableVideo = false, videoUrl, mobileVideoUrl }: HeroSectionProps) {
//   const [showMobileForm, setShowMobileForm] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLElement>(null);

//   // Intersection Observer for interactive section playback
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.6);
//       },
//       { threshold: [0.25, 0.5, 0.6, 0.75], rootMargin: '0px 0px -15% 0px' }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   // Mobile detection and scroll handling
//   useEffect(() => {
//     setIsMobile(window.innerWidth < 1024);
//     window.scrollTo(0, 0);
//     document.documentElement.scrollTop = 0;
//     document.body.scrollTop = 0;
//     let prevMobile = window.innerWidth < 1024;
//     const onResize = () => {
//       const cur = window.innerWidth < 1024;
//       setIsMobile(cur);
//       if (prevMobile !== cur) {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//         prevMobile = cur;
//       }
//     };
//     window.addEventListener('resize', onResize, { passive: true });
//     return () => window.removeEventListener('resize', onResize);
//   }, []);

//   const handleMobileCTA = useCallback(() => {
//     setShowMobileForm(true);
//     setTimeout(() => {
//       document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth' });
//     }, 100);
//   }, []);

//   const benefits = [
//     'Free quote & site visit within 24 hours',
//     'Custom-manufactured for perfect fit',
//     'Heat & dust insulation for UAE climate',
//     'Professional installation with 10-year warranty',
//     'European quality systems from AED 800/sqm',
//   ];

//   return (
//     <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center justify-center lg:snap-center">
//       <HeroCADElements />

//       {/* Video / Poster background — only load when section is visible */}
//       {enableVideo && (
//         <div className="absolute inset-0 overflow-hidden">
//           <NativeVideo isVisible={isVisible} />
//           <div className="absolute inset-0 bg-[#007969]/60 pointer-events-none" />
//         </div>
//       )}

//       {!enableVideo && <div className="absolute inset-0 bg-[#007969]" />}

//       <div className="relative z-10 container mx-auto px-4 lg:px-6 w-full py-6 lg:py-0">
//         <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
//           <div className="text-white space-y-3 lg:space-y-6">
//             <AnimatePresence mode="wait">
//               {!showMobileForm ? (
//                 <motion.div
//                   key="hero-content"
//                   initial={{ opacity: 1 }}
//                   exit={{ opacity: 0, scale: 0.95, y: -20 }}
//                   transition={{ duration: 0.4, ease: 'easeInOut' }}
//                   className="space-y-3 lg:space-y-6"
//                 >
//                   <h1 className="font-['Exo',sans-serif] text-sm lg:text-2xl xl:text-3xl font-semibold leading-tight tracking-[0.12em] lg:tracking-[0.15em] uppercase">
//                     <span className="block whitespace-nowrap">Performance Windows Doors</span>{' '}
//                     <span className="block whitespace-nowrap">Engineered for Excellence &</span>{' '}
//                     <span className="block whitespace-nowrap">Book Your Showroom Visit Today</span>
//                   </h1>

//                   <div className="space-y-1.5 lg:space-y-3 pt-0.5 lg:pt-2">
//                     {benefits.map((b) => (
//                       <div key={b} className="flex items-start space-x-1.5 lg:space-x-2.5">
//                         <div className="flex-shrink-0 w-3.5 h-3.5 lg:w-5 lg:h-5 mt-0.5">
//                           <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
//                             <path d={svgPaths.p3cd23900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                             <path d="M9 11L12 14L22 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
//                           </svg>
//                         </div>
//                         <p className="font-['Barlow',sans-serif] text-xs lg:text-base leading-4 lg:leading-6">{b}</p>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="pt-2 lg:hidden">
//                     <CTADecoration>
//                       <button
//                         onClick={handleMobileCTA}
//                         className="w-full bg-[#008873] text-white px-5 py-2.5 rounded-lg font-['Rajdhani',sans-serif] text-xs font-medium hover:bg-white hover:text-[#008873] hover:ring-2 hover:ring-[#008873] active:scale-95 transition-all duration-200 shadow-xl"
//                       >
//                         Start Your Swiftrooms Journey
//                       </button>
//                     </CTADecoration>
//                   </div>

//                   <div className="pt-2 lg:pt-8">
//                     <p className="font-['Exo',sans-serif] text-[10px] lg:text-base font-medium tracking-[0.12em] lg:tracking-[0.2em] uppercase">
//                       Glass & Aluminium Systems Built for Extreme Gulf Conditions
//                     </p>
//                   </div>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="hero-form"
//                   initial={{ opacity: 0, scale: 0.9, y: 20 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   transition={{ duration: 0.5, ease: 'easeOut' }}
//                   className="lg:hidden"
//                 >
//                   <button
//                     onClick={() => setShowMobileForm(false)}
//                     className="mb-4 text-white text-sm font-['Barlow',sans-serif] flex items-center gap-2 hover:opacity-80 transition-opacity"
//                   >
//                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                     </svg>
//                     Back to Home
//                   </button>
//                   <LeadForm autoOpen={true} />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           <div className="hidden lg:block lg:pl-6">
//             <LeadForm />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LeadForm } from "./LeadForm";
import svgPaths from "../../imports/svg-xtdnlxzlx3";
import { HeroCADElements } from "./CADFloatingElements";
import { CTADecoration } from "./InteractiveDecorations";

interface HeroSectionProps {
  enableVideo?: boolean;
  localVideoUrl?: string;
  videoUrl?: string;
  mobileVideoUrl?: string;
}

function getVideoId(url: string): string {
  if (!url) return "";
  // If it's already an ID (11 chars), just return it
  if (url.length === 11) return url;

  // Otherwise, parse it
  const match = url.match(
    /(?:embed\/|v=|v\/|vi\/|youtu\.be\/|watch\?v=)([^#&?]*).*/,
  );
  return match && match[1] ? match[1] : url;
}

// ─── Deferred YouTube background ─────────────────────────────────────────────
//
// Problem with naive iframe: YouTube loads ~500KB JS + spins up workers
// immediately, competing with your page's own JS on the same thread.
//
// Strategy:
//   1. Show a static poster JPG on load  (zero YouTube cost)
//   2. After requestIdleCallback fires, inject the iframe with opacity:0
//      so it buffers without being composited on screen
//   3. After 2s, fade poster out and iframe in together
//
// Extra GPU savings in the URL:
//   - vq=hd720 / vq=medium  → caps YouTube's adaptive quality so it can't
//     silently jump to 4K on a large monitor (biggest source of GPU spikes)
//   - enablejsapi=0          → stops YouTube firing postMessage on every
//     animation frame (up to 60 calls/s hitting your main thread)
//   - www.youtube.com        → NOT youtube-nocookie.com which some networks block
//
function DeferredYouTube({
  videoUrl,
  mobileVideoUrl,
  isMobile,
}: {
  videoUrl: string;
  mobileVideoUrl: string;
  isMobile: boolean;
}) {
  const [showIframe, setShowIframe] = useState(false);
  const [iframeVisible, setIframeVisible] = useState(false);
  const [posterVisible, setPosterVisible] = useState(true);

  const activeUrl = isMobile ? mobileVideoUrl : videoUrl;
  const videoId = getVideoId(activeUrl);
  const quality = isMobile ? "medium" : "hd720";

  const src = [
    `https://www.youtube-nocookie.com/embed/${videoId}`,
    `?autoplay=1&mute=1&loop=1&playlist=${videoId}`,
    `&controls=0&showinfo=0&rel=0&modestbranding=1`,
    `&playsinline=1&enablejsapi=0&vq=${quality}`,
  ].join("");

  useEffect(() => {
    let idleHandle: number;
    let crossFadeTimer: ReturnType<typeof setTimeout>;

    const injectIframe = () => {
      setShowIframe(true);
      // Give the player 2s to buffer before showing it
      crossFadeTimer = setTimeout(() => {
        setIframeVisible(true);
        setTimeout(() => setPosterVisible(false), 500);
      }, 2000);
    };

    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(injectIframe, { timeout: 3000 });
    } else {
      idleHandle = window.setTimeout(injectIframe, 2000) as unknown as number;
    }

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      } else {
        window.clearTimeout(idleHandle);
      }
      clearTimeout(crossFadeTimer);
    };
  }, [videoId]); // Re-run if videoId changes

  return (
    <div className="absolute inset-0 bg-black">
      {/* ── Poster ── */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out z-10"
        style={{ opacity: posterVisible ? 1 : 0 }}
      >
        <img
          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
          }}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── YouTube iframe ── */}
      {showIframe && (
        <div
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: iframeVisible ? 1 : 0 }}
        >
          <iframe
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              // THE MATH FIX: Ensures 16:9 aspect ratio covers the whole screen
              width: "177.77vh",
              height: "56.25vw",
              minWidth: "100%",
              minHeight: "100%",
              // THE PERFORMANCE FIX: Moves rendering to GPU
              transform: "translate(-50%, -50%) translateZ(0)",
              willChange: "opacity, transform",
            }}
            src={src}
            title="Background video"
            allow="autoplay; encrypted-media"
          />
        </div>
      )}
    </div>
  );
}

function LocalVideo({
  src,
  overlayOpacity = 0.4,
}: {
  src: string;
  overlayOpacity?: number;
}) {
  return (
    // Ensure the container is exactly the size of the Hero section
    <div className="absolute inset-0 w-full h-full bg-[#007969] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover object-center"
        style={{
          contain: "strict",
          // The translateZ(0) is critical for performance
          transform: "translateZ(0)",
          willChange: "transform",
          opacity: 0.5,
        }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Hardware-accelerated green tint overlay */}
      <div
        className="absolute inset-0 bg-[#007969] pointer-events-none"
        style={{
          opacity: overlayOpacity,
          transform: "translateZ(1px)",
        }}
      />
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function HeroSection({
  enableVideo = false,
  localVideoUrl,
  videoUrl = "",
  mobileVideoUrl = "",
}: HeroSectionProps) {
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 1024,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    let prev = window.innerWidth < 1024;
    const onResize = () => {
      const cur = window.innerWidth < 1024;
      setIsMobile(cur);
      if (prev !== cur) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        prev = cur;
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleMobileCTA = useCallback(() => {
    if (window.innerWidth < 1024) setShowMobileForm(true);
    else
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
  }, []);

  const benefits = [
    "Free quote & site visit within 24 hours",
    "Custom-manufactured for perfect fit",
    "Heat & dust insulation for UAE climate",
    "Professional installation with 10-year warranty",
    "European quality systems from AED 800/sqm",
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center lg:snap-center overflow-hidden"
    >
      {/* ─── CONSOLIDATED BACKGROUND LOGIC ─── */}
      <div className="absolute inset-0 z-0">
        {enableVideo ? (
          localVideoUrl ? (
            // 1. RAW LOCAL VIDEO (Priority)
            <LocalVideo src={localVideoUrl} overlayOpacity={0.4} />
          ) : (
            // 2. YOUTUBE FALLBACK
            <>
              <DeferredYouTube
                videoUrl={isMobile ? mobileVideoUrl : videoUrl}
                mobileVideoUrl={mobileVideoUrl || videoUrl}
                isMobile={isMobile}
              />
              {/* YouTube Overlay */}
              <div
                className="absolute inset-0 bg-[#007969]/60 pointer-events-none"
                style={{ transform: "translateZ(0)" }}
              />
            </>
          )
        ) : (
          // 3. STATIC BACKGROUND
          <div className="absolute inset-0 bg-[#007969]" />
        )}
      </div>

      {/* Floating CAD Elements - Sits above video, below content */}
      <div className="absolute inset-0 pointer-events-none" style={{ isolation: "isolate", zIndex: 5 }}>
        <HeroCADElements />
      </div>

      {/* ─── CONTENT ─── */}
      <div className="relative z-10 container mx-auto px-4 lg:px-6 w-full py-6 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div className="text-white space-y-3 lg:space-y-6">
            <AnimatePresence mode="wait">
              {!showMobileForm ? (
                <motion.div
                  key="hero-content"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3 lg:space-y-6"
                >
                  <h1 className="font-['Exo',sans-serif] text-sm lg:text-2xl xl:text-3xl font-semibold leading-tight tracking-[0.12em] lg:tracking-[0.15em] uppercase">
                    <span className="block whitespace-nowrap">PERFORMANCE WINDOWS & DOORS</span>
                    <span className="block whitespace-nowrap">ENGINEERED FOR EXCELLENCE</span>
                    <span className="block whitespace-nowrap">BUILT FOR THE UAE CLIMATE</span>
                  </h1>

                  <div className="space-y-1.5 lg:space-y-3 pt-0.5 lg:pt-2">
                    {benefits.map((b) => (
                      <div key={b} className="flex items-start space-x-1.5 lg:space-x-2.5">
                        <div className="flex-shrink-0 w-3.5 h-3.5 lg:w-5 lg:h-5 mt-0.5">
                          <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
                            <path d={svgPaths.p3cd23900} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d="M9 11L12 14L22 4" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </svg>
                        </div>
                        <p className="font-['Barlow',sans-serif] text-xs lg:text-base leading-4 lg:leading-6">{b}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 lg:hidden">
                    <CTADecoration>
                      <button onClick={handleMobileCTA} className="w-full bg-white text-[#008873] px-5 py-2.5 rounded-lg font-['Rajdhani',sans-serif] text-xs font-medium hover:bg-white hover:text-[#008873] active:scale-95 transition-all shadow-xl">
                        Start Your Swiftrooms Journey
                      </button>
                    </CTADecoration>
                  </div>

                  <div className="pt-2 lg:pt-8">
                    <p className="font-['Exo',sans-serif] text-[10px] lg:text-base font-medium tracking-[0.12em] lg:tracking-[0.2em] uppercase">
                      BOOK YOUR SHOWROOM VISIT TODAY
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="hero-form"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="lg:hidden"
                >
                  <button onClick={() => setShowMobileForm(false)} className="mb-4 text-white text-sm font-['Barlow',sans-serif] flex items-center gap-2">
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

          <div className="hidden lg:block lg:pl-6">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
