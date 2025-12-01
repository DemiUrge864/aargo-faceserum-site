import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Menu, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Droplet, 
  Sun, 
  Zap, 
  ArrowRight,
  X,
  AlertCircle,
  Play,
  RotateCcw
} from 'lucide-react';

/* 
  AARGO Lifestyle Clear Face Serum Landing Page
  Enhanced: Added Benefits, Routine, How-to-Use sections
  with improved ingredient storytelling
*/

// --- Data ---

const INGREDIENTS = [
  {
    name: "15% Vitamin C",
    icon: <Sun className="w-6 h-6 text-amber-500" />,
    benefit: "THE GLOW GETTER",
    desc: "Fades dullness and age spots without the sting. Pharmaceutical grade potency, sensitive skin safety.",
    tags: ["Brightening", "Antioxidant"]
  },
  {
    name: "3% Kojic Acid",
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    benefit: "THE SPOT ERASER",
    desc: "Stops melanin in its tracks. Visibly reduces hyperpigmentation and melasma in just 4 weeks.",
    tags: ["Depigmenting", "Anti-melasma"]
  },
  {
    name: "5% Niacinamide",
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
    benefit: "THE PORE PERFECTOR",
    desc: "Shrinks pores and smooths texture. The ultimate barrier-builder that keeps redness at bay.",
    tags: ["Barrier Support", "Pore-Minimizing"]
  },
  {
    name: "Green Tea & Aloe",
    icon: <Droplet className="w-6 h-6 text-green-500" />,
    benefit: "THE CALM",
    desc: "Instant relief. Heals inflammation and prevents the 'active ingredient burn' before it starts.",
    tags: ["Soothing", "Anti-inflammatory"]
  },
  {
    name: "Ceramides",
    icon: <ShieldCheck className="w-6 h-6 text-teal-500" />,
    benefit: "THE PROTECTOR",
    desc: "Locks in hydration and strengthens the skin barrier. This is why users don't experience typical irritation.",
    tags: ["Barrier Repair", "Hydrating"]
  }
];

const HOW_TO_USE = [
  {
    step: 1,
    title: "Patch Test (Day 1)",
    tips: [
      "Apply 2-3 drops to your jawline or behind your ear.",
      "Wait 24 hours to monitor for any reaction.",
      "If clear, you're ready to start the routine."
    ]
  },
  {
    step: 2,
    title: "Ease It In (Week 1-2)",
    tips: [
      "Start PM only: Use 3-4 drops after cleanser, before moisturizer.",
      "Apply to clean, dry skin. Wait 60 seconds for full absorption.",
      "Follow with your usual moisturizer.",
      "Use 3-4x per week for the first 2 weeks."
    ]
  },
  {
    step: 3,
    title: "Make It a Staple (Week 3+)",
    tips: [
      "Introduce AM use: Apply same method after AM cleanser.",
      "Increase to 5-6 drops for full coverage.",
      "Use once daily, then progress to twice daily (AM + PM) as tolerated.",
      "Consistency matters. Most see visible difference by week 4."
    ]
  }
];

const ROUTINE_STEPS = [
  {
    time: "Morning",
    label: "AM Routine",
    steps: [
      { name: "Cleanser", description: "Gentle cream or gel cleanser" },
      { name: "AARGO Clear Serum", description: "3-5 drops on face and neck" },
      { name: "Moisturizer", description: "Lightweight or rich, based on skin type" },
      { name: "Sunscreen", description: "SPF 30+, non-negotiable" }
    ]
  },
  {
    time: "Evening",
    label: "PM Routine",
    steps: [
      { name: "Cleanser", description: "Double cleanse if wearing makeup/SPF" },
      { name: "AARGO Clear Serum", description: "3-5 drops on face and neck" },
      { name: "Moisturizer", description: "Heavier cream or hydrating layer" },
      { name: "Optional", description: "Retinoid or treatment (not same night as first AARGO use)" }
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
    content: "I've spent hundreds on serums that did nothing. AARGO actually deleted my sun spots. By week 8, I was confident enough to go out without concealer.",
    tags: ["Dark Spots", "Radiance"],
    verified: true
  },
  {
    id: 2,
    name: "Jordan T.",
    age: 28,
    skinType: "Acne-Prone",
    rating: 5,
    title: "Zero breakouts. Just glow.",
    content: "Vitamin C usually destroys my skin. This feels like water but works like magic. My post-acne scars are fading and no new breakouts.",
    tags: ["Acne Marks", "Sensitive"],
    verified: true
  },
  {
    id: 3,
    name: "Priya S.",
    age: 31,
    skinType: "Sensitive",
    rating: 5,
    title: "Potent but gentle. It's wild.",
    content: "How is something this strong so soothing? My redness is gone and my skin texture is basically glass now. Forever repurchase.",
    tags: ["Sensitive", "Texture"],
    verified: true
  }
];

const FAQS = [
  {
    category: "General Use",
    items: [
      {
        q: "Will it burn my sensitive skin?",
        a: "No. We buffered the high-strength Vitamin C with Aloe and Niacinamide specifically to prevent the 'sting' associated with other serums. It's power without the pain."
      },
      {
        q: "How fast will I see results?",
        a: "Instant: Hydration and smoothness. 2 Weeks: Brighter tone. 4-6 Weeks: Visible reduction in dark spots and acne marks."
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
        a: "Never. It's water-light and absorbs in 60 seconds flat. No tackiness, no pilling under makeup, no grease."
      },
      {
        q: "I have dry skin. Will this dehydrate me?",
        a: "The opposite. Our Ceramides and Aloe actually support your moisture barrier. Follow with a good moisturizer and your skin will feel hydrated and plump."
      },
      {
        q: "Is it safe for very sensitive skin?",
        a: "Yes, but start with the 'Ease it in' method (see How to Use). Use 2-3 drops, apply PM only for the first week, then gradually introduce AM use."
      }
    ]
  },
  {
    category: "Compatibility & Layering",
    items: [
      {
        q: "Can I use it with retinoids?",
        a: "Yes. Use the serum in the morning and retinoid at night, or apply retinoid first, wait 15 minutes, then layer the serum. Start with 2x per week with retinoid to let your skin adjust."
      },
      {
        q: "What about exfoliating acids (AHAs/BHAs)?",
        a: "Compatible. Use acid on one day, AARGO the next, until your skin is fully accustomed. Then you can combine if desired. Listen to your skin."
      },
      {
        q: "Can I mix it with other serums?",
        a: "We don't recommend it. Our formula is optimized as a standalone serum for maximum efficacy. Let it absorb fully (60 seconds) before layering other products."
      }
    ]
  },
  {
    category: "Specific Concerns",
    items: [
      {
        q: "I have melasma. Will AARGO help?",
        a: "It can. Our Kojic Acid + Vitamin C combo is clinically shown to reduce melasma over 8-12 weeks. Consistency and sunscreen (SPF 50+) are critical."
      },
      {
        q: "What about post-inflammatory hyperpigmentation (PIH)?",
        a: "This is exactly what we built it for. PIH typically fades in 4-6 weeks with consistent use, combined with sun protection."
      },
      {
        q: "Is it safe during pregnancy/breastfeeding?",
        a: "Our ingredients (Vitamin C, Niacinamide, Kojic Acid) are generally considered safe during pregnancy/nursing, but always consult your OB/GYN before starting any new skincare product."
      }
    ]
  }
];

// --- Components ---

const Button = ({ children, className, onClick, fullWidth, variant = 'primary' }: { children?: React.ReactNode, className?: string, onClick?: () => void, fullWidth?: boolean, variant?: 'primary' | 'secondary' | 'white' }) => {
  const baseStyle = "font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 text-lg tracking-wide";
  const variants = {
    primary: "bg-[#208791] hover:bg-[#145560] text-white",
    secondary: "bg-gray-900 hover:bg-gray-800 text-white",
    white: "bg-white text-[#208791] hover:bg-gray-50"
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

const SectionHeading = ({ title, subtitle, center = true, light = false }: { title: string, subtitle?: string, center?: boolean, light?: boolean }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
    {subtitle && <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${light ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>}
  </div>
);

const AccordionItem: React.FC<{ question: string, answer: string, isOpen: boolean, onClick: () => void }> = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-100 last:border-0">
    <button 
      className="w-full py-6 text-left flex justify-between items-center focus:outline-none group"
      onClick={onClick}
    >
      <span className="text-lg font-bold text-gray-900 group-hover:text-[#208791] transition-colors">{question}</span>
      {isOpen ? <ChevronUp className="text-[#208791]" /> : <ChevronDown className="text-gray-400 group-hover:text-[#208791]" />}
    </button>
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
    >
      <p className="text-gray-600 leading-relaxed pr-8">{answer}</p>
    </div>
  </div>
);

// --- Main Application ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [cartCount, setCartCount] = useState(0);
  const [showStickyNav, setShowStickyNav] = useState(false);

  // Handle scroll effects
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

  const filteredReviews = activeFilter === 'All' 
    ? REVIEWS 
    : REVIEWS.filter(r => r.tags.includes(activeFilter));

  return (
    <div className="font-sans text-gray-800 antialiased bg-white selection:bg-[#208791] selection:text-white">
      
      {/* Urgency Banner */}
      <div className="bg-gray-900 text-white text-center py-2.5 text-xs md:text-sm font-medium tracking-widest uppercase">
        <span className="text-[#fbbf24] mr-2">⚡ Limited Offer:</span> 
        Use code <span className="font-bold border-b border-[#fbbf24]">GLOW15</span> for 15% off your first bottle
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Menu className="md:hidden w-6 h-6 text-gray-900 cursor-pointer" />
            <span className="text-2xl font-black tracking-tighter text-[#208791]">AARGO</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-bold text-gray-600 uppercase tracking-widest">
            <a href="#benefits" className="hover:text-[#208791] transition-colors">Why AARGO</a>
            <a href="#routine" className="hover:text-[#208791] transition-colors">Routine</a>
            <a href="#science" className="hover:text-[#208791] transition-colors">Science</a>
            <a href="#howto" className="hover:text-[#208791] transition-colors">How to Use</a>
            <a href="#reviews" className="hover:text-[#208791] transition-colors">Results</a>
            <a href="#faq" className="hover:text-[#208791] transition-colors">FAQ</a>
          </div>
          <div className="relative cursor-pointer group" onClick={addToCart}>
            <div className="bg-gray-100 p-2 rounded-full group-hover:bg-[#208791] transition-colors group-hover:text-white">
                <ShoppingBag className="w-5 h-5" />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* --- SECTION 1: HERO --- */}
      <section className="relative pt-6 pb-16 md:py-24 overflow-hidden bg-[#fafaf7]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            
            {/* Visual */}
            <div className="w-full md:w-1/2 relative order-1 md:order-2">
              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl">
                {/* Simulated Image */}
                <img 
                   src="https://picsum.photos/800/1000?grayscale" 
                   alt="Radiant skin model" 
                   className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md py-3 px-5 rounded-2xl shadow-xl border border-white/50 animate-fade-in-up">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex text-[#fbbf24]">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <span className="font-bold text-gray-900">4.8/5.0</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 tracking-wide">"My skin has never looked this clear."</p>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-[#208791] px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 border border-teal-100">
                <Zap className="w-3 h-3 fill-current" /> New Clinical Formula
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] mb-6 tracking-tight">
                Erase Dark Spots. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#208791] to-teal-400">Keep the Glow.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed max-w-lg mx-auto md:mx-0">
                Stop choosing between results and irritation. The <span className="font-bold text-gray-900">first serum</span> that fades stubborn pigmentation in 4 weeks while rebuilding your skin barrier.
              </p>
              
              {/* Benefit Bullets */}
              <div className="grid grid-cols-2 gap-3 mb-8 max-w-lg mx-auto md:mx-0">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#208791] flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-gray-800">Fades dark spots</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#208791] flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-gray-800">Strengthens barrier</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#208791] flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-gray-800">Safe for sensitive skin</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#208791] flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-gray-800">30-day guarantee</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 justify-center md:justify-start">
                <Button onClick={addToCart} className="w-full sm:w-auto px-12 group">
                  <span className="add-to-cart-text">Get Clear Skin - $49</span> <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   14 people bought this hour
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-6 pt-6 border-t border-gray-200">
                 <div>
                    <p className="text-2xl font-bold text-gray-900">50k+</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Happy Faces</p>
                 </div>
                 <div className="w-px h-10 bg-gray-200"></div>
                 <div>
                    <p className="text-2xl font-bold text-gray-900">100%</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Clean Actives</p>
                 </div>
                 <div className="w-px h-10 bg-gray-200"></div>
                 <div>
                    <p className="text-2xl font-bold text-gray-900">30-Day</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Guarantee</p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 2: WHY YOUR SKIN WILL LOVE AARGO --- */}
      <section id="benefits" className="py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Your Skin Will Love AARGO Clear Serum</h2>
            <p className="text-lg text-gray-600">Powered by clinically-backed actives, zero compromises on sensory comfort.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0"><div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center"><Sun className="w-6 h-6 text-amber-600" /></div></div>
              <div><h3 className="text-lg font-bold text-gray-900 mb-2">Fades Post-Acne Marks & Sun Spots</h3><p className="text-gray-600 text-sm">Vitamin C and Kojic Acid work synergistically to reduce melanin production and fade hyperpigmentation visible in 4-6 weeks.</p></div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0"><div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center"><Zap className="w-6 h-6 text-yellow-600" /></div></div>
              <div><h3 className="text-lg font-bold text-gray-900 mb-2">Brightens Overall Tone</h3><p className="text-gray-600 text-sm">Within 2 weeks, most users notice a brighter, more even skin tone and reduced dullness—even before spot fading.</p></div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0"><div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center"><ShieldCheck className="w-6 h-6 text-teal-600" /></div></div>
              <div><h3 className="text-lg font-bold text-gray-900 mb-2">Supports Barrier Instead of Stripping</h3><p className="text-gray-600 text-sm">Ceramides and Aloe lock in hydration while potent actives work. Your skin gets stronger, not weaker.</p></div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0"><div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"><RotateCcw className="w-6 h-6 text-red-600" /></div></div>
              <div><h3 className="text-lg font-bold text-gray-900 mb-2">Reduces Redness & Irritation Over Time</h3><p className="text-gray-600 text-sm">Green Tea and Niacinamide soothe inflammation while Vitamin C works. Zero irritation sting, maximum efficacy.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: YOUR ROUTINE, SIMPLIFIED --- */}
      <section id="routine" className="py-24 bg-[#fafaf7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Your Routine, Simplified</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">AARGO Clear Serum fits seamlessly into your AM and PM routine. Here's exactly where it goes.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {ROUTINE_STEPS.map((routine, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="inline-block bg-[#208791] text-white px-4 py-2 rounded-full text-sm font-bold mb-6">{routine.label}</div>
                <div className="space-y-6">
                  {routine.steps.map((step, stepIdx) => (
                    <div key={stepIdx} className="flex gap-4">
                      <div className="flex-shrink-0"><div className="w-8 h-8 rounded-full bg-[#208791]/20 text-[#208791] flex items-center justify-center font-bold text-sm">{stepIdx + 1}</div></div>
                      <div><h4 className={`font-bold text-gray-900 ${step.name === 'AARGO Clear Serum' ? 'text-[#208791]' : ''}`}>{step.name}</h4><p className="text-sm text-gray-600 mt-1">{step.description}</p></div>
                    </div>
                  ))}
                </div>
                {routine.time === 'Evening' && (<div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200"><p className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">Pro Tip</p><p className="text-sm text-amber-800">You can use retinoids on alternate nights. Apply retinoid first, wait 15 mins, then layer AARGO serum.</p></div>)}
              </div>
            ))}
          </div>
          <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-[#208791]" />Compatibility with Other Actives</h3>
            <div className="space-y-3 text-gray-600 text-sm">
              <p><span className="font-semibold text-gray-900">Exfoliating Acids (AHAs/BHAs):</span> Use on alternate days initially. Once skin acclimates, you can use together.</p>
              <p><span className="font-semibold text-gray-900">Retinoids:</span> Apply retinoid first (wait 15 mins), then AARGO serum. Or use on alternate nights.</p>
              <p><span className="font-semibold text-gray-900">Benzoyl Peroxide:</span> Compatible. Use BP in AM, AARGO in PM, or apply BP first with 15-min wait time.</p>
              <p><span className="font-semibold text-gray-900">Niacinamide-Heavy Products:</span> AARGO already has 5% Niacinamide, so avoid stacking with other Niacinamide serums to prevent irritation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: INGREDIENTS (Powered by Proven Actives) --- */}
      <section id="science" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Powered by Proven Ingredients" 
            subtitle="Clinically-backed actives + barrier support = results without the sting."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {INGREDIENTS.map((ing, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group border border-transparent hover:border-[#208791]/20">
                <div className="mb-6 bg-white group-hover:bg-[#208791]/10 w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-sm">
                  {ing.icon}
                </div>
                <h3 className="text-sm font-bold text-[#208791] tracking-widest uppercase mb-2">{ing.benefit}</h3>
                <h4 className="text-lg font-bold text-gray-900 mb-3">{ing.name}</h4>
                <div className="flex flex-wrap gap-1 mb-3">
                  {ing.tags && ing.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="text-[10px] bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-semibold">{tag}</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{ing.desc}</p>
              </div>
            ))}
          </div>

          {/* Value Props */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
             {['Dermatologist Tested', 'Cruelty-Free', 'Vegan', 'Fragrance-Free'].map((item, i) => (
               <div key={i} className="flex flex-col items-center gap-2">
                 <div className="w-10 h-10 rounded-full bg-[#e0f2f1] flex items-center justify-center text-[#208791]">
                   <Check className="w-5 h-5" />
                 </div>
                 <span className="font-bold text-gray-700 text-sm">{item}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 5: HOW & WHEN TO USE ME --- */}
      <section id="howto" className="py-24 bg-[#fafaf7]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">How & When to Use Me</h2>
            <p className="text-lg text-gray-600">A 3-step guide to introducing AARGO into your skincare safely and effectively.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {HOW_TO_USE.map((section, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-[#208791]/30 transition-all shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#208791] text-white rounded-full font-bold text-lg mb-6">{section.step}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="flex gap-3 text-sm text-gray-700">
                      <span className="text-[#208791] font-bold mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg max-w-2xl mx-auto">
            <p className="text-blue-900 text-sm leading-relaxed"><strong>Timeline Expectations:</strong> Most users notice instant hydration and smoothness. By week 2, skin tone brightens. Visible reduction in dark spots and post-acne marks appears by week 4-6. Consistency is key—use daily for best results.</p>
          </div>
        </div>
      </section>

      {/* --- SECTION 6: TEXTURE & SENSORY --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
               <div className="absolute top-0 left-0 w-32 h-32 bg-[#208791] opacity-10 rounded-full blur-3xl"></div>
               <div className="absolute bottom-0 right-0 w-40 h-40 bg-yellow-400 opacity-10 rounded-full blur-3xl"></div>
               <img 
                src="https://picsum.photos/600/600?grayscale" 
                alt="Serum Texture" 
                className="rounded-3xl shadow-2xl relative z-10 w-full"
               />
               <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-20 hidden md:block">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#208791]" />
                    <span className="font-bold text-gray-900">Absorbs in 60s</span>
                  </div>
               </div>
            </div>
            
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                Potent actives usually sting. <br/>
                <span className="text-[#208791]">Ours soothe.</span>
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Droplet className="w-5 h-5 text-blue-500" /> Liquid Silk Texture
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Micro-emulsified oils mean it sinks in instantly. No sticky film, no grease, no pilling. It layers perfectly under moisturizer and makeup.
                  </p>
                </div>

                <div>
                   <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-500" /> Barrier Support
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Most brightening serums strip your skin. We added Ceramides and Aloe to ensure your skin barrier gets stronger, not weaker, with every use.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#208791]">
                  <p className="italic text-gray-700 text-lg mb-2">
                    "I was terrified to try Vitamin C again after a bad reaction years ago. AARGO changed my mind. Zero stinging, just glow."
                  </p>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">— Sarah K., Sensitive Skin Type</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 7: REVIEWS --- */}
      <section id="reviews" className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Real Skin. Real Stories." 
            subtitle="Join 50,000+ people who ditched the concealer."
            light={true}
          />
          
          {/* Summary Stat */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full flex items-center gap-4 border border-white/10">
              <span className="text-3xl font-bold">4.8</span>
              <div className="flex text-[#fbbf24]">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-gray-300 text-sm font-medium border-l border-white/20 pl-4">1,247 Verified Reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-[#208791] transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex text-[#fbbf24] gap-1">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  {review.verified && <span className="text-[10px] text-green-400 bg-green-900/30 px-2 py-1 rounded font-bold uppercase tracking-wide">Verified Buyer</span>}
                </div>
                <h4 className="font-bold text-white text-lg mb-3 leading-tight">{review.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">"{review.content}"</p>
                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-gray-700">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.skinType}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="white" onClick={addToCart} className="px-10">
               Read All 1,200+ Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* --- SECTION 8: FAQ --- */}
      <section id="faq" className="py-24 bg-[#fafaf7]">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeading title="We Answered Everything" center={true} />
          
          <div className="space-y-12">
            {FAQS.map((faqCategory, catIdx) => (
              <div key={catIdx}>
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-[#208791]">{faqCategory.category}</h3>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
          <div className="mt-16 flex flex-col items-center text-center">
             <ShieldCheck className="w-16 h-16 text-[#208791] mb-4 opacity-80" />
             <h3 className="text-xl font-bold text-gray-900 mb-2">The "Empty Bottle" Guarantee</h3>
             <p className="text-gray-600 max-w-md">
               Use the whole bottle. If you don't see a visible difference in your dark spots, we'll refund you 100%. No return shipping needed.
             </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 9: FINAL CTA --- */}
      <section className="py-24 bg-[#208791] relative overflow-hidden">
         {/* Abstract BG */}
         <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
         </div>

         <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 max-w-5xl">
            <div className="text-white md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Your Best Skin Starts Here.</h2>
              <p className="text-teal-100 text-lg mb-8 leading-relaxed">
                Don't let another month go by hiding your skin. 
                <br/>Clearer, brighter, healthier skin is just 4 weeks away.
              </p>
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2 text-teal-100 text-sm">
                    <Check className="w-4 h-4" /> Free Shipping
                 </div>
                 <div className="flex items-center gap-2 text-teal-100 text-sm">
                    <Check className="w-4 h-4" /> 30-Day Money-Back Guarantee
                 </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-2xl w-full md:w-[400px]">
              <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="text-xl font-bold text-gray-900">AARGO Clear Serum</h3>
                   <p className="text-gray-500 text-sm">2-Month Supply (30ml)</p>
                </div>
                <div className="bg-teal-50 text-[#208791] font-bold px-2 py-1 rounded text-xs">
                  -25% OFF
                </div>
              </div>
              
              <div className="mb-8">
                 <span className="text-4xl font-bold text-gray-900">$49</span>
                 <span className="text-lg text-gray-400 line-through ml-2">$65</span>
              </div>
              
              <Button onClick={addToCart} fullWidth={true}>
                <span className="add-to-cart-text">Add to Cart</span>
              </Button>
              <p className="text-center text-xs text-gray-400 mt-4">Ships within 24 hours.</p>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 py-12 border-t border-gray-800 text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-2xl font-black text-white tracking-tighter block mb-2">AARGO</span>
            <p>© 2024 AARGO Lifestyle. Science-backed skincare.</p>
          </div>
          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden transition-transform duration-500 z-50 ${showStickyNav ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Savings: $16</p>
            <div className="flex items-baseline gap-2">
               <span className="font-bold text-xl text-gray-900">$49</span>
               <span className="text-sm text-gray-400 line-through">$65</span>
            </div>
          </div>
          <button 
            onClick={addToCart}
            className="bg-[#208791] active:bg-[#145560] text-white font-bold py-3 px-8 rounded-xl shadow-lg flex-1 add-to-cart-text"
          >
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
}
