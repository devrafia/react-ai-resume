import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { Header } from "../components/ui/custom/Header";

export function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }
  return (
    <>
      <div>
        <Header />
        <h1>Dashboard</h1>
      </div>
    </>
  );
}
