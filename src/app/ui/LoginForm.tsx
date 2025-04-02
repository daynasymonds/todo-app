"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/Button";
import { authenticate } from "@/app/lib/actions";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [errorMessage, loginAction] = useActionState(authenticate, undefined);

  return (
    <div className="flex h-screen">
      <form
        action={loginAction}
        className="flex flex-col gap-2 m-auto w-[600px]"
      >
        <h1 className={"text-2xl"}>Please login:</h1>
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
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
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
                minLength={6}
              />
              <KeyIcon className="pointer-events-none  absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="">
          Login <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <Link href="/reset" className="">
          <span>Forgot password?</span>
        </Link>
      </form>
    </div>
  );
}
