import Link from "next/link";
import LogoutForm from "@/app/ui/LogoutForm";
import { auth } from "@/auth";

export default async function LandingBlurb() {
  const session = await auth();
  if (!session) {
    return <SignedOutLandingPage />;
  }
  return <SignedInLandingPage />;
}

function SignedOutLandingPage() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <DemoExplanation />
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
      <DemoExplanation />
      <p>
        Changes you make here will be available the next time you log in.
      </p>
      <LogoutForm />
    </div>
  );
}

function DemoExplanation() {
  return (
    <div className="flex flex-col">
      <h3 className="text-xl">Supported use cases:</h3>
      <ul className="list-disc list-inside">
        <li>Add a list title</li>
        <li>Add a task</li>
        <li>Remove a task</li>
        <li>Drag and drop to reorder tasks</li>
        <li>Toggle a task as &quot;completed/not completed&quot;</li>
        <li>Autosaved once logged in</li>
      </ul>
      <h3 className="text-xl pt-4">Technical features:</h3>
      <ul className="list-disc list-inside">
        <li>Use of React features: <code>useReducer()</code>, <code>useContext()</code>, <code>useState()</code></li>
        <li>Leverages React server components, client components, and server actions</li>
        <li>Third party libraries: <a className="underline hover:font-bold" href="https://react-dnd.github.io/react-dnd/about" target="_blank">react-dnd</a> and <a className="underline hover:font-bold" href="https://www.npmjs.com/package/react-autosave" target="_blank">react-autosave</a></li>
        <li>Data persistence with Postgresql</li>
        <li>Authentication using <a className="underline hover:font-bold" href="https://authjs.dev/" target="_blank">Auth.js</a> and a <code>Credentials</code> provider</li>
      </ul>
    </div>
  )
}
