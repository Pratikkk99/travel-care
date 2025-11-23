import { GoogleGenAI } from "@google/genai";

// Safely get API key or use a placeholder to prevent app crash in demo
const apiKey = process.env.API_KEY || 'dummy_key_for_demo_purposes';

const ai = new GoogleGenAI({ apiKey });

export const summarizeMedicalReport = async (reportText: string): Promise<string> => {
  try {
    if (apiKey === 'dummy_key_for_demo_purposes') {
      return "Simulated AI Summary: The patient has a history of CKD Stage 5. Last hemodialysis session was 3 days ago. Access via left AV fistula. Pre-dialysis BP 140/90. No recent complications reported.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following medical report segment for a dialysis/thalassemia patient and provide a concise clinical summary (max 50 words) focusing on vital parameters and recent treatment history: ${reportText}`,
    });

    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating summary. Please consult original document.";
  }
};

export const smartSearchQuery = async (query: string): Promise<{ city?: string, type?: string }> => {
  try {
     if (apiKey === 'dummy_key_for_demo_purposes') {
        // Simple mock logic for demo if no key
        const q = query.toLowerCase();
        if (q.includes('mumbai')) return { city: 'Mumbai', type: q.includes('blood') ? 'Thalassemia' : 'Dialysis' };
        if (q.includes('bangalore')) return { city: 'Bangalore', type: 'Dialysis' };
        if (q.includes('goa')) return { city: 'Goa', type: 'Dialysis' };
        return {};
     }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Extract the intended Indian city and medical service type (Dialysis or Thalassemia) from this search query: "${query}". Return strictly valid JSON format: {"city": "string", "type": "string"}. If not found, return null values.`,
      config: {
          responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (text) {
        return JSON.parse(text);
    }
    return {};
  } catch (error) {
    console.error("Gemini Smart Search Error:", error);
    return {};
  }
}