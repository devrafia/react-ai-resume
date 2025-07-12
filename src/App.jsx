import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

function App() {
  const [count, setCount] = useState(0);
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to={"auth/sign-in"} />;
  }

  return (
    <>
      <div className="">
        Welcome to my project
        <Button>sadasd</Button>
      </div>
    </>
  );
}

export default App;
