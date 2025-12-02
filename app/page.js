import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-4xl font-bold text-violet-600 dark:text-violet-400">
        Frontend Laboratory App
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
        This is the base application for Laboratory classes 7–11.
        Firebase authentication is implemented here.
      </p>

      <div className="flex gap-4">
        <Link
          href="/user/signin"
          className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition shadow-lg"
        >
          Sign In
        </Link>

        <Link
          href="/user/register"
          className="px-6 py-3 bg-white text-violet-600 border border-violet-600 rounded-lg hover:bg-gray-50 transition shadow-lg"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
