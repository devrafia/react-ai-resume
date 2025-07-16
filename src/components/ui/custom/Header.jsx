import { Link } from "react-router";
import { Button } from "../button";
import { UserButton, useUser } from "@clerk/clerk-react";

export function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <>
      <div className="flex justify-between p-4 px-16 shadow-md bg-slate-50 relative z-20">
        <Link to={"/"}>
          <img src="/logo.svg" alt="logo" />
        </Link>
        {!isSignedIn ? (
          <div>
            <Link to={"/dashboard"}>
              <Button>Get Started</Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to={"/dashboard"} className="cursor-pointer">
              <Button className="cursor-pointer">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        )}
      </div>
    </>
  );
}
