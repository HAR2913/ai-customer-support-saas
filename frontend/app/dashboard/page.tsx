import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex">

        <Sidebar />

        <div className="flex-1">

          <Navbar />

          <main className="p-10 bg-gray-100 min-h-screen">

            <h1 className="text-4xl font-bold text-black">
              Welcome 👋
            </h1>

            <p className="mt-2 text-gray-600">
              Manage your AI Customer Support Platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

              <Link href="/documents">
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
                  <h2 className="text-2xl font-bold text-black">
                    📄 Documents
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Upload and manage your company documents.
                  </p>

                  <p className="mt-4 text-blue-600 font-semibold">
                    Open Documents →
                  </p>
                </div>
              </Link>

              <Link href="/chat">
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
                  <h2 className="text-2xl font-bold text-black">
                    💬 AI Chat
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Chat with your AI assistant using your knowledge base.
                  </p>

                  <p className="mt-4 text-blue-600 font-semibold">
                    Start Chat →
                  </p>
                </div>
              </Link>

              <Link href="/profile">
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
                  <h2 className="text-2xl font-bold text-black">
                    👤 Profile
                  </h2>

                  <p className="mt-2 text-gray-500">
                    View and manage your account.
                  </p>

                  <p className="mt-4 text-blue-600 font-semibold">
                    View Profile →
                  </p>
                </div>
              </Link>

            </div>

          </main>

        </div>

      </div>
    </ProtectedRoute>
  );
}