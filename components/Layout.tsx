
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentLanguage, onLanguageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = translations[currentLanguage];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <i className="fas fa-leaf"></i>
            </div>
            <span className={`text-xl font-black tracking-tight ${isScrolled ? 'text-emerald-950' : 'text-white'}`}>
              TeaGuard<span className="text-emerald-500">Assam</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {[
              { id: 'home', label: t.navHome },
              { id: 'analyzer', label: t.navAnalyze },
              { id: 'about', label: t.navAbout }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-bold tracking-wide transition-colors ${isScrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-white/80 hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex bg-slate-100/10 p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${currentLanguage === 'en' ? 'bg-emerald-600 text-white shadow-md' : 'text-white/60 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => onLanguageChange('as')}
                className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${currentLanguage === 'as' ? 'bg-emerald-600 text-white shadow-md' : 'text-white/60 hover:text-white'}`}
              >
                অসমীয়া
              </button>
            </div>
            <button className="md:hidden text-white text-xl">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-emerald-950 py-20 text-emerald-100/60 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                  <i className="fas fa-leaf"></i>
                </div>
                <span className="text-xl font-black text-white tracking-tight">
                  TeaGuard<span className="text-emerald-500">Assam</span>
                </span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed">
                Dedicated to empowering the tea growing community of Assam with cutting-edge diagnostics and sustainable farming insights.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Resources</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Plantation Guide</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Pest Identification</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Research Papers</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">API for Developers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><i className="fab fa-twitter"></i></a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"><i className="fab fa-instagram"></i></a>
              </div>
              <p className="text-xs">Email: support@teaguard-assam.in</p>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
            <p className="text-xs">© 2024 TeaGuard Assam AI. Built for the pride of North-East India.</p>
            <div className="flex space-x-6 text-xs">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
