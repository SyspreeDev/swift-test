import { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'motion/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import svgPaths from '../../imports/svg-odqll2j1e4';
import img21 from "../../assets/img21.png";
import img18 from "../../assets/img18.png";
import { FloatingOrnament } from './FloatingOrnament';
import { ImmersiveBackgroundAnimations } from './ImmersiveBackgroundAnimations';

// SCHÜCO Logo (Asset 17)
function SchucoLogo() {
  return (
    <svg className="w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 206 34">
      <g>
        <path d={svgPaths.p32ea0800} fill="white" />
      </g>
    </svg>
  );
}

// Deceuninck Logo (Asset 21)
function DeceuninckLogo() {
  return (
    <svg className="w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 192.012 37.003">
      <g>
        <path d={svgPaths.p5e37600} fill="white" />
      </g>
    </svg>
  );
}

// CORTIZO Logo
function CortizoLogo() {
  return (
    <svg className="w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 240.223 60">
      <g>
        <path clipRule="evenodd" d={svgPaths.p33db00} fill="white" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p2d37bd00} fill="white" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p364e7e00} fill="white" fillRule="evenodd" />
        <path clipRule="evenodd" d={svgPaths.p341fac00} fill="white" fillRule="evenodd" />
        <g>
          <path clipRule="evenodd" d={svgPaths.p3d94d800} fill="white" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p1b98c000} fill="white" fillRule="evenodd" />
        </g>
      </g>
    </svg>
  );
}

interface BrandLogoProps {
  children: React.ReactNode;
  name: string;
}

function BrandLogo({ children, name }: BrandLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!logoRef.current || !isHovered) return;
      
      const rect = logoRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const offsetX = (e.clientX - centerX) / 30;
      const offsetY = (e.clientY - centerY) / 30;
      
      setParallaxOffset({ x: offsetX, y: offsetY });
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  return (
    <motion.div
      ref={logoRef}
      className="px-4 lg:px-8 py-6 flex items-center justify-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setParallaxOffset({ x: 0, y: 0 });
      }}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        setIsHovered(false);
        setParallaxOffset({ x: 0, y: 0 });
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 1.1 }}
      animate={{
        x: parallaxOffset.x,
        y: parallaxOffset.y,
      }}
      transition={{
        scale: { duration: 0.3, ease: "easeOut" },
        x: { duration: 0.2, ease: "easeOut" },
        y: { duration: 0.2, ease: "easeOut" },
      }}
    >
      <motion.div
        className="w-full max-w-[240px] lg:max-w-[220px] h-20 lg:h-16"
        animate={{
          filter: isHovered ? "brightness(1.2)" : "brightness(1)",
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export const BrandsSection = memo(function BrandsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const brands = [
    { name: 'SCHÜCO', component: <SchucoLogo /> },
    { name: 'Deceuninck', component: <DeceuninckLogo /> },
    { name: 'Gulf Extrusions (GEX)', component: <img src={img21} alt="Gulf Extrusions (GEX)" className="w-full h-full object-contain" /> },
    { name: 'VETROMAX', component: <img src={img18} alt="VETROMAX Aluminium Minimalist Systems" className="w-full h-full object-contain" /> },
    { name: 'CORTIZO', component: <CortizoLogo /> },
  ];

  // Handle scroll to update active dot on mobile
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.offsetWidth;
      const newActiveSlide = Math.round(scrollLeft / slideWidth);
      setActiveSlide(newActiveSlide);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dot click to scroll to specific slide
  const scrollToSlide = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const slideWidth = container.offsetWidth;
    container.scrollTo({
      left: slideWidth * index,
      behavior: 'smooth'
    });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          speed: 2500,
          dots: false,
        }
      }
    ]
  };

  return (
    <section id="brands" className="relative bg-[#007969] min-h-screen overflow-hidden lg:snap-center flex items-center">
      <div className="container mx-auto px-4 py-8 lg:py-12 w-full">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6 lg:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Exo',sans-serif] text-xl lg:text-4xl font-medium text-white uppercase tracking-wide">
            Brands We Work With
          </h2>
        </motion.div>

        {/* Mobile: Horizontal Scroll */}
        <div className="lg:hidden">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x',
              scrollBehavior: 'auto',
              willChange: 'scroll-position',
              overscrollBehavior: 'contain',
              pointerEvents: 'auto',
            }}
          >
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 min-w-[80vw] max-w-[80vw] snap-center px-2"
                style={{ touchAction: 'pan-x' }}
              >
                <div className="pointer-events-none">
                  <BrandLogo name={brand.name}>
                    {brand.component}
                  </BrandLogo>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {brands.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`transition-all duration-300 ${
                  activeSlide === index
                    ? 'bg-white w-8 h-2'
                    : 'bg-white/40 hover:bg-white/60 w-2 h-2'
                } rounded-full`}
                aria-label={`Go to brand ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: React Slick Carousel */}
        <motion.div
          className="hidden lg:block brands-carousel"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Slider {...settings}>
            {brands.map((brand, index) => (
              <BrandLogo key={index} name={brand.name}>
                {brand.component}
              </BrandLogo>
            ))}
          </Slider>
        </motion.div>
      </div>

      <style>{`
        .brands-carousel .slick-track {
          display: flex;
          align-items: center;
        }
        
        .brands-carousel .slick-slide {
          height: auto;
        }
        
        .brands-carousel .slick-slide > div {
          height: 100%;
        }

        /* Custom carousel styling for smooth appearance */
        .brands-carousel .slick-list {
          overflow: hidden;
        }

        /* Hide scrollbar for mobile horizontal scroll */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
});