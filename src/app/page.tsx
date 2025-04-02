"use client";

import Panel from "@/app/ui/Panel";
import LogoutForm from "@/src/app/ui/LogoutForm";
import Link from "next/link";

export default function App() {
  return (
    <div className="flex h-screen">
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center text-center m-auto max-w-[650px] md:max-w-[1200px]">
        <div>
          <h1 className="text-2xl">Demonstration of a ToDo application</h1>
          <p>
            <small>
              similar to{" "}
              <a
                className="underline"
                target="_blank"
                href={"https://workspace.google.com/products/keep/"}
              >
                Google Keep
              </a>
            </small>
          </p>
          <p>
            <small>written using React + Tailwind CSS + NextJS</small>
          </p>
          <div className="flex flex-col gap-4 py-4">
            <p>This panel demonstrates a static React component.</p>
            <p>
              <Link className="underline hover:font-bold" href={"/login"}>
                Log in
              </Link>{" "}
              or{" "}
              <Link className="underline hover:font-bold" href={"/signup"}>
                create an account
              </Link>{" "}
              to save your changes.
            </p>
          </div>
          <LogoutForm />
        </div>
        <div>
          <Panel />
        </div>
      </section>
    </div>
  );
}
