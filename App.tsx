import React, { useState, useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { LeafAnalyzer } from './components/LeafAnalyzer';
import { Language } from './types';
import { translations } from './constants';

// RevealSection handles the scroll-into-view animations for the landing page
const RevealSection: React.FC<{ children: React.ReactNode; id?: string; className?: string }> = ({ children, id, className = "" }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={id} className={`reveal ${className}`}>
      {children}
    </section>
  );
};

const App: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const t = translations[currentLanguage];

  // Helper function for smooth scrolling to the analyzer
  const scrollToAnalyzer = () => {
    const el = document.getElementById('analyzer');
    if (el) {
      const offset = 80; // Account for fixed header
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
    }
  };

  return (
    <Layout currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage}>
      {/* Immersive Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center bg-[#051a14] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.tripsavvy.com/thmb/TaOqieSqxikeRaCZSn6nErV5a7g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-503909121-5a31ee719e94270037094556.jpg" 
            alt="Assam Tea Plantation" 
            className="w-full h-full object-cover opacity-40 sm:opacity-50 scale-105 animate-slow-zoom" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#051a14]/90 via-[#051a14]/70 to-[#051a14]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 py-24">
          <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
            <div className="animate-fadeIn">
              <div className="inline-flex items-center space-x-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">{t.heroTag}</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-8 leading-tight tracking-tight">
                {currentLanguage === 'as' ? (
                  <>অসমৰ চাহ বাগিচা <span className="italic text-emerald-500">সুৰক্ষিত</span> কৰক।</>
                ) : (
                  <>Protect Your <span className="italic text-emerald-500">Harvest</span> with AI.</>
                )}
              </h1>

              <p className="text-lg sm:text-xl text-emerald-100/70 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                {t.heroSubtitle}
              </p>

              <button 
                onClick={scrollToAnalyzer}
                className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all active:scale-95"
              >
                {t.btnStart}
              </button>
            </div>
          </div>
        </div>
        
        {/* Visual Decoration */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/20 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-emerald-500/50 to-transparent"></div>
        </div>
      </section>

      {/* Analyzer Section - Now calling the updated LeafAnalyzer */}
      <RevealSection id="analyzer" className="py-20 bg-slate-50">
        <LeafAnalyzer currentLanguage={currentLanguage} />
      </RevealSection>

      {/* Sustainability Section */}
      <RevealSection id="about" className="py-24 bg-[#f0fdf4]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
               <img 
                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr_KWL9vV04C_4MYxk62Ta-noIj4_OqktfOQ&s" 
                 alt="Sustainability" 
                 className="rounded-[2.5rem] shadow-2xl relative z-10 transition-transform group-hover:scale-[1.01]"
               />
               <div className="absolute inset-0 bg-emerald-600 rounded-[2.5rem] -rotate-2 z-0"></div>
            </div>
            <div className="space-y-8">
              <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Sustainability</span>
              <h2 className="text-4xl font-serif font-bold text-emerald-950">Precision Diagnostics for Healthy Yields.</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our Grad-CAM technology doesn't just predict; it shows you exactly where the infection is. This enables targeted treatment, reducing overall chemical dependency in the tea gardens of Assam.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Grad-CAM Heatmaps', 'Dual Language'].map(item => (
                  <div key={item} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-[10px]">
                      <i className="fas fa-check"></i>
                    </div>
                    <span className="text-sm font-semibold text-emerald-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Footer CTA */}
      <RevealSection className="py-24 bg-emerald-900 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">Start Your Analysis Today.</h2>
          <button 
            onClick={scrollToAnalyzer}
            className="bg-white text-emerald-900 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl"
          >
            {t.btnStart}
          </button>
        </div>
      </RevealSection>
    </Layout>
  );
};

export default App;