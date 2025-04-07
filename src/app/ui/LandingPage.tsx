import Link from "next/link";
import LogoutForm from "@/app/ui/LogoutForm";
import { auth } from "@/auth";

export default async function LandingPage() {
  const session = await auth();
  if (!session) {
    return <SignedOutLandingPage />;
  }
  return <SignedInLandingPage />;
}

function SignedOutLandingPage() {
  return (
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
  );
}

function SignedInLandingPage() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <p>
        This panel demonstrates a stateful and persisted React component.
        Changes you make here will be available the next time you log in.
      </p>
      <LogoutForm />
    </div>
  );
}
