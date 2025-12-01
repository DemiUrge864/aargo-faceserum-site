import React, { useState, useEffect } from 'react';
import { Star, Check, ChevronDown, Menu, X, ShoppingCart, Droplet, Leaf, Sparkles, Shield, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  const [emailInput, setEmailInput] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setStickyVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubmitted(true);
      setEmailInput('');
      setTimeout(() => setEmailSubmitted(false), 3000);
    }
  };

  const testimonials = [
    { name: "Priya M.", location: "Mumbai", skinType: "Oily, Acne-Prone", quote: "I've struggled with dark spots on my cheeks for over a year. After 6 weeks of using AARGO, my spots are noticeably lighter. My skin also feels so much more hydrated!", rating: 5 },
    { name: "Aditya K.", location: "Bangalore", skinType: "Combination, Sensitive", quote: "Post-acne marks were my biggest insecurity. This serum faded them faster than expected. First brightening serum that didn't irritate my sensitive skin!", rating: 5 },
    { name: "Deepa S.", location: "Delhi", skinType: "Tanned, Dull", quote: "One step instead of three. I used to layer Vitamin C, kojic acid, and hyaluronic acid. Now just this, and my skin looks brighter and more even!", rating: 5 }
  ];

  const actives = [
    { icon: Sparkles, title: "15% Vitamin C + 3% Kojic Acid", desc: "Visibly lightens pigmentation and dark spots while protecting against daily environmental stress" },
    { icon: Shield, title: "5% Niacinamide", desc: "Reduces pore appearance, controls excess oil, and smooths texture" },
    { icon: Droplet, title: "2% Hyaluronic Acid", desc: "Plumps and hydrates skin from within without stickiness or heaviness" },
    { icon: Leaf, title: "Green Tea & Aloe Vera", desc: "Soothes redness and irritation—perfect for acne-prone and sensitive skin" }
  ];

  const faqs = [
    { q: "How quickly will I see results on my dark spots?", a: "Most customers see visible results in 4-6 weeks. Dark spots become lighter and more even, with continued improvement over 8-12 weeks. You'll notice glow and hydration benefits within 1-2 weeks." },
    { q: "Is it safe for acne-prone or sensitive skin?", a: "Yes. AARGO is formulated with both brightening actives and calming botanicals (green tea, aloe vera). However, if you have extremely reactive skin, we recommend patch-testing first or starting with 2-3 times per week." },
    { q: "Can I use this serum every day?", a: "Absolutely. AARGO is formulated for twice-daily use (morning and night). The balance of actives and soothing ingredients makes it gentle enough for consistent application without irritation." },
    { q: "How do I use it with my other skincare products?", a: "Simple routine: Cleanser → AARGO (on damp skin) → Moisturizer → SPF. Apply the serum to damp skin for better penetration. That's it—no complicated layering needed." },
    { q: "Will it make my oily skin worse?", a: "No. The niacinamide helps control sebum production, and hyaluronic acid hydrates without heaviness. AARGO is specifically formulated for oily and combination skin types." },
    { q: "Is this suitable for men as well as women?", a: "Yes. Dark spots, tanning, post-acne marks, and uneven tone affect everyone. AARGO is designed for all genders and skin types." }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        h1, h2, h3 { font-family: 'Montserrat', 'Poppins', sans-serif; font-weight: 700; }
        button { font-family: 'Poppins', sans-serif; font-weight: 600; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in-up { animation: fadeInUp 0.6s ease-out; }
        html { scroll-behavior: smooth; }
      `}</style>

      {stickyVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
          <button className="w-full py-3 px-4 bg-[#FF6B6B] text-white font-semibold text-sm hover:bg-[#E55555] transition-colors flex items-center justify-center gap-2">
            <ShoppingCart size={18} /> Add to Cart – ₹799
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="relative bg-gradient-to-b from-white to-[#FAFAF8] pt-6 pb-12 md:pt-12 md:pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">AARGO</h1>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight">Dark Spots Won't Fade?</h2>
            <p className="text-xl text-[#666666] mb-6">This daily serum brightens, clears, and hydrates with one powerful step.</p>
            <p className="text-base md:text-lg text-[#1A1A1A] mb-8">AARGO blends <strong>15% Vitamin C, 3% kojic acid, 5% niacinamide, and 2% hyaluronic acid</strong> to visibly lighten dark spots, fade post-acne marks, and deeply hydrate—all while staying gentle enough for daily use.</p>
            
            <div className="space-y-3 mb-8">
              {[
                { icon: Sparkles, title: "Fade Dark Spots", desc: "In 4-6 weeks" },
                { icon: TrendingUp, title: "Boost Radiance", desc: "Wake up to brighter skin" },
                { icon: Droplet, title: "Deep Hydration", desc: "Perfect for Indian climate" }
              ].map((b, i) => {
                const IconComponent = b.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="text-[#2D5F3F] mt-1 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold text-[#1A1A1A]">{b.title}</h4>
                      <p className="text-sm text-[#666666]">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="w-full md:w-auto px-8 py-4 bg-[#FF6B6B] text-white font-bold text-lg rounded hover:bg-[#E55555] transition-all transform hover:scale-105 shadow-lg mb-3">
              Add to Cart – ₹799
            </button>
            <p className="text-xs text-[#666666] text-center md:text-left">✓ Formulated for Indian skin | ✓ Daily-use safe | ✓ All skin types</p>
          </div>

          <div className="fade-in-up" style={{animationDelay: '0.2s'}}>
            <div className="bg-gradient-to-br from-[#F9D866] to-[#FFE8D6] rounded-lg h-96 md:h-full flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <div className="text-6xl mb-4">💧</div>
                <p className="text-[#2D5F3F] font-bold text-lg">AARGO</p>
                <p className="text-[#666666] text-sm">Clear Face Serum</p>
                <div className="mt-4 text-3xl opacity-50">✨</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8 text-center">Dark Spots, Uneven Tone? You're Not Alone.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🔄', title: 'Persistent dark spots', desc: 'Lingering marks that won\'t fade' },
              { icon: '💫', title: 'Dull, tired skin', desc: 'Skin lacking glow despite multiple products' },
              { icon: '☀️', title: 'Tanning & uneven tone', desc: 'Sun exposure and pollution darkening skin' },
              { icon: '😟', title: 'Sensitive skin concerns', desc: 'Harsh actives irritating reactive skin' }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-[#FAFAF8] rounded-lg border border-[#E0E0E0]">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
                <p className="text-[#666666]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-b from-[#FAFAF8] to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Meet Your New Skincare Essential</h2>
          <p className="text-center text-[#666666] mb-12 max-w-2xl mx-auto">Tired of choosing between brightening power and skin comfort? AARGO delivers both.</p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {actives.map((active, i) => {
              const IconComponent = active.icon;
              return (
                <div key={i} className="p-6 bg-white rounded-lg border border-[#E0E0E0] hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#2D5F3F] bg-opacity-10 rounded-lg flex-shrink-0">
                      <IconComponent className="text-[#2D5F3F]" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A1A] mb-2">{active.title}</h3>
                      <p className="text-[#666666]">{active.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid md:grid-cols-3 gap-6 bg-[#2D5F3F] bg-opacity-5 rounded-lg p-8 md:p-12 border border-[#2D5F3F] border-opacity-20">
            {[
              { stat: '87%', desc: 'See lighter dark spots in 6 weeks' },
              { stat: '4.8★', desc: 'Average customer rating' },
              { stat: '5,000+', desc: 'Happy customers in India' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#2D5F3F] mb-2">{item.stat}</div>
                <p className="text-[#666666]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-12 text-center">Loved by People Who Actually Use It</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-[#E0E0E0] rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={18} fill="#F9D866" className="text-[#F9D866]" />)}
                </div>
                <p className="text-[#1A1A1A] mb-4 italic">"{t.quote}"</p>
                <div className="border-t border-[#E0E0E0] pt-4">
                  <p className="font-bold text-[#1A1A1A]">{t.name}</p>
                  <p className="text-sm text-[#666666]">{t.location}</p>
                  <p className="text-xs text-[#999999] mt-1">{t.skinType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8 text-center">More Than Just Vitamin C</h2>
          <p className="text-center text-[#666666] mb-12 max-w-2xl mx-auto">AARGO combines five clinically respected actives in one formula. Here's what makes it different:</p>

          <div className="space-y-4">
            {[
              { title: 'Multi-Active Formula', desc: 'One bottle gives you brightening, hydration, oil balance, and barrier support' },
              { title: 'Designed for Indian Skin', desc: 'Formulated for your skin tone, climate, and specific concerns' },
              { title: 'Both Brightening & Calming', desc: 'Get powerful results without irritation thanks to soothing botanicals' },
              { title: 'Lightweight, Non-Sticky', desc: 'Perfect for Indian humidity—absorbs quickly without heaviness' },
              { title: 'Daily-Use Safe', desc: 'Safe for twice-daily use on all skin types' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white rounded-lg border border-[#E0E0E0]">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#FF6B6B]">
                    <Check className="text-white" size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1A1A] mb-1">{item.title}</h3>
                  <p className="text-[#666666]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-12 text-center">Questions About Using the Serum?</h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[#E0E0E0] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-[#F5F5F5] transition-colors text-left"
                >
                  <h3 className="font-semibold text-[#1A1A1A]">{faq.q}</h3>
                  <ChevronDown size={20} className={`text-[#2D5F3F] transition-transform ${openFaq === i ? 'transform rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 py-4 bg-[#FAFAF8] border-t border-[#E0E0E0]">
                    <p className="text-[#666666] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-b from-[#FAFAF8] to-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Ready to See Clearer, Brighter Skin?</h2>
          <p className="text-lg text-[#666666] mb-8">Join thousands of customers already fading their dark spots with AARGO. See visible results in 4-6 weeks, or your money back.</p>

          <button className="px-12 py-4 bg-[#FF6B6B] text-white font-bold text-lg rounded hover:bg-[#E55555] transition-all transform hover:scale-105 shadow-lg mb-6 hidden md:inline-block">
            Add to Cart – ₹799
          </button>

          <div className="bg-white border-2 border-[#E0E0E0] rounded-lg p-6 md:p-8">
            <h3 className="font-bold text-[#1A1A1A] mb-4">Not sure? Save This Routine Guide to Your Inbox</h3>
            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 px-4 py-3 border border-[#E0E0E0] rounded focus:outline-none focus:border-[#5BA3C7]"
                required
              />
              <button type="submit" className="px-6 py-3 bg-[#2D5F3F] text-white font-semibold rounded hover:bg-[#1F4228] transition-colors">
                Send
              </button>
            </form>
            {emailSubmitted && <p className="text-[#2D5F3F] font-semibold mt-3">✓ Check your email for your 15% discount code!</p>}
            <p className="text-xs text-[#999999] mt-4">We'll send skincare tips and product updates. Unsubscribe anytime.</p>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4 text-sm text-[#666666]">
            {['✓ 30-day money-back guarantee', '✓ Free shipping over ₹500', '✓ Ships within 24 hours'].map((badge, i) => (
              <div key={i}>{badge}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] text-white py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4">AARGO</h4>
            <p className="text-sm text-gray-400">Brightening, clarifying face serum for Indian skin.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">How to Use</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Ingredients</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Reviews</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Refunds</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 AARGO Lifestyle. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
