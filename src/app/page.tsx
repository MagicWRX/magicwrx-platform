export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Hello World!</h1>
        <p className="text-xl mb-8">Magic WRX is working! 🚀</p>
        <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
          <p className="text-sm">Deploy Version: v1.1.3</p>
        </div>
      </div>
    </div>
  )
}
