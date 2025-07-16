import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { Header } from "../components/ui/custom/Header";
import { AddResume } from "./components/AddResume";
import GlobalApi from "../../services/GlobalApi";
import { useEffect, useState } from "react";
import ResumeCard from "./components/ResumeCard";
import { GoogleGenAI } from "@google/genai";
import LoadingScreen from "../components/ui/custom/LoadingScreen";

export function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserResumes();
  }, [user]);

  const getUserResumes = () => {
    setLoading(true);
    GlobalApi.getUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (response) => {
        setResumes(response.data.data);
        console.log(response);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
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
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex justify-between px-16">
          <AddResume>
            {loading ? (
              <LoadingScreen />
            ) : (
              resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))
            )}
          </AddResume>
        </div>
      </div>
    </>
  );
}
