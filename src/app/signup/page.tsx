import SignUpForm from "@/src/app/ui/SignupForm";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <main>
      <Suspense>
        <SignUpForm />
      </Suspense>
    </main>
  );
}
