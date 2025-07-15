import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Loader, Loader2 } from "lucide-react";

export default function ResumeSummary({
  loading,
  setLoading,
  resumeData,
  setResumeData,
}) {
  const prompt = `Generate a professional and concise summary for a resume based on the following details:
                  - Full Name: John Doe
                  - Job Title: Full Stack Developer
                  - Skills: JavaScript, React, Node.js, MongoDB
                  - Location: Semarang, Indonesia
                  - Email: johndoe@example.com
                  - Phone: 0813-1234-5678
                  - Experience: 3 years of experience in building scalable web applications and RESTful APIs.
                  - Education: Diploma in Software Engineering from Universitas Dian Nuswantoro

                  The summary should be written in a formal tone, no longer than 4 sentences, and highlight the candidate's strengths and experience.`;

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const handleGenerate = async (e) => {
    setLoading("summaryAi");
    e.preventDefault();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    setResumeData({ ...resumeData, summary: response.text });
    setLoading(null);
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, summary: e.target.value });
  };

  return (
    <div className="flex flex-col gap-4">
      <Button className="w-fit" disabled={loading} onClick={handleGenerate}>
        {loading === "summaryAi" ? (
          <div className="flex gap-2 items-center">
            <Loader2 className="animate-spin" />
            Generating...
          </div>
        ) : (
          "Generate AI Summary"
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
