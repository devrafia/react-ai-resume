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
            className="group h-[350px] w-[250px] flex flex-col items-center justify-center bg-slate-100 relative
                        hover:bg-slate-300 cursor-pointer shadow-md rounded-md overflow-hidden"
          >
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              className="w-full h-full object-cover rounded-md shadow-md group-hover:scale-105 transition"
              alt="resume image"
            />
            <div
              className="absolute top-[calc(100%-2.5rem)] bottom-0 bg-red-500 w-full 
             transition-all duration-300 group-hover:top-72 text-center 
             rounded-t-2xl text-white font-bold p-2 tracking-wide uppercase"
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
