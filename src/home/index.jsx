import { UserButton, useUser } from "@clerk/clerk-react";
import { Link, Navigate } from "react-router";
import { Header } from "../components/ui/custom/Header";
import { FileText } from "lucide-react";

export function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <>
      <Header />
      <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-between px-16">
        <div className="w-full flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <FileText className="w-12 h-12 text-blue-600" />
              <span className="ml-3 text-xl font-semibold text-blue-700">
                AI Resume Builder
              </span>
            </div>

            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
              Create a Professional Resume in Minutes
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-md">
              A smart platform to help you craft an impressive resume — fast,
              free, and effective.
            </p>

            <Link
              to={"auth/sign-in"}
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Get Started for Free
            </Link>
          </div>

          <div className="flex-1 md:block max-w-fit">
            <svg
              width="320"
              height="400"
              viewBox="0 0 320 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="320"
                height="400"
                rx="24"
                fill="#F9FAFB"
                stroke="#CBD5E1"
                strokeWidth="2"
              />
              <rect
                x="24"
                y="32"
                width="120"
                height="20"
                rx="4"
                fill="#3B82F6"
              />
              <rect
                x="24"
                y="60"
                width="200"
                height="14"
                rx="3"
                fill="#E5E7EB"
              />
              <rect
                x="24"
                y="100"
                width="272"
                height="12"
                rx="3"
                fill="#E5E7EB"
              />
              <rect
                x="24"
                y="120"
                width="272"
                height="12"
                rx="3"
                fill="#E5E7EB"
              />
              <rect
                x="24"
                y="140"
                width="200"
                height="12"
                rx="3"
                fill="#E5E7EB"
              />
              <rect
                x="24"
                y="180"
                width="272"
                height="12"
                rx="3"
                fill="#E5E7EB"
              />
              <rect
                x="24"
                y="200"
                width="272"
                height="12"
                rx="3"
                fill="#E5E7EB"
              />
              <rect
                x="24"
                y="220"
                width="180"
                height="12"
                rx="3"
                fill="#E5E7EB"
              />
              <rect
                x="24"
                y="360"
                width="100"
                height="12"
                rx="3"
                fill="#3B82F6"
              />
            </svg>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-300 rounded-full opacity-30 blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-300 rounded-full opacity-30 blur-3xl -z-10" />
      </section>
    </>
  );
}

export default Home;
