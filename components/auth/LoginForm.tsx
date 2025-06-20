"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const playerTag = formData.get("playerTag") as string;

    if (isLogin) {
      // Handle login
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid credentials");
        return;
      }

      router.push("/dashboard");
    } else {
      // Handle registration
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            playerTag: playerTag.startsWith('#') ? playerTag : `#${playerTag}`,
          }),
        });

        if (res.ok) {
          // After successful registration, log the user in
          const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });

          if (result?.error) {
            setError("Error signing in after registration");
            return;
          }

          // Redirect to onboarding instead of dashboard for new users
          router.push("/onboarding");
        } else {
          const data = await res.json();
          setError(data.error || "Error during registration");
        }
      } catch (error) {
        console.error("Registration error:", error);
        setError("Error during registration");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {error && (
        <div
          className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded-lg relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!isLogin && (
        <>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-purple-200"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required={!isLogin}
              className="mt-1 block w-full px-3 py-2 bg-gray-800/70 border border-purple-700 rounded-md text-purple-200 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="playerTag"
              className="block text-sm font-medium text-purple-200"
            >
              Clash of Clans Player Tag
            </label>
            <input
              id="playerTag"
              name="playerTag"
              type="text"
              required={!isLogin}
              placeholder="#XXXXXX"
              className="mt-1 block w-full px-3 py-2 bg-gray-800/70 border border-purple-700 rounded-md text-purple-200 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            />
          </div>
        </>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-purple-200"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-800/70 border border-purple-700 rounded-md text-purple-200 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-purple-200"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={isLogin ? "current-password" : "new-password"}
          required
          className="mt-1 block w-full px-3 py-2 bg-gray-800/70 border border-purple-700 rounded-md text-purple-200 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
        >
          {isLogin ? "Sign in" : "Sign up"}
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          {isLogin
            ? "Need an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </form>
  );
}
