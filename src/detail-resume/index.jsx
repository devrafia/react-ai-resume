import { Link, useParams } from "react-router";
import { Header } from "../components/ui/custom/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenAI } from "@google/genai";
import { Loader } from "lucide-react";
import GlobalApi from "../../services/GlobalApi";
import FormField from "./components/FormField";
import PreviewResume from "./components/PreviewResume";

export default function DetailResume() {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [formSectionIndex, setFormSectionIndex] = useState(0);

  useEffect(() => {
    GlobalApi.getUserResumeOne(resumeId).then(
      (response) => {
        const data = response.data.data[0];
        setResumeData(data);
      },
      (error) => {
        console.log(error);
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

  const formSection = [
    <ResumePersonalDetail
      resumeData={resumeData}
      onHandleChange={onHandleChange}
    />,
    <ResumeSummary resumeData={resumeData} setResumeData={setResumeData} />,
    <ResumeExperience
      resumeData={resumeData}
      setResumeData={setResumeData}
      onHandleChange={onHandleChange}
    />,
    <ResumeEducation
      resumeData={resumeData}
      setResumeData={setResumeData}
      onHandleChange={onHandleChange}
    />,
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
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <Header />
      <div className="flex flex-row gap-2 mt-10">
        <div className="w-full p-4 rounded-md shadow-lg h-max">
          <div className="flex flex-col">
            <div className="flex justify-between items-end gap-2 mb-4">
              <div>
                <h2 className="font-bold">Personal Detail</h2>
                <h4>Get started with the basic information</h4>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onHandleNextPrev("prev")}
                  variant={"secondary"}
                >
                  Prev
                </Button>
                <Button onClick={() => onHandleNextPrev("next")}>Next</Button>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {formSection[formSectionIndex] ?? ""}
                <Button className="cursor-pointer">Save</Button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full">
          {resumeData === null ? (
            <div className="flex justify-center items-center py-10">
              <p className="text-gray-500 animate-pulse">Loading resume...</p>
            </div>
          ) : (
            <>
              <Link to={`/my-resume/${resumeId}/view`}>
                <Button className="ml-auto mb-2 block cursor-pointer">
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
                </Button>
              </Link>
              <PreviewResume resumeData={resumeData} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

function ResumePersonalDetail({ resumeData, onHandleChange }) {
  return (
    <>
      <div className="flex flex-row gap-2">
        <FormField
          label={"First Name"}
          id={"firstName"}
          onChange={onHandleChange}
          value={resumeData?.firstName ?? ""}
        />
        <FormField
          label={"Last Name"}
          id={"lastName"}
          onChange={onHandleChange}
          value={resumeData?.lastName ?? ""}
        />
      </div>
      <FormField
        label={"Job Title"}
        id={"jobTitle"}
        onChange={onHandleChange}
        value={resumeData?.jobTitle ?? ""}
      />
      <FormField
        label={"Address"}
        id={"address"}
        onChange={onHandleChange}
        value={resumeData?.address ?? ""}
      />
      <div className="flex flex-row gap-2">
        <FormField
          label={"Phone"}
          id={"phone"}
          onChange={onHandleChange}
          value={resumeData?.phone ?? ""}
        />
        <FormField
          label={"Email"}
          id={"resumeEmail"}
          onChange={onHandleChange}
          value={resumeData?.resumeEmail ?? ""}
        />
      </div>
    </>
  );
}

function ResumeSummary({ resumeData, setResumeData }) {
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    e.preventDefault();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    setResumeData({ ...resumeData, summary: response.text });
    setLoading(false);
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, summary: e.target.value });
  };

  return (
    <div className="flex flex-col gap-4">
      <Button className="w-fit" disabled={loading} onClick={handleGenerate}>
        {loading ? (
          <div className="flex gap-2 items-center">
            <Loader className="animate-spin" />
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

function ResumeExperience({ resumeData, setResumeData, onHandleChange }) {
  const handleAddExperience = () => {
    const newExperience = {
      position: "Company Example",
      company: "Full Stack Developer",
      startDate: "Aug 2021",
      endDate: "Dec 2024",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, facere illo id animi, fugiat quam exercitationem necessitatibus voluptatibus deserunt maiores, ad quasi quo ratione eius enim repudiandae dolore natus amet reiciendis quod sit? Rem natus, itaque cumque quod, laudantium excepturi quasi laboriosam iusto nostrum corporis sint? Velit maiores unde et!`,
    };

    setResumeData((prev) => ({
      ...prev,
      experiences: [...(prev.experiences || []), newExperience],
    }));
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...(resumeData.experiences || [])];
    updatedExperiences.splice(index, 1);

    setResumeData((prev) => ({
      ...prev,
      experiences: updatedExperiences,
    }));
  };
  return (
    <>
      <div>
        {(resumeData.experiences?.length > 0 ? resumeData.experiences : []).map(
          (experience, index) => (
            <div key={index}>
              <FormField
                label={"Position Title"}
                id={`experiences.${index}.position`}
                onChange={onHandleChange}
                value={experience.position}
              />

              <FormField
                label={"Location"}
                id={`experiences.${index}.company`}
                onChange={onHandleChange}
                value={experience.company}
              />

              <div className="flex gap-4">
                <FormField
                  label={"Start Date"}
                  id={`experiences.${index}.startDate`}
                  onChange={onHandleChange}
                  value={experience.startDate}
                />
                <FormField
                  label={"End Date"}
                  id={`experiences.${index}.endDate`}
                  onChange={onHandleChange}
                  value={experience.endDate}
                />
              </div>

              <FormField
                label={"Description"}
                id={`experiences.${index}.description`}
                onChange={onHandleChange}
                value={experience.description}
                type="textarea"
              />
              <Button
                type="button"
                variant="destructive"
                className="mt-2"
                onClick={() => handleRemoveExperience(index)}
              >
                Remove
              </Button>
            </div>
          )
        )}
      </div>
      <Button type="button" onClick={handleAddExperience}>
        + Add Experience
      </Button>
    </>
  );
}

export function ResumeEducation({ resumeData, setResumeData, onHandleChange }) {
  const handleAddEducation = () => {
    const newEducation = {
      university: "University Example",
      degree: "Diploma in Example",
      startDate: "Aug 2021",
      endDate: "Sep 2024",
    };

    setResumeData((prev) => ({
      ...prev,
      educations: [...(prev.educations || []), newEducation],
    }));
  };

  const handleRemoveEducation = (index) => {
    const updatedEducations = [...(resumeData.educations || [])];
    updatedEducations.splice(index, 1);

    setResumeData((prev) => ({
      ...prev,
      educations: updatedEducations,
    }));
  };
  return (
    <div className="flex flex-col gap-6">
      {(resumeData?.educations || []).map((education, index) => (
        <div key={index} className="p-4 border rounded-md space-y-4">
          <FormField
            label="University / School"
            id={`educations.${index}.university`}
            onChange={onHandleChange}
            value={education.university ?? ""}
          />
          <FormField
            label="Degree"
            id={`educations.${index}.degree`}
            onChange={onHandleChange}
            value={education.degree ?? ""}
          />
          <FormField
            label="Start Date"
            id={`educations.${index}.startDate`}
            onChange={onHandleChange}
            value={education.startDate ?? ""}
          />
          <FormField
            label="End Date"
            id={`educations.${index}.endDate`}
            onChange={onHandleChange}
            value={education.endDate ?? ""}
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleRemoveEducation(index)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button type="button" onClick={handleAddEducation}>
        + Add Education
      </Button>
    </div>
  );
}
