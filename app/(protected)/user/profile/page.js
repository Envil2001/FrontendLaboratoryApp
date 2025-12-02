'use client';
import { useState, useEffect } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function ProfileForm() {
  const { user } = useAuth();
  const [message, setMessage] = useState({ type: "", content: "" });

  const [address, setAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
  });
  const [addressLoading, setAddressLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadAddress = async () => {
      try {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.address) {
            setAddress({
              street: data.address.street || "",
              city: data.address.city || "",
              zipCode: data.address.zipCode || "",
            });
          }
        }
      } catch (err) {
        console.error("Error loading address:", err);
        setMessage({
          type: "error",
          content: "Failed to load address.",
        });
      } finally {
        setAddressLoading(false);
      }
    };

    loadAddress();
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", content: "" });

    if (!auth.currentUser || !user) return;

    const displayName = e.target.displayName.value;
    const photoURL = e.target.photoURL.value;

    const newAddress = {
      street: e.target.street.value,
      city: e.target.city.value,
      zipCode: e.target.zipCode.value,
    };

    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      await setDoc(
        doc(db, "users", user.uid),
        { address: newAddress },
        { merge: true }
      );

      setAddress(newAddress);
      setMessage({ type: "success", content: "Profile updated!" });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", content: error.message });
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow border border-gray-200">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border-2 border-violet-100">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400">
              ?
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your profile</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {message.content && (
        <div
          className={`p-4 mb-6 rounded-lg ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.content}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (read-only)
            </label>
            <input
              type="email"
              defaultValue={user.email}
              readOnly
              className="w-full px-4 py-2 border bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display name
            </label>
            <input
              type="text"
              name="displayName"
              defaultValue={user.displayName || ""}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile picture URL
            </label>
            <input
              type="url"
              name="photoURL"
              defaultValue={user.photoURL || ""}
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street
            </label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, street: e.target.value }))
              }
              disabled={addressLoading}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, city: e.target.value }))
              }
              disabled={addressLoading}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ZIP code
            </label>
            <input
              type="text"
              name="zipCode"
              value={address.zipCode}
              onChange={(e) =>
                setAddress((prev) => ({ ...prev, zipCode: e.target.value }))
              }
              disabled={addressLoading}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow transition"
            disabled={addressLoading}
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
