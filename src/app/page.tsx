"use client";

import { SessionProvider } from "next-auth/react";
import Panel from "@/app/ui/Panel";
import LandingPage from "@/src/app/ui/LandingPage";

export default function App() {
  return (
    <SessionProvider>
      <div className="flex h-screen">
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center text-center m-auto max-w-[650px] md:max-w-[1200px]">
          <LandingPage />
          <Panel />
        </section>
      </div>
    </SessionProvider>
  );
}
