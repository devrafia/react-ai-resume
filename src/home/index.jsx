import { UserButton, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { Header } from "../components/ui/custom/Header";

export function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to={"auth/sign-in"} />;
  }
  return (
    <>
      <div>
        <Header />
        <h1 className="">Home</h1>
      </div>
    </>
  );
}

export default Home;
