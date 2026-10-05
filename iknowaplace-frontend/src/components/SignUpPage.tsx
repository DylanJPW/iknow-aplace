import { useState, type ComponentProps } from "react";
import signupImage from "../assets/singup-img.png";

export function SignUpPage() {
  const [error, setError] = useState("");

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    setError("");

    const form = new FormData(event.currentTarget);
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  }


  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6">
      <section aria-labelledby="signup-logo" className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">

        <header className="mb-8">
          <img src={signupImage} id="signup-logo" alt="Sign Up" className="w-42 mx-auto block" />

          <h1 id="signup-heading" className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome to I Know A Place!
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter your details to get started. All fields are required.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
          <div className="space-y-6">
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md px-3 py-2 border border-slate-300 shadow-sm focus:ring-4 focus:ring-indigo-300/50"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md px-3 py-2 border border-slate-300 shadow-sm focus:ring-4 focus:ring-indigo-300/50"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md px-3 py-2 border border-slate-300 shadow-sm focus:ring-4 focus:ring-indigo-300/50"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-md px-3 py-2 border border-slate-300 shadow-sm focus:ring-4 focus:ring-indigo-300/50"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>

              <p className="mt-4 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                  Login
                </a>
              </p>
            </div>
            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}