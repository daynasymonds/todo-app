import Link from "next/link";
import LogoutForm from "@/app/ui/LogoutForm";
import { useSession } from "next-auth/react";

export default function LandingPage() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
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
      {!user && (
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
      )}

      {user && (
        <div className="flex flex-col gap-4 py-4">
            <p>This panel demonstrates a stateful and persisted React component. Changes you make here will be available the next time you log in.</p>
          <LogoutForm />
        </div>
      )}
    </div>
  );
}
