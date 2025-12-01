import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  ShoppingBag, 
  ShieldCheck,
  Sun, 
  Zap, 
  ArrowRight,
  AlertCircle,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  Droplet
} from 'lucide-react';

/* 
  AARGO Clear Face Serum - Mobile-First Landing Page
  Design School Principles + Scroll Animations
  Focus: Face Serum ONLY - No Distractions
*/

// --- CSS for Scroll Animations ---
const scrollStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse-soft {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  .animate-scroll-in {
    animation: fadeInUp 600ms ease-out forwards;
    opacity: 0;
  }

  .animate-scroll-down {
    animation: fadeInDown 600ms ease-out forwards;
    opacity: 0;
  }

  .animate-scroll-scale {
    animation: scaleIn 600ms ease-out forwards;
    opacity: 0;
  }

  .animate-scroll-left {
    animation: slideInLeft 600ms ease-out forwards;
    opacity: 0;
  }

  .animate-scroll-right {
    animation: slideInRight 600ms ease-out forwards;
    opacity: 0;
  }

  /* Stagger delays */
  .stagger-1 { animation-delay: 0ms; }
  .stagger-2 { animation-delay: 100ms; }
  .stagger-3 { animation-delay: 200ms; }
  .stagger-4 { animation-delay: 300ms; }
  .stagger-5 { animation-delay: 400ms; }

  /* Smooth scroll behavior */
  html {
    scroll-behavior: smooth;
  }

  /* Prevent layout shift on scroll */
  body {
    overflow-x: hidden;
  }
`;

// --- Data ---

const INGREDIENTS = [
  {
    name: "15% Vitamin C",
    icon: <Sun className="w-6 h-6 text-amber-500" />,
    benefit: "THE GLOW GETTER",
    desc: "Fades dullness and age spots without the sting.",
    concentration: "15%",
    benefits: ["Fades dark spots", "Brightens dull skin", "Smooths texture", "Protects from damage"]
  },
  {
    name: "3% Kojic Acid",
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    benefit: "THE SPOT ERASER",
    desc: "Stops melanin in its tracks. Reduces hyperpigmentation in 4 weeks.",
    concentration: "3%",
    benefits: ["Targets melasma", "Reduces marks", "Stops new spots", "Clinically proven"]
  },
  {
    name: "5% Niacinamide",
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    benefit: "THE PORE PERFECTOR",
    desc: "Shrinks pores and smooths texture. Keeps redness at bay.",
    concentration: "5%",
    benefits: ["Minimizes pores", "Strengthens barrier", "Reduces redness", "Mattifies"]
  },
  {
    name: "Green Tea & Aloe",
    icon: <Droplet className="w-6 h-6 text-green-500" />,
    benefit: "THE CALM",
    desc: "Instant relief. Prevents the 'active ingredient burn'.",
    concentration: "Extract",
    benefits: ["Reduces inflammation", "Soothes irritation", "Antioxidant", "Cooling"]
  },
  {
    name: "5% Ceramides",
    icon: <ShieldCheck className="w-6 h-6 text-teal-500" />,
    benefit: "THE PROTECTOR",
    desc: "Locks in hydration. Strengthens the skin barrier.",
    concentration: "5%",
    benefits: ["Locks moisture", "Strengthens barrier", "Prevents TEWL", "Long-term resilience"]
  }
];

const HOW_TO_USE = [
  {
    step: 1,
    title: "Patch Test (Day 1)",
    tips: [
      "Apply 2-3 drops to jawline or behind ear",
      "Wait 24 hours for reaction check",
      "If clear, ready to start"
    ]
  },
  {
    step: 2,
    title: "Ease It In (Week 1-2)",
    tips: [
      "Start PM only: 3-4 drops after cleanser",
      "Apply to clean, dry skin",
      "Follow with moisturizer",
      "Use 3-4x per week"
    ]
  },
  {
    step: 3,
    title: "Make It a Staple (Week 3+)",
    tips: [
      "Introduce AM use same way",
      "Increase to 5-6 drops",
      "Use daily AM + PM as tolerated",
      "Most see visible results by week 4"
    ]
  }
];

const ROUTINE_STEPS = [
  {
    time: "Morning",
    label: "AM Routine",
    steps: [
      { name: "Cleanser", description: "Gentle cream or gel", highlight: false },
      { name: "AARGO Clear Serum", description: "3-5 drops face & neck", highlight: true },
      { name: "Moisturizer", description: "Lightweight or rich", highlight: false },
      { name: "Sunscreen", description: "SPF 30+ (non-negotiable)", highlight: false }
    ]
  },
  {
    time: "Evening",
    label: "PM Routine",
    steps: [
      { name: "Cleanser", description: "Double cleanse if needed", highlight: false },
      { name: "AARGO Clear Serum", description: "3-5 drops face & neck", highlight: true },
      { name: "Moisturizer", description: "Heavier hydrating layer", highlight: false },
      { name: "Optional", description: "Retinoid or treatment", highlight: false }
    ]
  }
];

const REVIEWS = [
  {
    id: 1,
    name: "Melissa H.",
    age: 35,
    skinType: "Combination",
    rating: 5,
    title: "Finally, I stopped using filters.",
    content: "I've spent hundreds on serums. AARGO actually deleted my sun spots. By week 8, confident without concealer.",
    verified: true
  },
  {
    id: 2,
    name: "Jordan T.",
    age: 28,
    skinType: "Acne-Prone",
    rating: 5,
    title: "Zero breakouts. Just glow.",
    content: "Vitamin C usually destroys my skin. This works like magic. Post-acne scars are fading, no breakouts.",
    verified: true
  },
  {
    id: 3,
    name: "Priya S.",
    age: 31,
    skinType: "Sensitive",
    rating: 5,
    title: "Potent but gentle.",
    content: "How is something this strong so soothing? My redness is gone, skin texture is basically glass now.",
    verified: true
  }
];

const FAQS = [
  {
    category: "General Use",
    items: [
      {
        q: "Will it burn my sensitive skin?",
        a: "No. We buffered high-strength Vitamin C with Aloe and Niacinamide to prevent stinging. Power without pain."
      },
      {
        q: "How fast will I see results?",
        a: "Instant: Hydration & smoothness. 2 Weeks: Brighter tone. 4-6 Weeks: Visible dark spot reduction."
      },
      {
        q: "Can I ditch my other serums?",
        a: "Yes. This replaces your Vitamin C, Niacinamide, and Hydrating serums. It's a 3-in-1 powerhouse."
      }
    ]
  },
  {
    category: "Skin Type Specific",
    items: [
      {
        q: "I have oily skin. Is it sticky?",
        a: "Never. Water-light and absorbs in 60 seconds. No tackiness, no pilling, no grease."
      },
      {
        q: "I have dry skin. Will this dehydrate me?",
        a: "The opposite. Our Ceramides and Aloe support your moisture barrier. Follow with moisturizer."
      },
      {
        q: "Is it safe for very sensitive skin?",
        a: "Yes. Start with 'Ease it in' method (see How to Use). Use 2-3 drops, PM only first week."
      }
    ]
  },
  {
    category: "Compatibility & Layering",
    items: [
      {
        q: "Can I use it with retinoids?",
        a: "Yes. Use serum AM, retinoid PM. Or apply retinoid first, wait 15 min, then layer serum. Start 2x/week."
      },
      {
        q: "What about exfoliating acids (AHAs/BHAs)?",
        a: "Compatible. Use acid one day, AARGO the next, until skin adjusts. Then combine if desired."
      },
      {
        q: "Can I mix it with other serums?",
        a: "We don't recommend it. Our formula is optimized standalone. Let it absorb fully (60s) before layering."
      }
    ]
  },
  {
    category: "Specific Concerns",
    items: [
      {
        q: "I have melasma. Will AARGO help?",
        a: "Yes. Our Kojic Acid + Vitamin C combo is clinically shown to reduce melasma over 8-12 weeks with SPF 50+."
      },
      {
        q: "What about post-inflammatory hyperpigmentation (PIH)?",
        a: "This is exactly what we built it for. PIH typically fades in 4-6 weeks with consistent use + sun protection."
      },
      {
        q: "Is it safe during pregnancy/breastfeeding?",
        a: "Our ingredients are generally safe, but consult your OB/GYN before starting any new skincare product."
      }
    ]
  }
];

const VIDEOS = [
  {
    id: 1,
    title: "Vitamin C 101",
    subtitle: "Why potency doesn't mean irritation",
    thumbnail: "https://picsum.photos/400/300?random=1",
    duration: "2:45"
  },
  {
    id: 2,
    title: "Barrier Bestie",
    subtitle: "How AARGO protects your skin",
    thumbnail: "https://picsum.photos/400/300?random=2",
    duration: "3:12"
  },
  {
    id: 3,
    title: "Results Timeline",
    subtitle: "What to expect week by week",
    thumbnail: "https://picsum.photos/400/300?random=3",
    duration: "2:30"
  }
];

const CONFIDENCE_BADGES = [
  { icon: "🌱", label: "Vegan" },
  { icon: "🤰", label: "Pregnancy Safe" },
  { icon: "⚗️", label: "Dermatologist Tested" },
  { icon: "🌍", label: "Made in South Korea" },
  { icon: "✨", label: "Botanical Scent" },
  { icon: "🔬", label: "Clinically Proven" }
];

// --- Components ---

const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get animation class from data attribute
            const animClass = entry.target.getAttribute('data-animate');
            entry.target.classList.add(animClass || 'animate-scroll-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with data-scroll
    document.querySelectorAll('[data-scroll]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

const Button = ({ children, className, onClick, fullWidth, variant = 'primary' }: { children?: React.ReactNode, className?: string, onClick?: () => void, fullWidth?: boolean, variant?: 'primary' | 'secondary' | 'white' }) => {
  const baseStyle = "font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform flex items-center justify-center gap-2 text-lg tracking-wide";
  const variants = {
    primary: "bg-[#00a8a8] hover:bg-[#0d8b8f] text-white hover:-translate-y-1 active:-translate-y-0.5",
    secondary: "bg-gray-900 hover:bg-gray-800 text-white hover:-translate-y-1",
    white: "bg-white text-[#00a8a8] hover:bg-gray-50 hover:-translate-y-1"
  };

  return (
    <button 
      onClick={onClick}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div data-scroll data-animate="animate-scroll-in" className="mb-8 md:mb-12 text-center">
    <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-3 tracking-tight">
      {title}
    </h2>
    {subtitle && <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const AccordionItem: React.FC<{ question: string, answer: string, isOpen: boolean, onClick: () => void }> = ({ question, answer, isOpen, onClick }) => (
  <div data-scroll data-animate="animate-scroll-in" className="border-b border-gray-200 last:border-0">
    <button 
      className="w-full py-4 md:py-5 text-left flex justify-between items-center focus:outline-none group"
      onClick={onClick}
    >
      <span className="text-base md:text-lg font-bold text-gray-900 group-hover:text-[#00a8a8] transition-colors pr-4">{question}</span>
      <div className="flex-shrink-0">
        {isOpen ? <ChevronUp className="text-[#00a8a8]" size={20} /> : <ChevronDown className="text-gray-400 group-hover:text-[#00a8a8]" size={20} />}
      </div>
    </button>
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
    >
      <p className="text-gray-600 leading-relaxed text-sm md:text-base pr-4">{answer}</p>
    </div>
  </div>
);

const BeforeAfterSlider: React.FC<{ before: string, after: string }> = ({ before, after }) => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div 
      data-scroll 
      data-animate="animate-scroll-scale"
      className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl cursor-col-resize group bg-gray-100" 
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        setSliderPos(Math.max(0, Math.min(100, percent)));
      }}
      onTouchMove={(e) => {
        if (e.touches[0]) {
          const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          const percent = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
          setSliderPos(Math.max(0, Math.min(100, percent)));
        }
      }}
    >
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` } as React.CSSProperties}>
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ marginRight: `-${100 - sliderPos}%` } as React.CSSProperties} />
      </div>

      {/* eslint-disable-next-line */}
      <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' } as React.CSSProperties}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 md:p-3 shadow-lg group-hover:scale-110 transition-transform">
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#00a8a8]" />
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#00a8a8]" />
        </div>
      </div>

      <div className="absolute top-3 md:top-4 left-3 md:left-4 text-white text-xs md:text-sm font-bold bg-black/50 px-2 md:px-3 py-1 rounded-full">Before</div>
      <div className="absolute top-3 md:top-4 right-3 md:right-4 text-white text-xs md:text-sm font-bold bg-black/50 px-2 md:px-3 py-1 rounded-full">After (4 Weeks)</div>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<string>('');
  const [cartCount, setCartCount] = useState(0);
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [routineMode, setRoutineMode] = useState<'am' | 'pm'>('am');
  const [selectedIngredient, setSelectedIngredient] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowStickyNav(window.scrollY > 600); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
    const btns = document.querySelectorAll('.add-to-cart-text');
    btns.forEach(btn => {
      const original = btn.textContent;
      btn.textContent = "✓ Added!";
      setTimeout(() => btn.textContent = original, 1500);
    });
  };

  const currentRoutine = ROUTINE_STEPS.find(r => r.time.toLowerCase().startsWith(routineMode)) || ROUTINE_STEPS[0];

  return (
    <div className="font-sans text-gray-800 antialiased bg-white selection:bg-[#00a8a8] selection:text-white">
      
      <style>{scrollStyles}</style>

      {/* Urgency Banner */}
      <div className="bg-gray-900 text-white text-center py-2 md:py-3 text-xs md:text-sm font-medium tracking-widest uppercase sticky top-0 z-40">
        <span className="text-[#fbbf24] mr-2">⚡ Limited Offer:</span> 
        Use code <span className="font-bold border-b border-[#fbbf24]">GLOW15</span> for 15% off
      </div>

      {/* Navigation */}
      <nav className={`sticky top-8 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-xl md:text-2xl font-black tracking-tighter text-[#00a8a8]">AARGO</span>
          
          <div className="hidden md:flex gap-6 text-xs font-bold text-gray-600 uppercase tracking-widest">
            <a href="#routine" className="hover:text-[#00a8a8] transition-colors">Routine</a>
            <a href="#ingredients" className="hover:text-[#00a8a8] transition-colors">Ingredients</a>
            <a href="#howto" className="hover:text-[#00a8a8] transition-colors">How to Use</a>
            <a href="#reviews" className="hover:text-[#00a8a8] transition-colors">Results</a>
            <a href="#faq" className="hover:text-[#00a8a8] transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <button 
              onClick={addToCart}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingBag size={20} className="text-gray-900" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
            <a href="#routine" className="block text-sm font-bold text-gray-600 hover:text-[#00a8a8]">Routine</a>
            <a href="#ingredients" className="block text-sm font-bold text-gray-600 hover:text-[#00a8a8]">Ingredients</a>
            <a href="#howto" className="block text-sm font-bold text-gray-600 hover:text-[#00a8a8]">How to Use</a>
            <a href="#reviews" className="block text-sm font-bold text-gray-600 hover:text-[#00a8a8]">Results</a>
            <a href="#faq" className="block text-sm font-bold text-gray-600 hover:text-[#00a8a8]">FAQ</a>
          </div>
        )}
      </nav>

      {/* --- SECTION 1: HERO --- */}
      <section className="pt-8 pb-12 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
            
            {/* Visual */}
            <div className="w-full md:w-1/2" data-scroll data-animate="animate-scroll-right">
              <div className="relative aspect-square bg-gray-200 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
                <img 
                   src="https://picsum.photos/500/500?grayscale" 
                   alt="AARGO Clear Face Serum" 
                   className="object-cover w-full h-full opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Floating Badge */}
                <div data-scroll data-animate="animate-scroll-down" className="absolute bottom-4 md:bottom-6 right-4 md:right-6 bg-white/95 backdrop-blur-md py-2 md:py-3 px-3 md:px-4 rounded-full shadow-lg border border-white/50">
                  <div className="flex items-center gap-1 md:gap-2 mb-0.5">
                    <div className="flex text-[#fbbf24]">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" />)}
                    </div>
                    <span className="font-bold text-gray-900 text-xs md:text-sm">4.8/5.0</span>
                  </div>
                  <p className="text-[10px] md:text-xs font-semibold text-gray-500">"Clear skin, no irritation"</p>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="w-full md:w-1/2" data-scroll data-animate="animate-scroll-left">
              <div className="mb-4 md:mb-6 inline-flex items-center gap-2 bg-teal-50 text-[#00a8a8] px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase border border-teal-100">
                <Zap className="w-3 h-3 md:w-4 md:h-4 fill-current" /> Clinical Formula
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-4 md:mb-6 tracking-tight">
                Erase Dark Spots<br/>
                <span className="text-[#00a8a8]">Keep the Glow</span>
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-md">
                Stop choosing between results and irritation. The <span className="font-bold text-gray-900">first serum</span> that fades pigmentation in 4 weeks while rebuilding your barrier.
              </p>
              
              {/* Benefit Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-6 md:mb-8">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#00a8a8] flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-semibold text-gray-800">Fades dark spots</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#00a8a8] flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-semibold text-gray-800">Strengthens barrier</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#00a8a8] flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-semibold text-gray-800">Safe for sensitive skin</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#00a8a8] flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base font-semibold text-gray-800">30-day guarantee</span>
                </div>
              </div>
              
              <Button onClick={addToCart} fullWidth={true} className="mb-4 group">
                <span className="add-to-cart-text">Get Clear Skin - $49</span> <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm font-semibold text-gray-500">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 14 people bought this hour
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 2: BEFORE/AFTER SLIDER --- */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Real People, Real Results" 
            subtitle="Drag to see the transformation at 4 weeks"
          />
          
          <div className="max-w-3xl mx-auto">
            <BeforeAfterSlider 
              before="https://picsum.photos/600/600?grayscale=1&random=before"
              after="https://picsum.photos/600/600?grayscale=1&random=after"
            />
            <div data-scroll data-animate="animate-scroll-in" className="mt-6 md:mt-8 bg-teal-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-teal-100">
              <p className="text-base md:text-lg font-bold text-gray-900 mb-2">Real Customer Result</p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">After 4 weeks of consistent use with SPF 50+, experienced 40% reduction in dark spots. By week 8, marks were barely visible.</p>
              <p className="text-xs text-gray-500 font-semibold mt-3 uppercase tracking-wide">Combination Skin | Melasma-Prone</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: ROUTINE WITH AM/PM TOGGLE --- */}
      <section id="routine" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading 
            title="Your Routine, Simplified" 
            subtitle="Morning or evening? Your choice."
          />

          {/* AM/PM Toggle */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="bg-gray-100 border border-gray-200 rounded-full p-1 inline-flex gap-1">
              <button 
                onClick={() => setRoutineMode('am')}
                data-scroll
                data-animate="animate-scroll-left"
                className={`px-6 md:px-8 py-2 md:py-3 rounded-full font-bold text-sm md:text-base transition-all ${routineMode === 'am' ? 'bg-[#00a8a8] text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                🌅 AM
              </button>
              <button 
                onClick={() => setRoutineMode('pm')}
                data-scroll
                data-animate="animate-scroll-right"
                className={`px-6 md:px-8 py-2 md:py-3 rounded-full font-bold text-sm md:text-base transition-all ${routineMode === 'pm' ? 'bg-[#00a8a8] text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                🌙 PM
              </button>
            </div>
          </div>

          {/* Routine Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {currentRoutine.steps.map((step, idx) => (
              <div 
                key={idx} 
                data-scroll 
                data-animate="animate-scroll-in"
                className={`p-4 md:p-6 rounded-xl md:rounded-2xl text-center transition-all stagger-${idx + 1} ${step.highlight ? 'bg-[#00a8a8] text-white shadow-lg md:scale-110' : 'bg-gray-50 border border-gray-200 hover:shadow-lg'}`}
              >
                <div className={`text-2xl md:text-4xl font-black mb-2 md:mb-3 ${step.highlight ? 'text-teal-200' : 'text-[#00a8a8]'}`}>
                  {idx + 1}
                </div>
                <p className={`font-bold text-sm md:text-base mb-1 ${step.highlight ? 'text-white' : 'text-gray-900'}`}>{step.name}</p>
                <p className={`text-xs md:text-sm leading-snug ${step.highlight ? 'text-teal-100' : 'text-gray-600'}`}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: INGREDIENTS WITH EXPANDABLE DETAILS --- */}
      <section id="ingredients" className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Powered by Science" 
            subtitle="Tap any ingredient to explore its role"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-10 md:mb-12">
            {INGREDIENTS.map((ing, idx) => (
              <button
                key={idx} 
                onClick={() => setSelectedIngredient(idx)}
                data-scroll 
                data-animate="animate-scroll-in"
                className={`p-3 md:p-6 rounded-xl md:rounded-2xl cursor-pointer transition-all stagger-${idx + 1} ${selectedIngredient === idx ? 'bg-[#00a8a8] text-white shadow-xl md:scale-110' : 'bg-white border border-gray-200 hover:shadow-lg'}`}
              >
                <div className="mb-2 text-2xl md:text-3xl">
                  {React.cloneElement(ing.icon, { className: `w-6 h-6 md:w-8 md:h-8 ${selectedIngredient === idx ? '' : ing.icon.props.className}` })}
                </div>
                <p className={`text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1 ${selectedIngredient === idx ? 'text-teal-200' : 'text-[#00a8a8]'}`}>
                  {ing.benefit}
                </p>
                <p className={`font-bold text-xs md:text-sm ${selectedIngredient === idx ? 'text-white' : 'text-gray-900'}`}>{ing.name}</p>
              </button>
            ))}
          </div>

          {/* Expanded Details */}
          <div data-scroll data-animate="animate-scroll-scale" className="bg-gradient-to-br from-[#00a8a8]/10 to-teal-50 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-teal-100">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="text-4xl md:text-6xl flex-shrink-0">
                {INGREDIENTS[selectedIngredient].icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{INGREDIENTS[selectedIngredient].name}</h3>
                <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">{INGREDIENTS[selectedIngredient].desc}</p>
                <div>
                  <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-3">What it does:</p>
                  <div className="grid md:grid-cols-2 gap-2 md:gap-3">
                    {INGREDIENTS[selectedIngredient].benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[#00a8a8] flex-shrink-0 mt-0.5" />
                        <span className="text-sm md:text-base text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Confidence Badges */}
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
            {CONFIDENCE_BADGES.map((badge, i) => (
              <div 
                key={i} 
                data-scroll 
                data-animate="animate-scroll-in"
                className="flex flex-col items-center gap-2 md:gap-3 p-3 md:p-4 bg-white border border-gray-200 rounded-lg md:rounded-2xl hover:shadow-md transition-shadow stagger-${i + 1}"
              >
                <span className="text-2xl md:text-3xl">{badge.icon}</span>
                <p className="font-bold text-gray-900 text-center text-xs md:text-sm">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 5: VIDEO SECTION --- */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="The What, Why & How" 
            subtitle="Learn the science in bite-sized videos"
          />

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {VIDEOS.map((video, idx) => (
              <div 
                key={video.id}
                data-scroll 
                data-animate="animate-scroll-in"
                className="group relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer stagger-${idx + 1}"
              >
                <div className="relative aspect-video md:aspect-square overflow-hidden bg-gray-200">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-12 md:w-16 h-12 md:h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 md:w-7 h-5 md:h-7 text-[#00a8a8] fill-current" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 md:p-4 text-white">
                  <p className="font-bold text-sm md:text-base">{video.title}</p>
                  <p className="text-xs md:text-sm text-gray-300">{video.subtitle}</p>
                  <p className="text-[10px] md:text-xs text-gray-400 mt-1">{video.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 6: HOW TO USE --- */}
      <section id="howto" className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="How & When to Use" 
            subtitle="A progressive guide that matches your skin's pace"
          />

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {HOW_TO_USE.map((step) => (
              <div 
                key={step.step} 
                data-scroll 
                data-animate="animate-scroll-in"
                className="relative"
              >
                <div className="bg-gradient-to-br from-[#00a8a8] to-teal-600 text-white p-5 md:p-8 rounded-xl md:rounded-2xl">
                  <div className="text-4xl md:text-5xl font-black mb-3 md:mb-4 opacity-30">{step.step}</div>
                  <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4">{step.title}</h3>
                  <ul className="space-y-2 md:space-y-3">
                    {step.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-xs md:text-sm leading-relaxed">
                        <Check className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {step.step < 3 && <div className="hidden md:block absolute top-1/2 -right-4 text-2xl">→</div>}
              </div>
            ))}
          </div>

          <div data-scroll data-animate="animate-scroll-in" className="mt-8 md:mt-12 bg-teal-50 border-2 border-teal-200 rounded-xl md:rounded-2xl p-5 md:p-8 text-center">
            <p className="text-base md:text-lg font-bold text-gray-900 mb-2">Timeline to Results</p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              <strong>Days 1-7:</strong> Hydration & smoothness<br/>
              <strong>Weeks 2-3:</strong> Visible tone brightening<br/>
              <strong>Weeks 4-6:</strong> 40-60% dark spot reduction
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 7: REVIEWS --- */}
      <section id="reviews" className="py-12 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Real Skin. Real Stories." 
            subtitle="Join 50,000+ people who ditched the concealer."
          />
          
          {/* Summary Stat */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div data-scroll data-animate="animate-scroll-scale" className="bg-white/10 backdrop-blur-sm px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center gap-3 md:gap-4 border border-white/10">
              <span className="text-2xl md:text-3xl font-bold">4.8</span>
              <div className="flex text-[#fbbf24]">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />)}
              </div>
              <span className="text-gray-300 text-xs md:text-sm font-medium border-l border-white/20 pl-3 md:pl-4">1,200+ Reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {REVIEWS.map((review, idx) => (
              <div 
                key={review.id} 
                data-scroll 
                data-animate="animate-scroll-in"
                className="bg-gray-800 p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-700 hover:border-[#00a8a8] transition-all stagger-${idx + 1}"
              >
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <div className="flex text-[#fbbf24] gap-1">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" />)}
                  </div>
                  {review.verified && <span className="text-[10px] text-green-400 bg-green-900/30 px-2 py-1 rounded font-bold">Verified</span>}
                </div>
                <h4 className="font-bold text-white text-base md:text-lg mb-2 md:mb-3">{review.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 md:mb-6">"{review.content}"</p>
                <div className="flex items-center gap-3 mt-auto pt-4 md:pt-6 border-t border-gray-700">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-white">{review.name}</p>
                    <p className="text-[10px] md:text-xs text-gray-500">{review.skinType}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 8: FAQ --- */}
      <section id="faq" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading title="Your Questions, Answered" />
          
          <div className="space-y-6 md:space-y-8">
            {FAQS.map((faqCategory, catIdx) => (
              <div key={catIdx} data-scroll data-animate="animate-scroll-in">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 pb-2 md:pb-3 border-b-2 border-[#00a8a8]">{faqCategory.category}</h3>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  {faqCategory.items.map((faq, idx) => (
                    <AccordionItem 
                      key={idx}
                      question={faq.q}
                      answer={faq.a}
                      isOpen={openFaq === `${catIdx}-${idx}`}
                      onClick={() => setOpenFaq(openFaq === `${catIdx}-${idx}` ? '' : `${catIdx}-${idx}`)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Risk Reversal */}
          <div data-scroll data-animate="animate-scroll-in" className="mt-10 md:mt-16 flex flex-col items-center text-center">
             <ShieldCheck className="w-12 h-12 md:w-16 md:h-16 text-[#00a8a8] mb-3 md:mb-4 opacity-80" />
             <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Empty Bottle Guarantee</h3>
             <p className="text-sm md:text-base text-gray-600 max-w-md leading-relaxed">
               Use the whole bottle. If you don't see a visible difference in your dark spots, we'll refund you 100%. No return shipping needed.
             </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 9: FINAL CTA --- */}
      <section className="py-12 md:py-20 bg-[#00a8a8] relative overflow-hidden">
         {/* Abstract BG */}
         <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
         </div>

         <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl">
            <div className="text-white md:w-1/2 text-center md:text-left" data-scroll data-animate="animate-scroll-left">
              <h2 className="text-3xl md:text-4xl font-black mb-4 md:mb-6">Your Best Skin Starts Today.</h2>
              <p className="text-teal-100 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                Don't wait another month. Clearer, brighter skin is just 4 weeks away.
              </p>
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2 text-teal-100 text-sm">
                    <Check className="w-4 h-4" /> Free Shipping
                 </div>
                 <div className="flex items-center gap-2 text-teal-100 text-sm">
                    <Check className="w-4 h-4" /> 30-Day Money-Back
                 </div>
              </div>
            </div>
            
            <div data-scroll data-animate="animate-scroll-right" className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl w-full md:w-[350px]">
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <div>
                   <h3 className="text-lg md:text-xl font-bold text-gray-900">AARGO Clear Serum</h3>
                   <p className="text-gray-500 text-xs md:text-sm">30ml | 2-Month Supply</p>
                </div>
                <div className="bg-teal-50 text-[#00a8a8] font-bold px-2 md:px-3 py-0.5 md:py-1 rounded text-xs">
                  -25% OFF
                </div>
              </div>
              
              <div className="mb-6 md:mb-8">
                 <span className="text-3xl md:text-4xl font-bold text-gray-900">$49</span>
                 <span className="text-base md:text-lg text-gray-400 line-through ml-2">$65</span>
              </div>
              
              <Button onClick={addToCart} fullWidth={true} variant="primary" className="mb-3 md:mb-4">
                <span className="add-to-cart-text text-sm md:text-base">Add to Cart</span>
              </Button>
              <p className="text-center text-xs text-gray-400">Ships within 24 hours</p>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 py-8 md:py-12 border-t border-gray-800 text-xs md:text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="text-center md:text-left">
            <span className="text-xl md:text-2xl font-black text-white tracking-tighter block mb-1 md:mb-2">AARGO</span>
            <p>© 2024 AARGO Lifestyle. Science-backed face serum.</p>
          </div>
          <div className="flex gap-4 md:gap-6 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 md:hidden transition-transform duration-500 z-50 ${showStickyNav ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <p className="text-[10px] text-gray-500 uppercase font-bold">Save: $16</p>
            <div className="flex items-baseline gap-1">
               <span className="font-bold text-lg text-gray-900">$49</span>
               <span className="text-xs text-gray-400 line-through">$65</span>
            </div>
          </div>
          <button 
            onClick={addToCart}
            className="bg-[#00a8a8] active:bg-[#0d8b8f] text-white font-bold py-2 px-4 rounded-lg shadow-lg flex-1 text-sm add-to-cart-text"
          >
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
}
