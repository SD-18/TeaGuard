import React from 'react';
import { Language } from '../types';
import { translations } from '../constants';

interface InfoSectionProps {
  currentLanguage: Language;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage];

  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
              {t.infoTag}
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-emerald-950">
              {t.infoTitle}
            </h2>
          </div>
          <button className="text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1 hover:text-emerald-700 hover:border-emerald-700 transition-all">
            {t.viewResources}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.guides.map((guide: any, i: number) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
                <img 
                  src={guide.img} 
                  alt={guide.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <span className="text-white font-bold text-sm">
                    {t.readArticle} <i className="fas fa-arrow-right ml-2"></i>
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-emerald-950 mb-3 group-hover:text-emerald-600 transition-colors">
                {guide.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {guide.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};