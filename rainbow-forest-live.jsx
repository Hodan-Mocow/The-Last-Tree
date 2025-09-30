import { useState, useEffect } from 'react';
import { TreePine, Droplets, Heart, Star, Sun, Cloud, Smile } from 'lucide-react';

export default function RainbowForest() {
  const [treeHealth, setTreeHealth] = useState(80);
  const [waterLevel, setWaterLevel] = useState(60);
  const [loveLevel, setLoveLevel] = useState(70);
  const [sunshineLevel, setSunshineLevel] = useState(80);
  const [friendsMade, setFriendsMade] = useState(0);
  const [rainbows, setRainbows] = useState([]);
  const [animals, setAnimals] = useState(['🦋', '🐝', '🦜']);
  const [message, setMessage] = useState('Welcome to Rainbow Forest! 🌈');
  const [showFact, setShowFact] = useState(false);

  const funFacts = [
    "🌳 Trees can live for thousands of years!",
    "🌍 One tree produces enough oxygen for 2 people!",
    "🐦 Trees are homes for millions of animals!",
    "💚 Trees help clean the air we breathe!",
    "🌧️ Trees help make rain by releasing water!",
    "🎨 Trees give us beautiful colors in fall!",
    "🎵 Trees can 'talk' to each other through roots!",
    "⭐ The tallest tree is taller than the Statue of Liberty!"
  ];

  const [currentFact, setCurrentFact] = useState(funFacts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaterLevel(prev => Math.max(0, prev - 3));
      setLoveLevel(prev => Math.max(0, prev - 2));
      setSunshineLevel(prev => Math.max(0, prev - 1));
      
      if (waterLevel > 40 && loveLevel > 40 && sunshineLevel > 40) {
        setTreeHealth(prev => Math.min(100, prev + 2));
      } else if (waterLevel < 30 || loveLevel < 30) {
        setTreeHealth(prev => Math.max(0, prev - 1));
      }
    }, 2500);
    
    return () => clearInterval(interval);
  }, [waterLevel, loveLevel, sunshineLevel]);

  useEffect(() => {
    const timer = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const waterTree = () => {
    setWaterLevel(100);
    setMessage('💧 Splash splash! The tree drinks happily!');
    if (Math.random() > 0.7) {
      setAnimals(prev => [...new Set([...prev, '🐸', '🦆'])]);
    }
  };

  const showLove = () => {
    setLoveLevel(100);
    const newRainbows = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: 20 + Math.random() * 60,
      delay: Math.random() * 0.4
    }));
    setRainbows(prev => [...prev, ...newRainbows]);
    setTimeout(() => {
      setRainbows(prev => prev.filter(r => !newRainbows.find(nr => nr.id === r.id)));
    }, 2000);
    setMessage('💖 Love makes everything grow! Yay!');
  };

  const addSunshine = () => {
    setSunshineLevel(100);
    setMessage('☀️ Sunshine makes the tree so happy!');
  };

  const makeFriend = () => {
    const newFriends = ['🦊', '🦝', '🐿️', '🦔', '🐰', '🦌', '🦉'];
    const randomFriend = newFriends[Math.floor(Math.random() * newFriends.length)];
    if (!animals.includes(randomFriend)) {
      setAnimals(prev => [...prev, randomFriend]);
      setFriendsMade(prev => prev + 1);
      setMessage(`${randomFriend} wants to be your friend!`);
    }
  };

  const learnFact = () => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setCurrentFact(randomFact);
    setShowFact(true);
    setTimeout(() => setShowFact(false), 5000);
  };

  const getTreeEmoji = () => {
    if (treeHealth > 90) return '🌳✨';
    if (treeHealth > 70) return '🌳🌸';
    if (treeHealth > 50) return '🌳';
    if (treeHealth > 30) return '🌿';
    return '🍂';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-purple-200 to-pink-200 p-8 relative overflow-hidden">
      {/* Floating animals */}
      <div className="fixed inset-0 pointer-events-none">
        {animals.map((animal, i) => (
          <div
            key={i}
            className="absolute text-5xl"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animation: `bounce 2s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            {animal}
          </div>
        ))}
      </div>

      {/* Rainbows */}
      {rainbows.map(r => (
        <div
          key={r.id}
          className="absolute text-8xl pointer-events-none"
          style={{
            left: `${r.x}%`,
            top: '20%',
            animation: `fadeUp 2s ease-out forwards`,
            animationDelay: `${r.delay}s`
          }}
        >
          🌈
        </div>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-7xl font-bold mb-3" style={{
            background: 'linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🌈 RAINBOW FOREST 🌈
          </h1>
          <p className="text-3xl font-bold text-purple-700">
            Grow the happiest tree ever! 🎉
          </p>
        </div>

        {message && (
          <div className="bg-white bg-opacity-90 backdrop-blur-sm text-purple-800 px-8 py-4 rounded-full text-center mb-6 shadow-lg font-bold text-2xl animate-bounce">
            {message}
          </div>
        )}

        {showFact && (
          <div className="bg-yellow-300 border-4 border-yellow-500 rounded-3xl px-8 py-6 text-center mb-6 shadow-2xl animate-pulse">
            <div className="text-3xl font-bold text-yellow-900 mb-2">🌟 Fun Fact! 🌟</div>
            <div className="text-2xl text-yellow-800">{currentFact}</div>
          </div>
        )}

        {/* Stats - Colorful */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-300 to-green-500 rounded-3xl p-6 text-center shadow-xl transform hover:scale-110 transition-all">
            <div className="text-6xl mb-2">{getTreeEmoji()}</div>
            <div className="text-4xl font-bold text-white">{treeHealth}%</div>
            <div className="text-sm text-white font-bold">HAPPY</div>
          </div>

          <div className="bg-gradient-to-br from-blue-300 to-blue-500 rounded-3xl p-6 text-center shadow-xl transform hover:scale-110 transition-all">
            <div className="text-6xl mb-2">💧</div>
            <div className="text-4xl font-bold text-white">{waterLevel}%</div>
            <div className="text-sm text-white font-bold">WATER</div>
          </div>

          <div className="bg-gradient-to-br from-pink-300 to-pink-500 rounded-3xl p-6 text-center shadow-xl transform hover:scale-110 transition-all">
            <div className="text-6xl mb-2">💖</div>
            <div className="text-4xl font-bold text-white">{loveLevel}%</div>
            <div className="text-sm text-white font-bold">LOVE</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-6 text-center shadow-xl transform hover:scale-110 transition-all">
            <div className="text-6xl mb-2">☀️</div>
            <div className="text-4xl font-bold text-white">{sunshineLevel}%</div>
            <div className="text-sm text-white font-bold">SUN</div>
          </div>

          <div className="bg-gradient-to-br from-purple-300 to-purple-500 rounded-3xl p-6 text-center shadow-xl transform hover:scale-110 transition-all">
            <div className="text-6xl mb-2">🐾</div>
            <div className="text-4xl font-bold text-white">{friendsMade}</div>
            <div className="text-sm text-white font-bold">FRIENDS</div>
          </div>
        </div>

        {/* Tree Display */}
        <div className="bg-white bg-opacity-60 backdrop-blur-lg rounded-3xl p-12 mb-6 shadow-2xl border-4 border-white">
          <div className="relative h-80 flex items-end justify-center">
            <div className={`text-9xl transition-all duration-1000 ${
              treeHealth > 80 ? 'scale-125 animate-bounce' : 
              treeHealth > 50 ? 'scale-110' : 
              'scale-100'
            }`}>
              {getTreeEmoji()}
            </div>
            
            {/* Floating hearts around healthy tree */}
            {treeHealth > 80 && (
              <>
                <div className="absolute top-10 left-20 text-4xl animate-pulse">💚</div>
                <div className="absolute top-10 right-20 text-4xl animate-pulse" style={{animationDelay: '0.5s'}}>💚</div>
                <div className="absolute bottom-20 left-32 text-4xl animate-pulse" style={{animationDelay: '1s'}}>⭐</div>
                <div className="absolute bottom-20 right-32 text-4xl animate-pulse" style={{animationDelay: '1.5s'}}>⭐</div>
              </>
            )}
          </div>
        </div>

        {/* Actions - Big and Colorful */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <button
            onClick={waterTree}
            className="bg-gradient-to-br from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 border-white"
          >
            <Droplets className="w-16 h-16 mx-auto mb-2" />
            <div className="text-2xl font-bold">Water!</div>
          </button>

          <button
            onClick={showLove}
            className="bg-gradient-to-br from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 border-white"
          >
            <Heart className="w-16 h-16 mx-auto mb-2 fill-current" />
            <div className="text-2xl font-bold">Love!</div>
          </button>

          <button
            onClick={addSunshine}
            className="bg-gradient-to-br from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 border-white"
          >
            <Sun className="w-16 h-16 mx-auto mb-2" />
            <div className="text-2xl font-bold">Sun!</div>
          </button>

          <button
            onClick={makeFriend}
            className="bg-gradient-to-br from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 border-white"
          >
            <Smile className="w-16 h-16 mx-auto mb-2" />
            <div className="text-2xl font-bold">Friend!</div>
          </button>

          <button
            onClick={learnFact}
            className="bg-gradient-to-br from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 border-white"
          >
            <Star className="w-16 h-16 mx-auto mb-2" />
            <div className="text-2xl font-bold">Learn!</div>
          </button>
        </div>

        {/* Animal Friends Display */}
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
          <h3 className="text-3xl font-bold text-purple-700 text-center mb-4">
            🐾 Your Forest Friends! 🐾
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {animals.map((animal, i) => (
              <div 
                key={i}
                className="text-6xl transform hover:scale-125 transition-all cursor-pointer"
                title={`Friend ${i + 1}`}
              >
                {animal}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-3xl p-8 text-center shadow-xl">
          <p className="text-2xl font-bold text-purple-900">
            🌟 "Every tree you help makes the world more colorful!" 🌟
          </p>
          <p className="text-xl text-purple-800 mt-2">
            Keep your tree happy and watch your forest grow! 🌈
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          0% { transform: translateY(0) scale(0.5); opacity: 1; }
          100% { transform: translateY(-200px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}