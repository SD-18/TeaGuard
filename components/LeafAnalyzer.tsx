
import React, { useState, useRef } from 'react';
import { PredictionResult, Language } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface LeafAnalyzerProps {
  currentLanguage: Language;
}

export const LeafAnalyzer: React.FC<LeafAnalyzerProps> = ({ currentLanguage }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [aiInterpretation, setAiInterpretation] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
        setAiInterpretation(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeLeaf = async () => {
    if (!imageFile) return;
    
    setIsAnalyzing(true);
    setResult(null);
    setAiInterpretation(null);

    try {
      // 1. Send image to /api/predict
      const formData = new FormData();
      formData.append('image', imageFile);

      const predictResponse = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!predictResponse.ok) throw new Error('Prediction failed');
      const predictionData: PredictionResult = await predictResponse.json();
      setResult(predictionData);

      // 2. Send prediction result to /api/ai/interpret for Gemini explanation
      const interpretResponse = await fetch('/api/ai/interpret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prediction: predictionData,
          language: currentLanguage
        }),
      });

      if (!interpretResponse.ok) throw new Error('AI Interpretation failed');
      const interpretationData = await interpretResponse.json();
      
      // Assuming interpretationData returns { interpretation: "..." }
      setAiInterpretation(interpretationData.interpretation);

    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Error connecting to local backend. Ensure your server is running at /api/predict");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const chartData = result ? Object.entries(result.prediction.all_probabilities).map(([name, value]) => ({
    name: name.replace(/_/g, ' '),
    value: value as number
  })).sort((a, b) => (b.value as number) - (a.value as number)) : [];

  return (
    <div className="container mx-auto px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-emerald-950 mb-6">Tea Leaf Diagnostic Lab</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Upload a clear high-resolution photo of a single tea leaf to get an instant diagnosis and AI-recommended treatment plan.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Uploader Card */}
          <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-emerald-900/5 border border-slate-100 h-fit">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`relative group aspect-square rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center ${selectedImage ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-emerald-400 hover:bg-slate-50'}`}
            >
              {selectedImage ? (
                <>
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold px-6 py-2 border border-white rounded-full">Change Image</span>
                  </div>
                </>
              ) : (
                <div className="text-center p-10">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <i className="fas fa-cloud-upload-alt"></i>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">Click to Upload Leaf Photo</h3>
                  <p className="text-slate-400 text-sm">JPEG or PNG, Max 10MB</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>

            <button
              onClick={analyzeLeaf}
              disabled={!selectedImage || isAnalyzing}
              className={`w-full mt-8 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center space-x-3 ${!selectedImage ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 active:scale-[0.98]'}`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Analyzing Sample...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-microscope"></i>
                  <span>Run Diagnostics</span>
                </>
              )}
            </button>
          </div>

          {/* Results Side */}
          <div className="space-y-6">
            {!result && !isAnalyzing ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-100/50 rounded-[2rem] border border-dashed border-slate-200">
                <i className="fas fa-chart-pie text-slate-300 text-6xl mb-6"></i>
                <h3 className="text-slate-500 font-bold text-xl">Waiting for Sample</h3>
                <p className="text-slate-400 max-w-xs mt-2 italic">Results and AI interpretation will appear here after analysis.</p>
              </div>
            ) : isAnalyzing ? (
              <div className="h-full flex flex-col items-center justify-center p-12 space-y-8">
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-emerald-900 font-bold text-xl animate-pulse">Running ML Inference...</p>
                  <p className="text-slate-500 text-sm">Identifying pest markers and disease patterns</p>
                </div>
              </div>
            ) : result && (
              <div className="animate-fadeIn space-y-6">
                {/* Result Summary */}
                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-slate-100">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">Prediction Result</span>
                      <h3 className="text-3xl font-serif font-bold text-emerald-950 mt-1">{result.prediction.disease.replace(/_/g, ' ')}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-emerald-600">{result.prediction.confidence}%</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Confidence Level</div>
                    </div>
                  </div>

                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 30 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                        <Tooltip 
                          cursor={{ fill: '#f1f5f9' }} 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#059669' : '#e2e8f0'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* AI Interpretation */}
                <div className="bg-emerald-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl group-hover:scale-110 transition-transform">
                    <i className="fas fa-robot"></i>
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <i className="fas fa-sparkles"></i>
                      </div>
                      <h4 className="font-bold uppercase text-xs tracking-[0.2em] text-emerald-400">AI Specialist Interpretation</h4>
                    </div>
                    <div className="prose prose-invert prose-emerald max-w-none">
                      {!aiInterpretation ? (
                        <div className="flex items-center space-x-3 text-emerald-300">
                          <div className="w-4 h-4 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin"></div>
                          <span className="text-sm font-medium italic">Gemini is generating treatment advice...</span>
                        </div>
                      ) : (
                        <div className="text-emerald-50 leading-relaxed whitespace-pre-wrap font-medium">
                          {aiInterpretation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Processed in {result.latency_ms}ms • Powered by Local Backend & Gemini
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 50%; transform: translateX(50%); }
          100% { width: 100%; transform: translateX(150%); }
        }
      `}</style>
    </div>
  );
};
