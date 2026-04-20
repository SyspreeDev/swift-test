import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Gem, Home, ChevronRight, X, Check, Sparkles } from 'lucide-react';
import { ProblemsCADElements } from './CADFloatingElements';
import { CTADecoration } from './InteractiveDecorations';

export function ProblemsAndSolutionsSection() {
  const [activeTab, setActiveTab] = useState<'problems' | 'solutions'>('problems');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [isTouching, setIsTouching] = useState(false);

  // Track scroll position for active card indicator
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.80; // 80vw per card
      const newActiveCard = Math.round(scrollLeft / cardWidth);
      setActiveCard(Math.min(newActiveCard, 2)); // Max 3 cards (index 0-2)
    };

    // Use passive listener for better Android performance
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimize touch interactions for iOS and Android
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleTouchStart = () => {
      setIsTouching(true);
    };

    const handleTouchEnd = () => {
      setIsTouching(false);
    };

    // Add passive touch listeners for better performance
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  // Scroll to specific card function
  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const cardWidth = container.offsetWidth * 0.75;
    const gap = 12; // gap-3 = 12px
    const scrollPosition = index * (cardWidth + gap);
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="challenges" className="relative bg-white min-h-screen overflow-hidden lg:snap-center flex items-center">
      {/* CAD Floating Elements */}
      <ProblemsCADElements />
      
      <div className="container mx-auto px-4 relative z-10 py-6 lg:py-8 w-full">
        
        {/* Main Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 lg:mb-8"
        >
          <h2 className="font-['Exo',sans-serif] text-xl lg:text-4xl font-bold text-[#1c1c1e] mb-2 lg:mb-3">
            Transform Your Space
          </h2>
          <p className="font-['Barlow',sans-serif] text-xs lg:text-lg text-[#3a3a3c] max-w-2xl mx-auto">
            From common problems to premium solutions - experience the SWIFTROOMS difference
          </p>
        </motion.div>

        {/* Problem Cards - Horizontal Scroll */}
        <div className="relative mb-6 lg:mb-10">
          {/* Swipe hint for mobile */}
          <div className="lg:hidden text-center mb-3">
            <p className="font-['Barlow',sans-serif] text-xs text-gray-400 flex items-center justify-center gap-1.5 animate-pulse">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8L22 12L18 16M6 8L2 12L6 16"/>
              </svg>
              Swipe to explore
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8L22 12L18 16M6 8L2 12L6 16"/>
              </svg>
            </p>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex lg:grid lg:grid-cols-3 gap-3 lg:gap-5 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 snap-x snap-mandatory lg:snap-none hide-scrollbar lg:max-w-5xl lg:mx-auto"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x',
              scrollBehavior: 'auto',
              willChange: 'scroll-position',
              overscrollBehavior: 'contain',
            }}
          >
            {/* Card 1: Performance windows & doors */}
            <div className="min-w-[80vw] max-w-[80vw] lg:min-w-0 lg:max-w-none lg:w-auto snap-center lg:snap-align-none flex-shrink-0 px-2"
              style={{ touchAction: 'pan-x' }}
            >
              <div className="bg-[#fff7ed] rounded-xl p-4 lg:p-6 h-full border-2 border-orange-100 lg:hover:shadow-xl lg:hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center pointer-events-none">
                <div className="mb-3 bg-orange-100 w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center lg:group-hover:scale-110 transition-transform duration-300">
                  {/* Custom Shield + Window Icon */}
                  <svg 
                    className="w-6 h-6 lg:w-7 lg:h-7 pointer-events-none" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Shield outline */}
                    <path 
                      d="M12 2L4 6V11C4 16 7.5 20.5 12 22C16.5 20.5 20 16 20 11V6L12 2Z" 
                      stroke="#008873" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    {/* Window frame inside shield */}
                    <rect 
                      x="9" 
                      y="9" 
                      width="6" 
                      height="7" 
                      stroke="#008873" 
                      strokeWidth="1.5" 
                      fill="none"
                    />
                    {/* Window cross divider - vertical */}
                    <line 
                      x1="12" 
                      y1="9" 
                      x2="12" 
                      y2="16" 
                      stroke="#008873" 
                      strokeWidth="1.5"
                    />
                    {/* Window cross divider - horizontal */}
                    <line 
                      x1="9" 
                      y1="12.5" 
                      x2="15" 
                      y2="12.5" 
                      stroke="#008873" 
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <h3 className="font-['Exo',sans-serif] text-base lg:text-xl font-semibold text-[#1c1c1e] mb-2">
                  Performance windows & doors
                </h3>
                <p className="font-['Barlow',sans-serif] text-xs lg:text-base text-gray-600 leading-relaxed">
                  Engineered to perform. Built to outlast.
                </p>
              </div>
            </div>

            {/* Card 2: Panoramic Slim Sliding Systems */}
            <div className="min-w-[80vw] max-w-[80vw] lg:min-w-0 lg:max-w-none lg:w-auto snap-center lg:snap-align-none flex-shrink-0 px-2"
              style={{ touchAction: 'pan-x' }}
            >
              <div className="bg-[#fef2f2] rounded-xl p-4 lg:p-6 h-full border-2 border-red-100 lg:hover:shadow-xl lg:hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center pointer-events-none">
                <div className="mb-3 bg-red-100 w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center lg:group-hover:scale-110 transition-transform duration-300">
                  <Gem className="w-6 h-6 lg:w-7 lg:h-7 text-[#008873] stroke-[2] pointer-events-none" />
                </div>
                <h3 className="font-['Exo',sans-serif] text-base lg:text-xl font-semibold text-[#1c1c1e] mb-2">
                  Panoramic Slim Sliding Systems
                </h3>
                <p className="font-['Barlow',sans-serif] text-xs lg:text-base text-gray-600 leading-relaxed">
                  Ultra-slim profiles. Seamless design. Maximum light.
                </p>
              </div>
            </div>

            {/* Card 3: Garden rooms & extensions */}
            <div className="min-w-[80vw] max-w-[80vw] lg:min-w-0 lg:max-w-none lg:w-auto snap-center lg:snap-align-none flex-shrink-0 px-2"
              style={{ touchAction: 'pan-x' }}
            >
              <div className="bg-[#eff6ff] rounded-xl p-4 lg:p-6 h-full border-2 border-blue-100 lg:hover:shadow-xl lg:hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center text-center pointer-events-none">
                <div className="mb-3 bg-blue-100 w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center lg:group-hover:scale-110 transition-transform duration-300">
                  {/* Custom Greenhouse Icon */}
                  <svg 
                    className="w-6 h-6 lg:w-7 lg:h-7 pointer-events-none" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Greenhouse roof - triangular */}
                    <path 
                      d="M12 3L4 10H20L12 3Z" 
                      stroke="#008873" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      fill="none"
                    />
                    {/* Greenhouse walls */}
                    <path 
                      d="M4 10V19C4 19.5 4.5 20 5 20H19C19.5 20 20 19.5 20 19V10" 
                      stroke="#008873" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    {/* Center vertical divider */}
                    <line 
                      x1="12" 
                      y1="3" 
                      x2="12" 
                      y2="20" 
                      stroke="#008873" 
                      strokeWidth="1.5"
                    />
                    {/* Left panel */}
                    <line 
                      x1="8" 
                      y1="10" 
                      x2="8" 
                      y2="20" 
                      stroke="#008873" 
                      strokeWidth="1.5"
                    />
                    {/* Right panel */}
                    <line 
                      x1="16" 
                      y1="10" 
                      x2="16" 
                      y2="20" 
                      stroke="#008873" 
                      strokeWidth="1.5"
                    />
                    {/* Plant inside - simple leaves */}
                    <path 
                      d="M10 17C10 17 10.5 15 12 15C13.5 15 14 17 14 17" 
                      stroke="#008873" 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle 
                      cx="12" 
                      cy="18" 
                      r="0.8" 
                      fill="#008873"
                    />
                  </svg>
                </div>
                <h3 className="font-['Exo',sans-serif] text-base lg:text-xl font-semibold text-[#1c1c1e] mb-2">
                  Garden rooms & extensions
                </h3>
                <p className="font-['Barlow',sans-serif] text-xs lg:text-base text-gray-600 leading-relaxed">
                  Transform unused space into living space.
                </p>
              </div>
            </div>
          </div>
          
          {/* Mobile Scroll Indicator */}
          <div className="flex justify-center gap-1.5 lg:hidden mt-3">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className={`transition-all duration-300 ${
                  activeCard === i 
                    ? 'bg-[#007969] w-6 h-1.5' 
                    : 'bg-gray-300 hover:bg-[#007969]/50 w-1.5 h-1.5'
                } rounded-full`}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Solutions Comparison Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4 lg:mb-6">
            <h3 className="font-['Exo',sans-serif] text-lg lg:text-3xl font-bold text-[#1c1c1e]">
              The SWIFTROOMS Solution
            </h3>
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden flex p-1 bg-gray-100 rounded-xl mb-4 mx-auto max-w-sm">
            <button
              onClick={() => setActiveTab('problems')}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === 'problems' 
                  ? 'bg-white text-red-600 shadow-md' 
                  : 'text-gray-500 hover:text-white hover:bg-red-500'
              }`}
            >
              Problems
            </button>
            <button
              onClick={() => setActiveTab('solutions')}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === 'solutions' 
                  ? 'bg-[#007969] text-white shadow-md' 
                  : 'text-gray-500 hover:text-white hover:bg-[#007969]'
              }`}
            >
              Solutions
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
            {/* Left Side - Problems */}
            <motion.div 
              className={`space-y-4 ${activeTab === 'problems' ? 'block' : 'hidden lg:block'}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl p-4 lg:p-6 border-2 border-gray-100 shadow-lg h-full">
                <h4 className="font-['Barlow',sans-serif] text-base lg:text-2xl font-semibold text-[#1c1c1e] mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm">✗</span>
                  Common Frustrations
                </h4>
                
                <div className="space-y-2">
                  {[
                    "Excessive heat penetration",
                    "Sound resistance for improved acoustic performance",
                    "Better air tightness",
                    "Skyrocketing AC bills",
                    "Making use of unused space"
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-red-100 flex items-center justify-center">
                        <X className="w-3 h-3 text-red-600" />
                      </div>
                      <p className="font-['Barlow',sans-serif] text-gray-700 text-xs lg:text-base">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Solutions */}
            <motion.div 
              className={`${activeTab === 'solutions' ? 'block' : 'hidden lg:block'}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-[#007969] to-[#005a50] rounded-xl p-4 lg:p-6 text-white h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-xl lg:blur-3xl -translate-y-1/2 translate-x-1/2 transition-opacity duration-700 group-hover:opacity-75" />
                
                <h4 className="relative z-10 font-['Barlow',sans-serif] text-base lg:text-2xl font-semibold mb-2 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center text-sm">✓</span>
                  SWIFTROOMS Advantage
                </h4>
                
                <p className="relative z-10 font-['Barlow',sans-serif] text-white/90 mb-4 text-xs lg:text-base leading-relaxed">
                  Engineered specifically for UAE climate conditions, our premium aluminum systems transform your living experience.
                </p>

                <div className="relative z-10 space-y-2 mb-4">
                  {[
                    "Advanced solar-control glazing reduces excessive heat penetration.",
                    "High-performance double and triple glazing improves acoustic insulation.",
                    "Multi-point locking and triple gasket systems enhance air tightness and sealing.",
                    "Thermally broken aluminium profiles minimise heat transfers",
                    "Acoustic laminated glass significantly reduces outside noise.",
                    "Garden rooms and extensions transform unused space into valuable living areas."
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[#00a63e] flex items-center justify-center shadow-lg">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="font-['Barlow',sans-serif] text-white text-xs lg:text-base">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 pt-3 border-t border-white/20">
                  <CTADecoration>
                    <button
                      onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                      className="w-full bg-white text-[#007969] px-4 py-2.5 lg:py-3 rounded-lg font-['Rajdhani',sans-serif] text-sm lg:text-base font-bold hover:bg-[#007969] hover:text-white hover:shadow-2xl active:scale-95 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 group/btn"
                    >
                      Explore Our Products
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </CTADecoration>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
      
      {/* Decorative gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}