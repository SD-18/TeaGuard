
import React from 'react';

export const InfoSection: React.FC = () => {
  const guides = [
    {
      title: "Recognizing Blister Blight",
      desc: "Small yellowish spots on tea leaves that expand into translucent patches.",
      img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Red Spider Mite Detection",
      desc: "Look for tiny reddish specks on the underside of leaves and faint webbing.",
      img: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Soil pH Management",
      desc: "Assam tea thrives in acidic soil (pH 4.5-5.5). Regular testing is vital.",
      img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Knowledge Base</span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-emerald-950">Expert Guides for Successful Harvests.</h2>
          </div>
          <button className="text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1 hover:text-emerald-700 hover:border-emerald-700 transition-all">
            View All Resources
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
                <img src={guide.img} alt={guide.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <span className="text-white font-bold text-sm">Read Article <i className="fas fa-arrow-right ml-2"></i></span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-emerald-950 mb-3 group-hover:text-emerald-600 transition-colors">{guide.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{guide.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
