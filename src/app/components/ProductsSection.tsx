import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import { ProductsCADElements } from './CADFloatingElements';
import { CTADecoration } from './InteractiveDecorations';
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.png";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Aluminum Sliding Doors',
    description: 'Sleek sliding doors with smooth operation, perfect for balconies and terraces.',
    imageUrl: img1,
    category: 'Doors'
  },
  {
    id: 2,
    name: 'Bi-Fold Doors',
    description: 'Premium folding doors that seamlessly connect indoor and outdoor spaces.',
    imageUrl: img2,
    category: 'Doors'
  },
  {
    id: 3,
    name: 'Aluminum Windows',
    description: 'Energy-efficient aluminum windows with superior thermal insulation and modern design.',
    imageUrl: img3,
    category: 'Windows'
  },
  {
    id: 4,
    name: 'UPVC Windows and Doors',
    description: 'Low-maintenance UPVC windows and doors with exceptional durability, thermal efficiency, and security features.',
    imageUrl: img4,
    category: 'Windows & Doors'
  },
  {
    id: 5,
    name: 'Skylights and Garden Rooms',
    description: 'Premium roof windows and skylights that flood interiors with natural light.',
    imageUrl: img5,
    category: 'Outdoor Spaces'
  },
];

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#007969] rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#007969] rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTouchStart = () => {
    setIsTouched(true);
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsTouched(false);
      setIsHovered(false);
    }, 3000); // Keep content visible for 3 seconds on mobile
  };

  // Get image positioning styles based on product ID (matching Figma design board)
  const getImageStyle = () => {
    switch (product.id) {
      case 1: // Aluminum Sliding Doors
        return { className: 'absolute inset-0 max-w-none object-cover pointer-events-none size-full' };
      case 2: // Bi-Fold Doors
        return { 
          className: 'absolute max-w-none pointer-events-none w-full',
          style: { height: '220.31%', left: '-0.03%', top: '-76.92%' }
        };
      case 3: // Aluminum Windows
        return { 
          className: 'absolute max-w-none pointer-events-none w-full',
          style: { height: '146.88%', left: '0', top: '-6.94%' }
        };
      case 4: // UPVC Windows and Doors
        return { 
          className: 'absolute max-w-none pointer-events-none w-full',
          style: { height: '146.88%', left: '0', top: '-16.11%' }
        };
      case 5: // Skylights and Garden Rooms
        return { 
          className: 'absolute max-w-none pointer-events-none w-full',
          style: { height: '110.16%', left: '0', top: '0.16%' }
        };
      default:
        return { className: 'absolute inset-0 max-w-none object-cover pointer-events-none size-full' };
    }
  };

  const imageConfig = getImageStyle();

  return (
    <div className="px-2 sm:px-3 lg:px-4 py-2 sm:py-4">
      <motion.div
        className="relative overflow-hidden rounded-lg sm:rounded-2xl bg-white shadow-lg cursor-pointer h-full pointer-events-none lg:pointer-events-auto"
        onMouseEnter={() => !isTouched && !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isTouched && !isMobile && setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Container */}
        <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.img
              src={product.imageUrl}
              alt={product.name}
              className={imageConfig.className}
              style={imageConfig.style}
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
          
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
            animate={{
              opacity: isHovered ? 1 : 0.85,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Category Badge */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
            <span className="bg-[#007969] text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-['Inter',sans-serif] font-medium shadow-lg">
              {product.category}
            </span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 lg:p-6">
            <motion.h3
              className="font-['Exo',sans-serif] text-sm sm:text-xl lg:text-2xl font-medium text-white mb-1 sm:mb-2 leading-tight"
              animate={{
                y: isHovered ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {product.name}
            </motion.h3>
            
            <motion.p
              className="font-['Barlow',sans-serif] text-[10px] sm:text-base text-white/90 leading-snug sm:leading-relaxed mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0.7,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3 }}
            >
              {product.description}
            </motion.p>

            {/* Get A Quote Button - Always visible, no animation on mobile */}
            <CTADecoration>
              <motion.button
                className="mt-2 sm:mt-4 bg-white text-[#007969] px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-lg font-['Rajdhani',sans-serif] font-medium hover:bg-[#007969] hover:text-white hover:ring-2 hover:ring-white hover:shadow-xl active:scale-95 transition-all duration-300 text-xs sm:text-base shadow-lg pointer-events-auto"
                initial={false}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  const formSection = document.getElementById('contact-form');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get A Quote
              </motion.button>
            </CTADecoration>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProductsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

    // Use passive listener for better Android performance
    container.addEventListener('scroll', handleScroll, { passive: true });
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
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section id="products" className="relative bg-gray-50 min-h-screen overflow-hidden lg:snap-center flex items-center">
      {/* CAD Floating Elements */}
      <ProductsCADElements />
      
      <div className="container mx-auto px-3 sm:px-4 relative z-10 py-4 lg:py-0">
        {/* Section Header */}
        <motion.div
          className="text-center mb-3 lg:mb-16 px-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Exo',sans-serif] text-base lg:text-4xl font-medium text-[#1c1c1e] mb-1 lg:mb-3">
            Our Premium Products
          </h2>
          <p className="font-['Barlow',sans-serif] text-[10px] lg:text-xl text-[#3a3a3c] max-w-2xl mx-auto px-4">
            High-quality aluminum and UPVC solutions for UAE's climate
          </p>
        </motion.div>

        {/* Mobile: Horizontal Scroll */}
        <div className="lg:hidden">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
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
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 min-w-[80vw] max-w-[80vw] snap-center px-2"
                style={{ touchAction: 'pan-x' }}
              >
                <div className="pointer-events-none">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`transition-all duration-300 ${
                  activeSlide === index
                    ? 'bg-[#007969] w-8 h-2'
                    : 'bg-gray-300 hover:bg-[#007969]/50 w-2 h-2'
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: React Slick Carousel */}
        <motion.div
          className="hidden lg:block products-carousel relative pb-8 sm:pb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Slider {...settings}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Slider>
        </motion.div>
      </div>

      <style>{`
        .products-carousel .slick-dots {
          bottom: -20px;
        }
        
        @media (min-width: 640px) {
          .products-carousel .slick-dots {
            bottom: -40px;
          }
        }
        
        .products-carousel .slick-dots li button:before {
          color: #007969;
          font-size: 6px;
        }
        
        @media (min-width: 640px) {
          .products-carousel .slick-dots li button:before {
            font-size: 10px;
          }
        }
        
        .products-carousel .slick-dots li.slick-active button:before {
          color: #007969;
          opacity: 1;
        }

        .products-carousel .slick-track {
          display: flex;
          align-items: stretch;
        }
        
        .products-carousel .slick-slide {
          height: auto;
        }
        
        .products-carousel .slick-slide > div {
          height: 100%;
        }

        /* Hide scrollbar for mobile horizontal scroll */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}