import React, { useState, useRef } from 'react';
import { PredictionResult, Language } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const API_BASE_URL = 'http://localhost:3000'; 

interface LeafAnalyzerProps {
  currentLanguage: Language;
}

export const LeafAnalyzer: React.FC<LeafAnalyzerProps> = ({ currentLanguage }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeLeaf = async () => {
    if (!imageFile) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', imageFile); 

      const predictResponse = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!predictResponse.ok) throw new Error('Prediction failed');
      const responseData = await predictResponse.json();
      console.log("Full Backend Response:", responseData);
      setResult(responseData);

    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Error connecting to backend. Check Node.js (3000) and Python (8000).");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const chartData = result?.prediction?.all_probabilities 
    ? Object.entries(result.prediction.all_probabilities)
        .map(([name, value]) => ({
          name: name.replace(/_/g, ' '),
          value: value as number
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5) 
    : [];

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-emerald-950 mb-4">Tea Leaf Diagnostic Lab</h2>
          <p className="text-slate-500">ML-powered disease detection with Grad-CAM visualization.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT: Image Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100">
              <div 
                onClick={() => !isAnalyzing && fileInputRef.current?.click()}
                className={`relative aspect-square rounded-2xl border-2 border-dashed overflow-hidden flex items-center justify-center transition-all ${
                  result ? 'border-emerald-500' : 'border-slate-200 hover:border-emerald-400 cursor-pointer'
                }`}
              >
                {result ? (
                  <img src={result.images.predicted_image} alt="Analysis Result" className="w-full h-full object-cover" />
                ) : selectedImage ? (
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-10">
                    <i className="fas fa-cloud-upload-alt text-4xl text-emerald-200 mb-4"></i>
                    <p className="text-slate-400 font-medium">Click to upload tea leaf</p>
                  </div>
                )}
                {result && <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">Heatmap Generated</div>}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              <button
                onClick={analyzeLeaf}
                disabled={!selectedImage || isAnalyzing}
                className={`w-full mt-6 py-4 rounded-xl font-bold transition-all ${isAnalyzing ? 'bg-slate-100 text-slate-400' : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'}`}
              >
                {isAnalyzing ? 'Analyzing Sample...' : 'Run Diagnostics'}
              </button>
              {result && (
                <button onClick={() => {setResult(null); setSelectedImage(null);}} className="w-full mt-4 text-slate-400 text-xs font-bold uppercase hover:text-red-500 transition-colors">Scan Another Leaf</button>
              )}
            </div>
          </div>

          {/* RIGHT: Data Section */}
          <div className="space-y-6">
            {!result && !isAnalyzing ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                <i className="fas fa-microscope text-slate-200 text-6xl mb-4"></i>
                <p className="text-slate-400 font-medium">Ready for analysis</p>
              </div>
            ) : isAnalyzing ? (
              <div className="h-full flex flex-col items-center justify-center p-12 space-y-6">
                <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
                <p className="text-emerald-900 font-bold animate-pulse">Computing Grad-CAM...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">ML Prediction</span>
                      <h3 className="text-3xl font-serif font-bold text-emerald-950 capitalize mt-1">{result.prediction.disease.replace(/_/g, ' ')}</h3>
                      <div className={`mt-2 inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold ${result.prediction.severity === 'Severe' ? 'bg-red-100 text-red-600' : result.prediction.severity === 'Moderate' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {result.prediction.severity} Severity ({result.prediction.severity_percent}%)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black text-emerald-600">{result.prediction.confidence}%</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Confidence Score</div>
                    </div>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={110} tick={{fontSize: 10, fill: '#64748b', fontWeight: 'bold'}} />
                        <Tooltip cursor={{fill: '#f8fafc'}} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#059669' : '#e2e8f0'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};