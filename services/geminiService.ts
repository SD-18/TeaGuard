
import { GoogleGenAI } from "@google/genai";
import { PredictionResult, Language } from "../types";

export const getAIInterpretation = async (prediction: PredictionResult, lang: Language): Promise<string> => {
  // Use process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    You are an expert agricultural scientist specializing in tea cultivation in Assam, India.
    I have a machine learning prediction result for a tea leaf sample:
    - Detected Condition: ${prediction.prediction.disease}
    - Confidence: ${prediction.prediction.confidence}%
    - All Probabilities: ${JSON.stringify(prediction.prediction.all_probabilities)}
    
    Please explain this result in simple, supportive terms for a local farmer. 
    ${lang === 'as' ? 'Respond ONLY in the Assamese language.' : 'Respond in English.'}
    
    Include:
    1. A brief description of the disease.
    2. Immediate steps they should take (traditional or safe modern methods).
    3. How to prevent this from spreading in the garden.
    Keep it concise and encouraging.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    // Use .text property directly instead of .text()
    return response.text || "Sorry, I couldn't generate an interpretation at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while communicating with the AI expert.";
  }
};
