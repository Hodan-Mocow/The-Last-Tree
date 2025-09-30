import { useState, useEffect } from 'react';
import { TreePine, Droplets, Heart, Sparkles, Music, Flower2 } from 'lucide-react';

export default function PeacefulGarden() {
  const [treeHealth, setTreeHealth] = useState(100);
  const [waterLevel, setWaterLevel] = useState(70);
  const [loveLevel, setLoveLevel] = useState(70);
  const [zenScore, setZenScore] = useState(0);
  const [blossoms, setBlossoms] = useState([]);
  const [message, setMessage] = useState('Welcome to your peaceful garden 🌸');

  useEffect(() => {
    const timer = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaterLevel(prev => Math.max(0, prev - 2));
      setLoveLevel(prev => Math.max(0, prev - 1));
      
      if (waterLevel > 40 && loveLevel > 40) {
        setTreeHealth(prev => Math.min(100, prev + 3));
        setZenScore(prev => prev + 1);
      } else if (waterLevel < 20 || loveLevel < 20) {
        setTreeHealth(prev => Math.max(0, prev - 2));
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [waterLevel, loveLevel]);

  const waterTree = () => {
    setWaterLevel(100);
    setMessage('💧 Fresh water flows... the tree sighs with relief');
  };

  const showLove = () => {
    setLoveLevel(100);
    const newBlossoms = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: 40 + Math.random() * 20,
      delay: Math.random() * 0.3
    }));
    setBlossoms(prev => [...prev, ...newBlossoms]);
    setTimeout(() => {
      setBlossoms(prev => prev.filter(b => !newBlossoms.find(nb => nb.id === b.id)));
    }, 2000);
    setMessage('💚 Love radiates... cherry blossoms bloom');
  };

  const meditate = () => {
    setZenScore(prev => prev + 10);
    setMessage('🧘 You breathe deeply... peace fills the garden');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8 relative overflow-hidden">
      {/* Floating petals */}
      {blossoms.map(b => (
        <div
          key={b.id}
          className="absolute text-4xl pointer-events-none"
          style={{
            left: `${b.x}%`,
            top: '60%',
            animation: `fallPetal 2s ease-out forwards`,
            animationDelay: `${b.delay}s`
          }}
        >
          🌸
        </div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-purple-800 mb-4">
            🌸 Peaceful Garden 🌸
          </h1>
          <p className="text-2xl text-purple-600 italic">
            A sanctuary of calm and growth
          </p>
        </div>

        {message && (
          <div className="bg-white bg-opacity-80 backdrop-blur-sm text-purple-800 px-6 py-3 rounded-full text-center mb-6 shadow-lg">
            {message}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-3xl p-6 text-center shadow-lg">
            <div className="text-5xl mb-2">🌳</div>
            <div className="text-3xl font-bold text-green-600">{treeHealth}%</div>
            <div className="text-sm text-gray-600">Vitality</div>
          </div>
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-3xl p-6 text-center shadow-lg">
            <div className="text-5xl mb-2">💧</div>
            <div className="text-3xl font-bold text-blue-600">{waterLevel}%</div>
            <div className="text-sm text-gray-600">Hydration</div>
          </div>
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-3xl p-6 text-center shadow-lg">
            <div className="text-5xl mb-2">💖</div>
            <div className="text-3xl font-bold text-pink-600">{loveLevel}%</div>
            <div className="text-sm text-gray-600">Love</div>
          </div>
          <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-3xl p-6 text-center shadow-lg">
            <div className="text-5xl mb-2">☮️</div>
            <div className="text-3xl font-bold text-purple-600">{zenScore}</div>
            <div className="text-sm text-gray-600">Zen Points</div>
          </div>
        </div>

        {/* Tree Display */}
        <div className="bg-white bg-opacity-40 backdrop-blur-lg rounded-3xl p-12 mb-8 shadow-2xl">
          <div className="relative h-80 flex items-end justify-center">
            <div className={`text-9xl transition-all duration-1000 ${
              treeHealth > 80 ? 'scale-110' : treeHealth > 50 ? 'scale-100' : 'scale-90 opacity-70'
            }`}>
              {treeHealth > 80 ? '🌸🌳🌸' : treeHealth > 50 ? '🌳' : '🍂'}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <button
            onClick={waterTree}
            className="bg-gradient-to-br from-blue-400 to-cyan-300 hover:from-blue-500 hover:to-cyan-400 text-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition-all"
          >
            <Droplets className="w-16 h-16 mx-auto mb-3" />
            <div className="text-2xl font-bold">Water</div>
            <div className="text-sm opacity-90">Replenish fully</div>
          </button>

          <button
            onClick={showLove}
            className="bg-gradient-to-br from-pink-400 to-rose-300 hover:from-pink-500 hover:to-rose-400 text-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition-all"
          >
            <Heart className="w-16 h-16 mx-auto mb-3 fill-current" />
            <div className="text-2xl font-bold">Love</div>
            <div className="text-sm opacity-90">Share compassion</div>
          </button>

          <button
            onClick={meditate}
            className="bg-gradient-to-br from-purple-400 to-indigo-300 hover:from-purple-500 hover:to-indigo-400 text-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition-all"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-3" />
            <div className="text-2xl font-bold">Meditate</div>
            <div className="text-sm opacity-90">Find peace</div>
          </button>
        </div>

        <div className="bg-purple-100 rounded-3xl p-8 text-center">
          <p className="text-xl text-purple-800 italic">
            "In the garden of life, water nourishes the roots, but love helps the soul bloom." 🌸
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fallPetal {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(300px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}