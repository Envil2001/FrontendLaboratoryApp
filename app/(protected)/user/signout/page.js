'use client'
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const onSubmit = () => {
    signOut(auth).then(() => {
      router.push("/");
    });
  };

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Sign out</h2>
      <p className="text-gray-600 mb-6">
        Are you sure you want to sign out from the application?
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
