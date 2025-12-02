'use client';
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    signOut(auth);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-xl shadow-lg text-center">
      <h1 className="text-2xl font-bold text-violet-600 mb-4">
        Email Verification
      </h1>
      <p className="text-gray-700 mb-6">
        A verification email has been sent to{" "}
        <strong>{email}</strong>.
      </p>
      <div className="p-4 bg-yellow-50 text-yellow-800 text-sm rounded-lg mb-6">
        Please click the link in the email to verify your address, then sign in
        again.
      </div>
      <Link
        href="/user/signin"
        className="inline-block px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
      >
        Go to Sign In
      </Link>
    </div>
  );
}
