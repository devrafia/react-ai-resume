import { Button } from "../../components/ui/button";
import FormField from "./FormField";

export default function ResumeExperience({
  resumeData,
  setResumeData,
  onHandleChange,
}) {
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
