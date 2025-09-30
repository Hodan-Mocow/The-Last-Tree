import { useState, useEffect } from 'react';
import { Zap, Flame, Sparkles, Rocket, Trophy, Crown, Star, TrendingUp, Target, Award } from 'lucide-react';

export default function FullEnergy() {
  const [energy, setEnergy] = useState(1000);
  const [power, setPower] = useState(100);
  const [speed, setSpeed] = useState(100);
  const [intensity, setIntensity] = useState(100);
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [explosions, setExplosions] = useState([]);
  const [lightning, setLightning] = useState([]);
  const [flames, setFlames] = useState([]);
  const [message, setMessage] = useState('⚡ FULL ENERGY UNLEASHED! ⚡');
  const [megaMode, setMegaMode] = useState(false);
  const [hyperMode, setHyperMode] = useState(false);
  const [ultraMode, setUltraMode] = useState(false);
  const [godMode, setGodMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Auto-generate energy
      setEnergy(prev => Math.min(9999, prev + (10 * multiplier)));
      setScore(prev => prev + (multiplier * 10));
      
      // Mode upgrades
      if (score > 1000 && !megaMode) {
        setMegaMode(true);
        setMultiplier(2);
        triggerMassiveExplosion('🔥 MEGA MODE ACTIVATED! 🔥');
      }
      if (score > 5000 && !hyperMode) {
        setHyperMode(true);
        setMultiplier(5);
        triggerMassiveExplosion('⚡ HYPER MODE ACTIVATED! ⚡');
      }
      if (score > 15000 && !ultraMode) {
        setUltraMode(true);
        setMultiplier(10);
        triggerMassiveExplosion('💥 ULTRA MODE ACTIVATED! 💥');
      }
      if (score > 50000 && !godMode) {
        setGodMode(true);
        setMultiplier(100);
        triggerMassiveExplosion('👑 GOD MODE ACTIVATED! 👑');
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [multiplier, score, megaMode, hyperMode, ultraMode, godMode]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const createExplosion = (emoji, x, y, count = 20) => {
    const newExplosions = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + Math.random(),
      emoji,
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      delay: Math.random() * 0.3,
      speed: 0.5 + Math.random() * 1.5
    }));
    setExplosions(prev => [...prev, ...newExplosions]);
    setTimeout(() => {
      setExplosions(prev => prev.filter(e => !newExplosions.find(ne => ne.id === e.id)));
    }, 2000);
  };

  const createLightning = () => {
    const newLightning = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5
    }));
    setLightning(newLightning);
    setTimeout(() => setLightning([]), 1000);
  };

  const triggerMassiveExplosion = (msg) => {
    setMessage(msg);
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        createExplosion('💥', Math.random() * 100, Math.random() * 100, 30);
      }, i * 100);
    }
    createLightning();
  };

  const powerBoost = () => {
    setPower(prev => Math.min(999, prev + 50));
    setEnergy(prev => prev + (100 * multiplier));
    setScore(prev => prev + (500 * multiplier));
    createExplosion('⚡', 50, 50, 40);
    createLightning();
    setMessage(`⚡ POWER SURGE! +${500 * multiplier} SCORE!`);
  };

  const speedBoost = () => {
    setSpeed(prev => Math.min(999, prev + 50));
    setEnergy(prev => prev + (150 * multiplier));
    setScore(prev => prev + (750 * multiplier));
    createExplosion('🚀', 50, 70, 40);
    setMessage(`🚀 SPEED BLAST! +${750 * multiplier} SCORE!`);
  };

  const intensityBoost = () => {
    setIntensity(prev => Math.min(999, prev + 50));
    setEnergy(prev => prev + (200 * multiplier));
    setScore(prev => prev + (1000 * multiplier));
    createExplosion('🔥', 50, 30, 50);
    setMessage(`🔥 INTENSITY OVERLOAD! +${1000 * multiplier} SCORE!`);
  };

  const megaBlast = () => {
    setEnergy(9999);
    setPower(999);
    setSpeed(999);
    setIntensity(999);
    setScore(prev => prev + (10000 * multiplier));
    triggerMassiveExplosion(`💥 MEGA BLAST! +${10000 * multiplier} SCORE! 💥`);
    
    // Create flames
    const newFlames = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setFlames(newFlames);
    setTimeout(() => setFlames([]), 2000);
  };

  const nuclearBlast = () => {
    setScore(prev => prev + (50000 * multiplier));
    triggerMassiveExplosion(`☢️ NUCLEAR BLAST! +${50000 * multiplier} SCORE! ☢️`);
    
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        createExplosion('💥', Math.random() * 100, Math.random() * 100, 50);
        createLightning();
      }, i * 50);
    }
  };

  const getCurrentMode = () => {
    if (godMode) return { name: 'GOD MODE', color: 'from-yellow-400 via-orange-500 to-red-600', icon: '👑', glow: 'shadow-yellow-500' };
    if (ultraMode) return { name: 'ULTRA MODE', color: 'from-purple-500 via-pink-500 to-red-500', icon: '💥', glow: 'shadow-purple-500' };
    if (hyperMode) return { name: 'HYPER MODE', color: 'from-blue-500 via-cyan-500 to-green-500', icon: '⚡', glow: 'shadow-blue-500' };
    if (megaMode) return { name: 'MEGA MODE', color: 'from-orange-500 via-red-500 to-pink-500', icon: '🔥', glow: 'shadow-orange-500' };
    return { name: 'FULL ENERGY', color: 'from-green-500 via-blue-500 to-purple-500', icon: '⚡', glow: 'shadow-green-500' };
  };

  const mode = getCurrentMode();

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black animate-pulse" />
      
      {/* Lightning effects */}
      {lightning.map(l => (
        <div
          key={l.id}
          className="fixed top-0 w-1 bg-yellow-300 shadow-2xl shadow-yellow-500"
          style={{
            left: `${l.x}%`,
            height: '100%',
            animation: `lightning 0.5s ease-out forwards`,
            animationDelay: `${l.delay}s`,
            boxShadow: '0 0 20px 5px rgba(255, 255, 0, 0.8)'
          }}
        />
      ))}

      {/* Explosions */}
      {explosions.map(exp => (
        <div
          key={exp.id}
          className="fixed text-8xl pointer-events-none"
          style={{
            left: `${exp.x}%`,
            top: `${exp.y}%`,
            animation: `explode ${exp.speed}s ease-out forwards`,
            animationDelay: `${exp.delay}s`,
            filter: 'drop-shadow(0 0 20px rgba(255, 100, 0, 0.8))'
          }}
        >
          {exp.emoji}
        </div>
      ))}

      {/* Flames */}
      {flames.map(f => (
        <div
          key={f.id}
          className="fixed text-6xl pointer-events-none animate-ping"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`
          }}
        >
          🔥
        </div>
      ))}

      {/* Energy grid lines */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-cyan-500"
            style={{
              top: `${i * 5}%`,
              animation: `slide 2s linear infinite`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Epic Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 blur-3xl opacity-50">
            <div className={`w-full h-full bg-gradient-to-r ${mode.color} animate-pulse`} />
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-center gap-6 mb-4">
              <Zap className="w-20 h-20 text-yellow-400 animate-bounce" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 255, 0, 0.8))' }} />
              <h1 className={`text-8xl md:text-9xl font-black bg-gradient-to-r ${mode.color} bg-clip-text text-transparent animate-pulse`}
                  style={{ textShadow: '0 0 40px rgba(255, 255, 0, 0.5)' }}>
                {mode.icon} {mode.name} {mode.icon}
              </h1>
              <Flame className="w-20 h-20 text-orange-500 animate-bounce" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 100, 0, 0.8))' }} />
            </div>
            
            <div className="text-5xl font-bold mb-4 animate-pulse">
              <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                ⚡ INFINITE POWER UNLEASHED ⚡
              </span>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <div className={`px-8 py-4 bg-gradient-to-r ${mode.color} rounded-full font-black text-3xl shadow-2xl ${mode.glow} animate-bounce`}>
                {multiplier}x MULTIPLIER
              </div>
              <div className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-black text-3xl shadow-2xl shadow-yellow-500 animate-pulse">
                💎 {score.toLocaleString()} SCORE
              </div>
            </div>
          </div>
        </div>

        {/* Message Banner */}
        {message && (
          <div className="mb-8">
            <div className={`bg-gradient-to-r ${mode.color} px-12 py-6 rounded-3xl text-center font-black text-4xl shadow-2xl ${mode.glow} animate-bounce border-4 border-white`}>
              {message}
            </div>
          </div>
        )}

        {/* Energy Stats - MASSIVE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-3xl p-8 text-center shadow-2xl shadow-yellow-500 border-4 border-yellow-300 transform hover:scale-110 transition-all">
            <Zap className="w-20 h-20 mx-auto mb-4 animate-spin" />
            <div className="text-7xl font-black mb-2">{energy}</div>
            <div className="text-2xl font-bold">ENERGY</div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-4 mt-4">
              <div className="bg-white h-4 rounded-full animate-pulse" style={{ width: '100%' }} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 rounded-3xl p-8 text-center shadow-2xl shadow-red-500 border-4 border-red-300 transform hover:scale-110 transition-all">
            <Flame className="w-20 h-20 mx-auto mb-4 animate-bounce" />
            <div className="text-7xl font-black mb-2">{power}</div>
            <div className="text-2xl font-bold">POWER</div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-4 mt-4">
              <div className="bg-white h-4 rounded-full animate-pulse" style={{ width: `${(power / 999) * 100}%` }} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-green-500 rounded-3xl p-8 text-center shadow-2xl shadow-blue-500 border-4 border-blue-300 transform hover:scale-110 transition-all">
            <Rocket className="w-20 h-20 mx-auto mb-4 animate-pulse" />
            <div className="text-7xl font-black mb-2">{speed}</div>
            <div className="text-2xl font-bold">SPEED</div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-4 mt-4">
              <div className="bg-white h-4 rounded-full animate-pulse" style={{ width: `${(speed / 999) * 100}%` }} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-3xl p-8 text-center shadow-2xl shadow-purple-500 border-4 border-purple-300 transform hover:scale-110 transition-all">
            <Sparkles className="w-20 h-20 mx-auto mb-4 animate-spin" />
            <div className="text-7xl font-black mb-2">{intensity}</div>
            <div className="text-2xl font-bold">INTENSITY</div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-4 mt-4">
              <div className="bg-white h-4 rounded-full animate-pulse" style={{ width: `${(intensity / 999) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Energy Core Visualization */}
        <div className="mb-8 relative">
          <div className={`bg-gradient-to-br ${mode.color} rounded-3xl p-16 shadow-2xl ${mode.glow} border-4 border-white relative overflow-hidden`}>
            {/* Pulsing core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-yellow-400 rounded-full animate-ping opacity-20" />
              <div className="absolute w-64 h-64 bg-orange-500 rounded-full animate-pulse" />
              <div className="absolute w-32 h-32 bg-white rounded-full animate-spin" />
            </div>
            
            <div className="relative z-10 text-center">
              <div className="text-9xl mb-8 animate-bounce">
                {mode.icon}
              </div>
              <div className="text-6xl font-black mb-4">
                ENERGY CORE
              </div>
              <div className="text-4xl font-bold">
                OUTPUT: {(energy * multiplier).toLocaleString()} WATTS
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - MASSIVE */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={powerBoost}
            className="bg-gradient-to-br from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white p-12 rounded-3xl font-black text-3xl transform hover:scale-110 transition-all shadow-2xl shadow-yellow-500 border-4 border-yellow-300"
          >
            <Zap className="w-24 h-24 mx-auto mb-4" />
            POWER BOOST
            <div className="text-xl mt-2">+{500 * multiplier}</div>
          </button>

          <button
            onClick={speedBoost}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white p-12 rounded-3xl font-black text-3xl transform hover:scale-110 transition-all shadow-2xl shadow-blue-500 border-4 border-blue-300"
          >
            <Rocket className="w-24 h-24 mx-auto mb-4" />
            SPEED BLAST
            <div className="text-xl mt-2">+{750 * multiplier}</div>
          </button>

          <button
            onClick={intensityBoost}
            className="bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white p-12 rounded-3xl font-black text-3xl transform hover:scale-110 transition-all shadow-2xl shadow-red-500 border-4 border-red-300"
          >
            <Flame className="w-24 h-24 mx-auto mb-4" />
            INTENSITY MAX
            <div className="text-xl mt-2">+{1000 * multiplier}</div>
          </button>
        </div>

        {/* ULTIMATE BUTTONS */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <button
            onClick={megaBlast}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white p-16 rounded-3xl font-black text-5xl transform hover:scale-105 transition-all shadow-2xl shadow-purple-500 border-8 border-white animate-pulse"
          >
            <Trophy className="w-32 h-32 mx-auto mb-6" />
            💥 MEGA BLAST 💥
            <div className="text-3xl mt-4">MAX EVERYTHING!</div>
            <div className="text-2xl mt-2">+{10000 * multiplier} SCORE</div>
          </button>

          <button
            onClick={nuclearBlast}
            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 hover:from-yellow-500 hover:via-orange-600 hover:to-red-700 text-white p-16 rounded-3xl font-black text-5xl transform hover:scale-105 transition-all shadow-2xl shadow-yellow-500 border-8 border-yellow-300 animate-bounce"
          >
            <Crown className="w-32 h-32 mx-auto mb-6" />
            ☢️ NUCLEAR BLAST ☢️
            <div className="text-3xl mt-4">ULTIMATE POWER!</div>
            <div className="text-2xl mt-2">+{50000 * multiplier} SCORE</div>
          </button>
        </div>

        {/* Mode Progress */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border-4 border-gray-700">
          <h3 className="text-4xl font-black text-center mb-6 text-yellow-400">MODE PROGRESSION</h3>
          <div className="space-y-4">
            <div className={`p-6 rounded-2xl ${megaMode ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gray-700'}`}>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">🔥 MEGA MODE</div>
                <div className="text-xl">{megaMode ? '✅ UNLOCKED' : `${Math.min(100, (score / 1000) * 100).toFixed(0)}%`}</div>
              </div>
            </div>
            <div className={`p-6 rounded-2xl ${hyperMode ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-700'}`}>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">⚡ HYPER MODE</div>
                <div className="text-xl">{hyperMode ? '✅ UNLOCKED' : `${Math.min(100, (score / 5000) * 100).toFixed(0)}%`}</div>
              </div>
            </div>
            <div className={`p-6 rounded-2xl ${ultraMode ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'}`}>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">💥 ULTRA MODE</div>
                <div className="text-xl">{ultraMode ? '✅ UNLOCKED' : `${Math.min(100, (score / 15000) * 100).toFixed(0)}%`}</div>
              </div>
            </div>
            <div className={`p-6 rounded-2xl ${godMode ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 animate-pulse' : 'bg-gray-700'}`}>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">👑 GOD MODE</div>
                <div className="text-xl">{godMode ? '✅ UNLOCKED - 100x MULTIPLIER!' : `${Math.min(100, (score / 50000) * 100).toFixed(0)}%`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes explode {
          0% { transform: scale(0.5) rotate(0deg); opacity: 1; }
          100% { transform: scale(3) rotate(360deg); opacity: 0; }
        }
        @keyframes lightning {
          0%, 90%, 100% { opacity: 0; }
          95% { opacity: 1; }
        }
        @keyframes slide {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}