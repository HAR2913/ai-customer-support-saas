import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-blue-700 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        🤖 SupportAI
      </h1>

      <nav className="space-y-3">

        <Link
          href="/dashboard"
          className="block rounded-lg p-3 hover:bg-blue-800"
        >
          🏠 Dashboard
        </Link>

        <Link
          href="/documents"
          className="block rounded-lg p-3 hover:bg-blue-800"
        >
          📄 Documents
        </Link>

        <Link
          href="/chat"
          className="block rounded-lg p-3 hover:bg-blue-800"
        >
          💬 AI Chat
        </Link>

        <Link
          href="/profile"
          className="block rounded-lg p-3 hover:bg-blue-800"
        >
          👤 Profile
        </Link>

      </nav>
    </aside>
  );
}