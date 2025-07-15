import { UserButton, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { Header } from "../components/ui/custom/Header";

export function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-20 px-6 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            Welcome{user?.firstName ? `, ${user.firstName}` : ""}!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Create stunning resumes effortlessly with our AI-powered Resume
            Builder.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/my-resume"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            >
              Go to My Resume
            </a>
            <a
              href="/my-resume/create"
              className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-200 transition"
            >
              Create New Resume
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
