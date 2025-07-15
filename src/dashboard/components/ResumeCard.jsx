import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

export function ResumeCard({ resume }) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Link to={`/dashboard/resume/${resume.resumeId}/edit`}>
          <div
            className="group h-[350px] w-[250px] flex flex-col items-center justify-center bg-slate-200 relative
                        hover:bg-slate-300 cursor-pointer shadow-md rounded-md overflow-hidden"
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>

            <div
              className="absolute flex items-center justify-center top-[calc(100%-2rem)] bottom-0 bg-slate-400 w-full 
             transition-all duration-300 group-hover:top-72 
             rounded-t-2xl text-white font-semibold p-1 tracking-wide"
            >
              <h3>{resume.title}</h3>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ResumeCard;
