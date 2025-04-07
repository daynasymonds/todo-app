import Panel from "@/app/ui/Panel";
import LandingPage from "@/src/app/ui/LandingPage";

export default async function App() {
  return (
    <div className="flex h-screen">
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center text-center m-auto max-w-[650px] md:max-w-[1200px]">
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
          <LandingPage />
        </div>
        {/* <Panel /> */}
      </section>
    </div>
  );
}
