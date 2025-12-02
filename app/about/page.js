export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-violet-600">
        About the Application
      </h1>

      <section className="bg-white rounded-xl shadow border border-gray-200 p-6 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">Author</h2>
        <p className="text-gray-700">
          My name is <strong>Andrii Shcherbakov</strong>, student ID number{" "}
          <strong>15900</strong>.
        </p>
        <p className="text-gray-700">
          This application was created as part of laboratory classes 6–11 for
          the Frontend course. The topic of my project is{" "}
          <strong>Topic 6 – Word Search game</strong>.
        </p>
      </section>

      <section className="bg-white rounded-xl shadow border border-gray-200 p-6 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">
          Application Features
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>
            User authentication using Firebase Authentication (email + password).
          </li>
          <li>
            Authorization – access to the <code>(protected)</code> section only
            for logged-in users (profile, change password, game, articles).
          </li>
          <li>
            User profile with the ability to change display name, profile photo
            URL and add an address (stored in the <code>users</code> collection
            in Firestore).
          </li>
          <li>
            Sample backend data in Firestore collections:{" "}
            <code>users</code> and <code>articles</code>, with security rules.
          </li>
          <li>Page with a list of articles belonging to the logged-in user.</li>
          <li>
            Word Search game as the main project component (Topic 6).
          </li>
        </ul>
      </section>

      <section className="bg-white rounded-xl shadow border border-gray-200 p-6 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">Technologies</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Next.js (App Router)</li>
          <li>React</li>
          <li>Tailwind CSS (Mamba UI-style components)</li>
          <li>Firebase Authentication</li>
          <li>Cloud Firestore</li>
        </ul>
      </section>
    </div>
  );
}
