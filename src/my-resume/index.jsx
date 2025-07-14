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
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center gap-4 mb-4">
            <Button onClick={handleDownload}>Download PDF</Button>
            <Button variant="outline" onClick={handleShare}>
              Share Resume
            </Button>
          </div>
        </div>
      </div>
      <div id="print-area" className="bg-white rounded-md shadow-md">
        {resumeData ? (
          <PreviewResume resumeData={resumeData} />
        ) : (
          <p className="text-center text-gray-500">Loading resume...</p>
        )}
      </div>
    </>
  );
}
