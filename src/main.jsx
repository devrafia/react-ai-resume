import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import SignInPage from "./auth/sign-in/index.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { Home } from "./Home/index.jsx";
import { Dashboard } from "./dashboard/index..jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const root = document.getElementById("root");

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/auth/sign-in"
    >
      <Routes>
        <Route index element={<Home />} />
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ClerkProvider>
  </BrowserRouter>
);
