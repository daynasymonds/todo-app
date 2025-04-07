"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/Button";
import { signUp } from "@/app/lib/actions";
import { SignupState } from "@/app/lib/types";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [formData, setFormData] = useState({ email: "" });
  const initialState: SignupState = { errors: {}, message: null };
  const [state, signupAction, isPending] = useActionState(signUp, initialState);

  return (
    <div className="flex h-screen">
      <form
        action={signupAction}
        className="flex flex-col gap-2 m-auto w-[600px]"
      >
        <h1 className={"text-2xl"}>Sign up with an email and password:</h1>
        <div className="flex flex-col gap-2">
          <div>
            <label
              className="block font-medium text-xs py-2 text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.currentTarget.value })
                }
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <div>
            <label
              className=" text-xs font-medium py-2 text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={8}
              />
              <KeyIcon className="pointer-events-none  absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <div>
            <label
              className=" text-xs font-medium py-2 text-gray-900"
              htmlFor="confirm"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                className="peer w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500"
                id="confirm"
                type="password"
                name="confirm"
                placeholder="Confirm password"
                required
                minLength={8}
              />
              <KeyIcon className="pointer-events-none  absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="confirm-error" aria-live="polite" aria-atomic="true">
            {state.errors?.confirm &&
              state.errors.confirm.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="" disabled={isPending}>
          Create account{" "}
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {state?.message && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
