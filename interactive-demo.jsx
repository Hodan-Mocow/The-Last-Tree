import { useState } from 'react';
import { Sparkles, Heart, Zap, Code, FileText, Palette } from 'lucide-react';

export default function ArtifactDemo() {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('interactive');

  const features = [
    { icon: Code, title: 'React Components', desc: 'Interactive UI with hooks' },
    { icon: Palette, title: 'Tailwind Styling', desc: 'Beautiful, responsive design' },
    { icon: FileText, title: 'Multiple Formats', desc: 'HTML, Markdown, SVG & more' },
    { icon: Zap, title: 'Real-time Updates', desc: 'Live rendering as you interact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Digital Artifacts Demo
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Interactive components rendered directly in your browser
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'interactive'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Interactive Demo
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'features'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Features
          </button>
        </div>

        {/* Content */}
        {activeTab === 'interactive' ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            {/* Counter Section */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Interactive Counter
              </h2>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8">
                <div className="text-6xl font-bold text-purple-600 mb-6">
                  {count}
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setCount(count - 1)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
                  >
                    Decrease
                  </button>
                  <button
                    onClick={() => setCount(0)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setCount(count + 1)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md"
                  >
                    Increase
                  </button>
                </div>
              </div>
            </div>

            {/* Like Button Section */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                State Management
              </h2>
              <button
                onClick={() => setLiked(!liked)}
                className={`inline-flex items-center gap-3 py-4 px-8 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg ${
                  liked
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${liked ? 'fill-current' : ''}`}
                />
                {liked ? 'Liked!' : 'Click to Like'}
              </button>
            </div>

            {/* Live Preview */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Live Component State
              </h3>
              <div className="bg-white rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600">
                  <span className="text-blue-600">count:</span> {count}
                </div>
                <div className="text-gray-600">
                  <span className="text-blue-600">liked:</span>{' '}
                  {liked.toString()}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              What Can Artifacts Do?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <feature.icon className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Available Artifact Types
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>React (.jsx)</strong> - Interactive components with full React hooks support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>HTML (.html)</strong> - Web pages with CSS and JavaScript</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Markdown (.md)</strong> - Formatted documents and content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>SVG (.svg)</strong> - Vector graphics and diagrams</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span><strong>Mermaid (.mermaid)</strong> - Flowcharts and diagrams</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            This artifact is rendered live in your browser • Try interacting with the buttons above!
          </p>
        </div>
      </div>
    </div>
  );
}
