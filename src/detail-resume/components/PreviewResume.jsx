export default function PreviewResume({ resumeData, className = "" }) {
  return (
    <div
      className={`relative p-0 h-max bg-white aspect-[210/350] rounded-md shadow-md print:shadow-none ${className}`}
    >
      <div
        id="print-area"
        className="bg-slate-600 w-full mb-6 rounded-t-md h-4"
      ></div>
      <div className="p-4">
        <div id="header" className="text-center">
          <h2 className="font-bold text-slate-600">
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

        <hr className="border-2 my-1 border-slate-600" />

        <p className="text-sm text-justify tracking-tight">
          {resumeData.summary ??
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam nam aut accusantium tenetur ut laboriosam harum saepe dolorem labore nemo."}
        </p>

        <h1 className="text-center text-slate-600 font-bold mt-4">
          Professional Experience
        </h1>
        <hr className="border-2 my-1 border-slate-600" />

        {(resumeData.experiences?.length > 0
          ? resumeData.experiences
          : [
              {
                position: "Company Example",
                company: "Full Stack Developer",
                startDate: "Aug 2021",
                endDate: "Dec 2024",
                description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, facere illo id animi, fugiat quam exercitationem necessitatibus voluptatibus deserunt maiores, ad quasi quo ratione eius enim repudiandae dolore natus amet reiciendis quod sit? Rem natus, itaque cumque quod, laudantium excepturi quasi laboriosam iusto nostrum corporis sint? Velit maiores unde et!`,
              },
            ]
        ).map((exp, idx) => (
          <div key={idx} className="mb-4">
            <h1 className="font-bold">{exp.position}</h1>
            <div className="flex justify-between text-sm">
              <p>{exp.company}</p>
              <p>{exp.startDate + " - " + exp.endDate}</p>
            </div>
            <p className="text-sm text-justify tracking-tight mt-2">
              {exp.description}
            </p>
          </div>
        ))}

        <h1 className="text-center text-slate-600 font-bold">Education</h1>
        <hr className="border-2 my-1 mb-2 border-slate-600" />

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
    </div>
  );
}
