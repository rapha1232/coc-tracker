import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-purple-100 p-8 flex justify-center items-center">
      <main className="max-w-md mx-auto bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-purple-900/50">
        <div className="p-8 m-8">
          <h1 className="text-4xl font-bold text-center m-8 mb-6 text-purple-400 font-[supercell]">
            Clash of Clans
          </h1>

          <div className="space-y-6">
            <div className="bg-gray-900/80 p-6 rounded-lg border border-purple-800/50">
              <h2 className="text-2xl font-semibold mb-4 text-center text-purple-300">
                Enter Player Tag
              </h2>
            </div>
            <div className="bg-gray-900/80 p-6 rounded-lg border border-purple-800/50">
              <form action={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-4 text-center text-purple-300">
                  Player Data
                </h2>
                <p className="text-purple-300 mb-4">
                  Please enter a player tag to view data.
                </p>
                <input
                  name="playerTag"
                  className="w-full p-3 bg-gray-800/70 border border-purple-700 rounded-md text-purple-200 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                  placeholder="#PlayerTag"
                  required
                />
                <button
                  type="submit"
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
                >
                  View Player
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

async function handleSubmit(formData: FormData) {
  "use server";

  const playerTag = formData.get("playerTag")?.toString();

  // Redirect to the player page
  return redirect(`/player/${playerTag?.replace("#", "%23")}`); // Ensure cleanTag is defined
}
