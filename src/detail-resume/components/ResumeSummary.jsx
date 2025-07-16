import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Loader, Loader2 } from "lucide-react";
import { Input } from "../../components/ui/input";
import FormField from "./FormField";

export default function ResumeSummary({
  loading,
  setLoading,
  resumeData,
  setResumeData,
}) {
  const [prompt, setPrompt] = useState("");

  const templatePrompt = `Generate a professional and concise resume summary based on the following
                          details:\n${prompt}\nThe summary should be formal, no longer than 4 sentences, and highlight
                          key strengths and experience.`;

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const handleGenerate = async (e) => {
    setLoading("summaryAi");
    e.preventDefault();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: templatePrompt,
    });

    setResumeData({ ...resumeData, summary: response.text });
    setLoading(null);
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, summary: e.target.value });
  };

  const onHandlePromptChange = (target) => {
    setPrompt(target);
  };

  return (
    <div className="flex flex-col gap-4">
      <FormField
        label="Enter a professional description of your experience, skills, and expertise"
        type="textarea"
        value={prompt}
        onChange={(e) => onHandlePromptChange(e.target.value)}
      />

      <Button
        className={`w-fit cursor-pointer shadow-md 
  bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 
  text-white 
  transition 
  duration-300 
  ease-in-out
  hover:from-blue-500 hover:via-purple-500 hover:to-indigo-600
  hover:shadow-[0_0_20px_5px_rgba(99,102,241,0.9)]
  active:scale-95 active:shadow-none ${
    loading === "summaryAi" ? "shadow-[0_0_20px_5px_rgba(99,102,241,0.9)]" : ""
  }`}
        disabled={loading || !prompt}
        onClick={handleGenerate}
      >
        {loading === "summaryAi" ? (
          <div className="flex gap-2 items-center">
            <Loader2 className="animate-spin" />
            Generating...
          </div>
        ) : (
          "✨ Generate AI Summary ✨"
        )}
      </Button>
      <Textarea
        type="text"
        placeholder="Summary"
        value={resumeData.summary || ""}
        onChange={handleChange}
      />
    </div>
  );
}
