import FormField from "./FormField";

export default function ResumePersonalDetail({ resumeData, onHandleChange }) {
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
