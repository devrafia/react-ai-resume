import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Header } from "../components/ui/custom/Header";
import { Button } from "@/components/ui/button"; // pastikan path benar
import PreviewResume from "../detail-resume/components/PreviewResume";
import GlobalApi from "../../services/GlobalApi";

export default function MyResume() {
  const { resumeId } = useParams(); // tangkap id dari URL
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    console.log(resumeId);
    if (resumeId) {
      GlobalApi.getUserResumeOne(resumeId).then((res) => {
        setResumeData(res.data.data[0]);
      });
    }
  }, []);

  const handleDownload = () => {
    window.print(); // simple download
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <>
      <div id="no-print">
        <Header />
        <div className="flex justify-center container mx-auto px-16 py-6">
          <div className="flex justify-center gap-4 mb-4">
            <Button onClick={handleDownload}>Download PDF</Button>
            <Button variant="outline" onClick={handleShare}>
              Share Resume
            </Button>
          </div>
        </div>
        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-slate-800">
            🎉 Congratulations! Your resume is ready to impress.
          </p>
          <p className="text-base text-slate-600 mt-2">
            Share it proudly and take the next step toward your dream career.
          </p>
        </div>
      </div>
      <div
        id="print-area"
        className="flex justify-center bg-white rounded-md px-16 pb-16"
      >
        {resumeData ? (
          <PreviewResume
            resumeData={resumeData}
            className="w-[45%] bg-white shadow-md print:w-full"
          />
        ) : (
          <p className="text-center text-gray-500">Loading resume...</p>
        )}
      </div>
    </>
  );
}
