import Panel from "@/app/ui/Panel";
import LandingBlurb from "@/app/ui/LandingBlurb";
import Image from "next/image";

export default async function App() {
  return (
    <div className="flex h-screen">
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center text-start m-auto max-w-[650px] md:max-w-[1200px]">
        <div>
          <h1 className="text-2xl">Demonstration of a ToDo application</h1>
          <p>
            <small>
              Similar to{" "}
              <a
                className="underline hover:font-semibold"
                target="_blank"
                href={"https://workspace.google.com/products/keep/"}
              >
                Google Keep
              </a>
              .
            </small>
          </p>
          <p>
            <small>Written using React + Tailwind CSS + NextJS.</small>
          </p>
          <LandingBlurb />
        </div>
        <Panel />
        <footer className="flex gap-4">
          
            <a target="_blank" href="https://github.com/daynasymonds/todo-app">
              <Image
                src="/github-mark.png"
                width={24}
                height={24}
                alt="GitHub logo"
              />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/dayna-symonds-1862302a/"
            >
              <Image
                src="/InBug-Black.png"
                width={24}
                height={24}
                alt="LinkedIn logo"
              />
            </a>
            <a href="https://www.flaticon.com/free-icons/verified" title="verified icons">Verified icons created by NX Icon - Flaticon</a>
        </footer>
      </section>
    </div>
  );
}
