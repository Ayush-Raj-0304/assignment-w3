export default function Settings({ theme }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className={`p-6 rounded-lg shadow-sm transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      } border ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <p className="text-lg">Settings feature coming soon...</p>
      </div>
    </div>
  )
} 