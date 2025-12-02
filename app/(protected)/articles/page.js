'use client';
import { useEffect, useState } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";

export default function ArticlesPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const userRef = doc(db, "users", user.uid);
        const q = query(
          collection(db, "articles"),
          where("user", "==", userRef)
        );
        const snap = await getDocs(q);
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setArticles(list);
      } catch (e) {
        console.error(e);
        setError("Failed to fetch articles.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Your articles
      </h1>

      {loading && <p>Loading...</p>}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded border border-red-200">
          {error}
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <p className="text-gray-500">No articles.</p>
      )}

      <div className="space-y-4">
        {articles.map((a) => (
          <article
            key={a.id}
            className="p-4 bg-white rounded-lg shadow border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {a.title}
            </h2>
            <p className="text-gray-600 text-sm mb-2">
              {a.date?.toDate
                ? a.date.toDate().toLocaleString()
                : ""}
            </p>
            <p className="text-gray-700">{a.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
