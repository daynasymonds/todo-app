"use client";

import { logOut } from "@/app/lib/actions";
import { useActionState } from "react";

export default function LogoutForm() {
  const [, signoutAction] = useActionState(logOut, "");
  return (
    <form action={signoutAction}>
      <p>
        <button className="underline cursor-pointer hover:font-bold">
          Sign Out
        </button>
      </p>
    </form>
  );
}
