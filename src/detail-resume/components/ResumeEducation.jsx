import { Button } from "../../components/ui/button";
import FormField from "./FormField";

export default function ResumeEducation({
  resumeData,
  setResumeData,
  onHandleChange,
}) {
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
