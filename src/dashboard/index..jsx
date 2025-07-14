import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { Header } from "../components/ui/custom/Header";
import { AddResume } from "./components/AddResume";
import GlobalApi from "../../services/GlobalApi";
import { useEffect, useState } from "react";
import ResumeCard from "./components/ResumeCard";
import { GoogleGenAI } from "@google/genai";

export function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    getUserResumes();
  }, [user]);

  const getUserResumes = () => {
    GlobalApi.getUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (response) => {
        setResumes(response.data.data);
        console.log(resumes);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <>
      <div>
        <Header />
        <AddResume>
          {resumes.length < 1 ? (
            <h1>Loading....</h1>
          ) : (
            resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))
          )}
        </AddResume>
      </div>
    </>
  );
}
