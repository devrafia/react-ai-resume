import { Link, Navigate, useNavigate, useParams } from "react-router";
import { Header } from "../components/ui/custom/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenAI } from "@google/genai";
import { Loader, Loader2 } from "lucide-react";
import GlobalApi from "../../services/GlobalApi";
import FormField from "./components/FormField";
import PreviewResume from "./components/PreviewResume";
import ResumePersonalDetail from "./components/ResumePersonalDetail";
import ResumeSummary from "./components/ResumeSummary";
import ResumeExperience from "./components/ResumeExperience";
import ResumeEducation from "./components/ResumeEducation";
import LoadingScreen from "../components/ui/custom/LoadingScreen";
import ConfirmDialog from "../components/ui/custom/ConfirmDialog";

export default function DetailResume() {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState({});
  const [formSectionIndex, setFormSectionIndex] = useState(0);
  const [loading, setLoading] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingScreen(true);
    GlobalApi.getUserResumeOne(resumeId).then(
      (response) => {
        const data = response.data.data[0];
        setResumeData(data);
        setLoadingScreen(false);
      },
      (error) => {
        console.log(error);
        setLoadingScreen(false);
      }
    );
  }, []);

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    const keys = name.split(".");

    setResumeData((prevData) => {
      const updatedData = { ...prevData };

      if (keys.length === 1) {
        updatedData[name] = value;
      } else {
        const [arrayKey, index, field] = keys;
        const targetArray = [...(updatedData[arrayKey] || [])];

        if (!targetArray[index]) {
          targetArray[index] = {};
        }

        targetArray[index][field] = value;
        updatedData[arrayKey] = targetArray;
      }
      return updatedData;
    });
  };

  const onHandleDeleteResume = () => {
    setLoading(true);
    GlobalApi.deleteResume(resumeData.documentId).then(
      (response) => {
        console.log(response);
        navigate("/dashboard");
        setLoading(null);
      },
      (error) => {
        console.log(error);
        setLoading(null);
      }
    );
  };

  const formSection = [
    {
      title: "Personal Detail",
      desc: "Get started with the basic information",
      element: (
        <ResumePersonalDetail
          resumeData={resumeData}
          onHandleChange={onHandleChange}
        />
      ),
    },
    {
      title: "Professional Summary",
      desc: "Write a brief summary to highlight your skills and goals",
      element: (
        <ResumeSummary
          loading={loading}
          setLoading={setLoading}
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      ),
    },
    {
      title: "Work Experience",
      desc: "List your past jobs, roles, and key accomplishments",
      element: (
        <ResumeExperience
          resumeData={resumeData}
          setResumeData={setResumeData}
          onHandleChange={onHandleChange}
        />
      ),
    },
    {
      title: "Education",
      desc: "Add your academic background and qualifications",
      element: (
        <ResumeEducation
          resumeData={resumeData}
          setResumeData={setResumeData}
          onHandleChange={onHandleChange}
        />
      ),
    },
  ];

  function onHandleNextPrev(type) {
    setFormSectionIndex((prev) => {
      if (type === "next" && prev < formSection.length - 1) {
        return prev + 1;
      } else if (type === "prev" && prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }

  const handleSubmit = (e) => {
    setLoading("save");
    e.preventDefault();
    const {
      firstName,
      lastName,
      resumeEmail,
      phone,
      summary,
      title,
      jobTitle,
      address,
      userName,
      educations,
      experiences,
    } = resumeData;

    const payload = {
      data: {
        firstName,
        lastName,
        resumeEmail,
        phone,
        summary,
        title,
        jobTitle,
        address,
        userName,
        educations,
        experiences,
      },
    };

    console.log("Payload to submit:", payload);

    GlobalApi.updateResume(resumeData.documentId, payload).then(
      (response) => {
        console.log(response);
        setLoading(null);
      },
      (error) => {
        console.log(error);
        setLoading(null);
      }
    );
  };

  return (
    <>
      <Header />
      <div className="flex flex-row gap-2 pt-10 px-16 min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 justify-between">
        <div className="w-full">
          <div className="flex justify-end items-end gap-2">
            <div className="flex gap-2 mb-2">
              <Button
                onClick={() => onHandleNextPrev("prev")}
                variant={"default"}
                className="cursor-pointer"
              >
                Prev
              </Button>
              <Button
                className="cursor-pointer"
                onClick={() => onHandleNextPrev("next")}
              >
                Next
              </Button>
            </div>
          </div>
          <div className="w-full rounded-md shadow-lg h-max bg-white">
            <div
              id="print-area"
              className="bg-slate-600 w-full rounded-t-md h-4"
            ></div>
            <div>
              <div className="flex flex-col p-4">
                <div className=" my-4">
                  <h2 className="font-bold">
                    {formSection[formSectionIndex].title}
                  </h2>
                  <h4>{formSection[formSectionIndex].desc}</h4>
                </div>
                <div>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {formSection[formSectionIndex].element ?? ""}
                    <Button className="cursor-pointer" disabled={loading}>
                      {loading === "save" ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="animate-spin" />
                          Saving
                        </div>
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          {loadingScreen ? (
            <LoadingScreen />
          ) : (
            <>
              <div className="flex gap-2 justify-end mb-2">
                <Link to={`/my-resume/${resumeId}/view`}>
                  <Button className="cursor-pointer flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    Download Resume
                  </Button>
                </Link>
                <ConfirmDialog
                  title="Delete"
                  action={() => onHandleDeleteResume()}
                  loading={loading}
                >
                  <Button
                    variant="destructive"
                    className="cursor-pointer flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    Delete
                  </Button>
                </ConfirmDialog>
              </div>
              <PreviewResume resumeData={resumeData} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
