export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-600">
        AI Customer Support SaaS
      </h1>

      <p className="mt-6 text-xl text-gray-700">
        Build AI-powered customer support using your own documents.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Login
        </button>

        <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
          Register
        </button>
      </div>
    </main>
  );
}