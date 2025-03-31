"use client";

import Panel from "@/app/ui/Panel";
import Link from "next/link";

export default function App() {
  return (
    <div className={"flex h-screen"}>
      <section
        className={
          "grid grid-cols-1 gap-8 md:grid-cols-2 items-center text-center m-auto max-w-[650px] md:max-w-[1200px]"
        }
      >
        <div className={""}>
          <h1 className={"text-2xl"}>Demonstration of a ToDo application</h1>
          <p>
            <small>
              similar to{" "}
              <Link
                className={"underline"}
                target="_blank"
                href={"https://workspace.google.com/products/keep/"}
              >
                Google Keep
              </Link>
            </small>
          </p>
          <p>
            <small>written using React + Tailwind CSS + NextJS</small>
          </p>
          <div className={"flex flex-col gap-4 py-4"}>
            <p>
              This panel demonstrates a static React component.
            </p>
            <p>Log in or create an account to save your changes.</p>
          </div>
        </div>
        <div>
          <Panel />
        </div>
      </section>
    </div>
  );
}
