import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div>
      <header className="h-[100vh] flex items-center justify-center">
        <SignIn />
      </header>
    </div>
  );
}

export default SignInPage;
