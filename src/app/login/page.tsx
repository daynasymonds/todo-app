import LoginForm from "@/src/app/ui/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
