import { useParams } from "react-router";
import { Header } from "../components/ui/custom/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenAI } from "@google/genai";
import { Loader } from "lucide-react";
import GlobalApi from "../../services/GlobalApi";
import FormField from "./components/FormField";

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

    // Contoh name: "educations.0.university"
    const keys = name.split(".");

    setResumeData((prevData) => {
      const updatedData = { ...prevData };

      // Jika bukan nested (langsung satu level)
      if (keys.length === 1) {
        updatedData[name] = value;
      }
      // Jika nested (seperti educations.0.university)
      else {
        const [arrayKey, index, field] = keys;
        const targetArray = [...(updatedData[arrayKey] || [])];

        if (!targetArray[index]) {
          targetArray[index] = {};
        }

        targetArray[index][field] = value;
        updatedData[arrayKey] = targetArray;
      }
      console.log(resumeData);
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
        <div className="w-full p-4 rounded-md shadow-lg">
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
                {formSection[formSectionIndex] ?? <p>Form tidak ditemukan</p>}
                <Button className="cursor-pointer">Save</Button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full p-4 rounded-md shadow-lg">
          {resumeData === null ? (
            <div className="flex justify-center items-center py-10">
              <p className="text-gray-500 animate-pulse">Loading resume...</p>
            </div>
          ) : (
            <PreviewResume resumeData={resumeData} />
          )}
        </div>
      </div>
    </>
  );
}

function PreviewResume({ resumeData }) {
  const data = {
    name: "John Doe",
    title: "Full Stack Developer",
    address: "Jl. Jakarta Raya No. 14, Kota Jakarta Selatan",
    phone: "0813-9304-6112",
    email: "akmalrafi1132@gmail.com",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur laborum unde nemo dolorum voluptates blanditiis nesciunt quisquam dolor earum tenetur delectus quo odit ratione voluptatum...",
    experiences: [
      {
        title: "Full Stack Developer",
        location: "Semarang, Banyumanik",
        date: "Jan 2021 - Present",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur pariatur ea odit perspiciatis deserunt...",
      },
      {
        title: "Full Stack Developer",
        location: "Semarang, Banyumanik",
        date: "Jan 2021 - Present",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur pariatur ea odit perspiciatis deserunt...",
      },
    ],
    education: [
      {
        school: "Universitas Dian Nuswantoro",
        degree: "Diploma in Software Engineering",
        date: "Aug 2021 - Dec 2024",
      },
      {
        school: "Universitas Dian Nuswantoro",
        degree: "Diploma in Software Engineering",
        date: "Aug 2021 - Dec 2024",
      },
    ],
  };

  return (
    <div className="container p-4 relative">
      <div className="bg-red-400 w-full h-4 mb-6 rounded-t-md"></div>

      <div id="header" className="text-center">
        <h2 className="font-bold text-red-400">
          {!resumeData.firstName && !resumeData.lastName
            ? "John"
            : `${resumeData.firstName || ""} ${
                resumeData.lastName || ""
              }`.trim()}
        </h2>
        <h4 className="text-sm">
          {resumeData.jobTitle ?? "Full Stack Developer"}
        </h4>
        <h6 className="text-xs">
          {resumeData.address ??
            "Jl. Jakarta Raya No. 14, Kota Jakarta Selatan"}
        </h6>
      </div>

      <div className="flex justify-between my-1 mt-4">
        <p className="font-bold text-sm">
          {resumeData.phone ?? "0813-9304-6112"}
        </p>
        <p className="text-sm">
          {resumeData.resumeEmail ?? "rafiakmal32@gmail.com"}
        </p>
      </div>

      <hr className="border-2 my-1 border-red-400" />

      <p className="text-sm tracking-tight">
        {resumeData.summary ??
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam nam aut accusantium tenetur ut laboriosam harum saepe dolorem labore nemo."}
      </p>

      <h1 className="text-center text-red-400 font-bold mt-4">
        Professional Experience
      </h1>
      <hr className="border-2 my-1 border-red-400" />

      {data.experiences.map((exp, idx) => (
        <div key={idx} className="mb-4">
          <h1 className="font-bold">{exp.title}</h1>
          <div className="flex justify-between text-sm">
            <p>{exp.location}</p>
            <p>{exp.date}</p>
          </div>
          <p className="text-sm tracking-tight mt-2">{exp.description}</p>
        </div>
      ))}

      <h1 className="text-center text-red-400 font-bold">Education</h1>
      <hr className="border-2 my-1 mb-2 border-red-400" />

      {(resumeData.educations?.length > 0
        ? resumeData.educations
        : [
            {
              university: "University Example",
              degree: "Diploma in Example",
              startDate: "Aug 2021",
              endDate: "Dec 2024",
            },
          ]
      ).map((edu, idx) => (
        <div key={idx} className="mb-4">
          <div className="flex flex-row justify-between items-end">
            <div>
              <h2 className="font-bold">{edu.university}</h2>
              <p className="text-sm">{edu.degree}</p>
            </div>
            <p className="text-sm">{edu.startDate + " - " + edu.endDate}</p>
          </div>
        </div>
      ))}
    </div>
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

function ResumeExperience({ resumeData, onHandleChange }) {
  return (
    <>
      <FormField
        label={"Position Title"}
        id={"positionTitle"}
        onChange={onHandleChange}
        value={resumeData?.educations?.positionTitle ?? ""}
      />

      <FormField
        label={"Location"}
        id={"company"}
        onChange={onHandleChange}
        value={resumeData?.company ?? ""}
      />

      <div className="flex gap-4">
        <FormField
          label={"Start Date"}
          id={"startDate"}
          onChange={onHandleChange}
          value={resumeData?.startDate ?? ""}
        />
        <FormField
          label={"End Date"}
          id={"endDate"}
          onChange={onHandleChange}
          value={resumeData?.endDate ?? ""}
        />
      </div>

      <FormField
        label={"Description"}
        id={"description"}
        onChange={onHandleChange}
        value={resumeData?.description ?? ""}
        type="textarea"
      />
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
