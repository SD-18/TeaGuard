
import React, { useState, useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { LeafAnalyzer } from './components/LeafAnalyzer';
import { ChatBox } from './components/ChatBox';
import { Language } from './types';
import { translations } from './constants';

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

  return (
    <Layout currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage}>
      {/* Immersive Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center bg-[#051a14] overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=2000" 
            alt="Assam Tea Plantation Workers" 
            className="w-full h-full object-cover opacity-30 sm:opacity-50 scale-105 animate-slow-zoom" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#051a14]/90 via-[#051a14]/70 to-[#051a14]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#051a14] via-[#051a14]/60 to-transparent hidden sm:block"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 py-24 sm:py-32">
          <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
            <div className="animate-fadeIn">
              <div className="inline-flex items-center space-x-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] sm:text-xs font-black tracking-widest text-emerald-400 uppercase">{t.heroTag}</span>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-8 leading-[1.1] sm:leading-[0.9] tracking-tight">
                {currentLanguage === 'as' ? (
                  <>অসমৰ খেতি <span className="italic text-emerald-500">সুৰক্ষিত</span> কৰক।</>
                ) : (
                  <>{t.heroTitle.split('Harvest')[0]}<span className="italic text-emerald-500">Harvest</span>{t.heroTitle.split('Harvest')[1]}</>
                )}
              </h1>
              <p className="text-lg sm:text-xl text-emerald-100/70 mb-10 sm:mb-14 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                {t.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 sm:gap-8">
                <button 
                  onClick={() => {
                    const el = document.getElementById('analyzer');
                    if (el) {
                      const offset = 70;
                      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all active:scale-95"
                >
                  {t.btnStart}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none"></div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/30 space-y-2 pointer-events-none">
          <span className="text-[9px] font-bold uppercase tracking-widest">Explore</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-emerald-500/50 to-transparent"></div>
        </div>
      </section>

      <RevealSection id="analyzer" className="py-20 sm:py-32 bg-slate-50">
        <LeafAnalyzer currentLanguage={currentLanguage} />
      </RevealSection>

      {/* Modern About Section */}
      <RevealSection id="about" className="py-24 sm:py-32 bg-[#f0fdf4]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 md:order-1 group">
                 <img 
                   src="https://images.unsplash.com/photo-1594494024039-99bb65044607?auto=format&fit=crop&q=80&w=800" 
                   alt="Assam Tea Garden" 
                   className="rounded-[2.5rem] shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
                 />
                 <div className="absolute inset-0 bg-emerald-600 rounded-[2.5rem] -rotate-3 z-0 hidden sm:block"></div>
              </div>
              <div className="space-y-8 order-1 md:order-2">
                <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.3em]">{translations[currentLanguage].navAbout}</span>
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-emerald-950 leading-tight">Sustainability through Precision AI.</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  We believe that the future of agriculture lies in the intersection of traditional knowledge and predictive science. By identifying pests at the first sign, we help reduce chemical inputs by up to 40%.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Free for smallholders', 'Direct treatment advice', 'Mobile optimized', 'Regional language support'].map(item => (
                    <div key={item} className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-[11px]">
                        <i className="fas fa-check"></i>
                      </div>
                      <span className="text-sm font-semibold text-emerald-900">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Modern CTA */}
      <RevealSection className="py-24 sm:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-800 skew-x-12 translate-x-32 opacity-50 hidden sm:block"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-8 leading-tight">Ready to Protect Your <span className="text-emerald-400">Harvest</span>?</h2>
            <p className="text-lg text-emerald-100/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Join thousands of tea growers and farmers across Assam using our precision diagnostic tool.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <button 
                onClick={() => {
                  const el = document.getElementById('analyzer');
                  if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-white text-emerald-900 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-2xl active:scale-95"
              >
                {t.btnStart}
              </button>
              <button className="w-full sm:w-auto bg-emerald-800/40 backdrop-blur-sm text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all border border-emerald-700/50 active:scale-95">
                Resource Center
              </button>
            </div>
          </div>
        </div>
      </RevealSection>

      <ChatBox currentLanguage={currentLanguage} />
    </Layout>
  );
};

export default App;
