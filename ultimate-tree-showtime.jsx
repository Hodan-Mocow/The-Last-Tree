import { useState, useEffect } from 'react';
import { TreePine, Droplets, Heart, Sun, Moon, Zap, Star, Trophy, Crown, Sparkles, Globe, Users, Target, Award } from 'lucide-react';

export default function TheUltimateTree() {
  // Core stats
  const [treeHealth, setTreeHealth] = useState(100);
  const [waterLevel, setWaterLevel] = useState(80);
  const [loveLevel, setLoveLevel] = useState(80);
  const [sunshineLevel, setSunshineLevel] = useState(80);
  
  // Progress & Achievements
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [totalTrees, setTotalTrees] = useState(1);
  const [daysSurvived, setDaysSurvived] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [globalImpact, setGlobalImpact] = useState(0);
  
  // Game modes
  const [mode, setMode] = useState('zen'); // zen, survival, party
  const [isDay, setIsDay] = useState(true);
  
  // Visual effects
  const [particles, setParticles] = useState([]);
  const [animals, setAnimals] = useState(['🦋', '🐝', '🦜', '🐿️']);
  const [message, setMessage] = useState('🌟 WELCOME TO THE ULTIMATE TREE EXPERIENCE! 🌟');
  const [showAchievement, setShowAchievement] = useState(null);
  const [combo, setCombo] = useState(0);
  const [powerUp, setPowerUp] = useState(null);

  const allAchievements = [
    { id: 'first_love', name: '💖 First Love', desc: 'Show love for the first time', unlocked: false },
    { id: 'well_hydrated', name: '💧 Well Hydrated', desc: 'Keep water above 80% for 1 minute', unlocked: false },
    { id: 'tree_whisperer', name: '🌳 Tree Whisperer', desc: 'Reach 100% health', unlocked: false },
    { id: 'friend_collector', name: '🦊 Friend Collector', desc: 'Make 10 animal friends', unlocked: false },
    { id: 'survivor', name: '⚡ Survivor', desc: 'Survive 50 days', unlocked: false },
    { id: 'forest_master', name: '👑 Forest Master', desc: 'Reach Level 10', unlocked: false },
    { id: 'combo_king', name: '🔥 Combo King', desc: 'Get a 10x combo', unlocked: false },
    { id: 'global_hero', name: '🌍 Global Hero', desc: '1000 global impact points', unlocked: false }
  ];

  const modeConfig = {
    zen: { color: 'from-purple-400 to-pink-400', icon: '🧘', name: 'ZEN MODE' },
    survival: { color: 'from-orange-500 to-red-600', icon: '⚡', name: 'SURVIVAL MODE' },
    party: { color: 'from-yellow-400 to-pink-500', icon: '🎉', name: 'PARTY MODE' }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysSurvived(prev => prev + 1);
      setIsDay(prev => !prev);
      
      // Mode-specific depletion
      const depletionRate = mode === 'survival' ? 8 : mode === 'party' ? 5 : 3;
      setWaterLevel(prev => Math.max(0, prev - depletionRate));
      setLoveLevel(prev => Math.max(0, prev - (depletionRate - 1)));
      setSunshineLevel(prev => Math.max(0, prev - 2));
      
      // Health logic
      if (waterLevel > 50 && loveLevel > 50 && sunshineLevel > 50) {
        setTreeHealth(prev => {
          const newHealth = Math.min(100, prev + 3);
          if (newHealth === 100 && !achievements.find(a => a.id === 'tree_whisperer')?.unlocked) {
            unlockAchievement('tree_whisperer');
          }
          return newHealth;
        });
        setXp(prev => prev + 1);
      } else if (waterLevel < 20 || loveLevel < 20) {
        setTreeHealth(prev => Math.max(0, prev - 4));
      }
      
      // Level up
      if (xp >= level * 100) {
        setLevel(prev => {
          const newLevel = prev + 1;
          if (newLevel >= 10 && !achievements.find(a => a.id === 'forest_master')?.unlocked) {
            unlockAchievement('forest_master');
          }
          return newLevel;
        });
        setXp(0);
        setMessage(`🎉 LEVEL UP! Now Level ${level + 1}!`);
      }
      
      // Survivor achievement
      if (daysSurvived >= 50 && !achievements.find(a => a.id === 'survivor')?.unlocked) {
        unlockAchievement('survivor');
      }
      
      // Global impact achievement
      if (globalImpact >= 1000 && !achievements.find(a => a.id === 'global_hero')?.unlocked) {
        unlockAchievement('global_hero');
      }
    }, mode === 'survival' ? 2000 : mode === 'party' ? 2500 : 3000);
    
    return () => clearInterval(interval);
  }, [waterLevel, loveLevel, sunshineLevel, mode, xp, level, daysSurvived, globalImpact]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (combo >= 10 && !achievements.find(a => a.id === 'combo_king')?.unlocked) {
      unlockAchievement('combo_king');
    }
  }, [combo]);

  const unlockAchievement = (id) => {
    const achievement = allAchievements.find(a => a.id === id);
    if (achievement) {
      setAchievements(prev => [...prev, { ...achievement, unlocked: true }]);
      setShowAchievement(achievement);
      setXp(prev => prev + 50);
      setTimeout(() => setShowAchievement(null), 4000);
    }
  };

  const createParticles = (emoji, count = 10) => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      emoji,
      x: 30 + Math.random() * 40,
      delay: Math.random() * 0.5
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2000);
  };

  const waterTree = () => {
    setWaterLevel(100);
    setCombo(prev => prev + 1);
    setGlobalImpact(prev => prev + 10);
    createParticles('💧', 15);
    setMessage(`💧 SPLASH! Water restored! ${combo + 1}x COMBO!`);
    if (combo > 0) {
      setXp(prev => prev + (5 * combo));
    }
  };

  const showLove = () => {
    setLoveLevel(100);
    setCombo(prev => prev + 1);
    setGlobalImpact(prev => prev + 15);
    createParticles('💚', 20);
    createParticles('🌈', 5);
    setMessage(`💚 LOVE OVERLOAD! ${combo + 1}x COMBO!`);
    
    if (!achievements.find(a => a.id === 'first_love')?.unlocked) {
      unlockAchievement('first_love');
    }
    
    if (combo > 0) {
      setXp(prev => prev + (10 * combo));
    }
  };

  const addSunshine = () => {
    setSunshineLevel(100);
    setCombo(prev => prev + 1);
    setGlobalImpact(prev => prev + 8);
    createParticles('☀️', 12);
    setMessage(`☀️ SUNSHINE BOOST! ${combo + 1}x COMBO!`);
    if (combo > 0) {
      setXp(prev => prev + (5 * combo));
    }
  };

  const plantNewTree = () => {
    setTotalTrees(prev => prev + 1);
    setGlobalImpact(prev => prev + 50);
    setXp(prev => prev + 100);
    createParticles('🌱', 25);
    setMessage(`🌱 NEW TREE PLANTED! Total: ${totalTrees + 1}!`);
  };

  const makeFriend = () => {
    const newFriends = ['🦊', '🦝', '🐿️', '🦔', '🐰', '🦌', '🦉', '🐻', '🦅', '🦎'];
    const randomFriend = newFriends[Math.floor(Math.random() * newFriends.length)];
    if (!animals.includes(randomFriend)) {
      setAnimals(prev => [...prev, randomFriend]);
      setGlobalImpact(prev => prev + 20);
      setXp(prev => prev + 25);
      createParticles(randomFriend, 5);
      setMessage(`${randomFriend} joined your forest!`);
      
      if (animals.length >= 9 && !achievements.find(a => a.id === 'friend_collector')?.unlocked) {
        unlockAchievement('friend_collector');
      }
    }
  };

  const activatePowerUp = (type) => {
    setPowerUp(type);
    switch(type) {
      case 'rainbow':
        setWaterLevel(100);
        setLoveLevel(100);
        setSunshineLevel(100);
        setTreeHealth(100);
        createParticles('🌈', 30);
        setMessage('🌈 RAINBOW POWER! EVERYTHING MAXED!');
        break;
      case 'thunder':
        setXp(prev => prev + 500);
        setGlobalImpact(prev => prev + 200);
        createParticles('⚡', 25);
        setMessage('⚡ THUNDER BOOST! +500 XP!');
        break;
      case 'star':
        setLevel(prev => prev + 1);
        createParticles('⭐', 20);
        setMessage('⭐ INSTANT LEVEL UP!');
        break;
    }
    setTimeout(() => setPowerUp(null), 1000);
  };

  const getTreeDisplay = () => {
    if (treeHealth > 95) return '🌳✨🌟';
    if (treeHealth > 80) return '🌳🌸🌈';
    if (treeHealth > 60) return '🌳🌸';
    if (treeHealth > 40) return '🌳';
    if (treeHealth > 20) return '🌿';
    return '🍂';
  };

  const currentMode = modeConfig[mode];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${
      mode === 'zen' ? 'from-purple-100 via-pink-100 to-blue-100' :
      mode === 'survival' ? 'from-orange-900 via-red-900 to-gray-900' :
      'from-yellow-200 via-pink-200 to-purple-200'
    } p-4 md:p-8 relative overflow-hidden transition-all duration-1000`}>
      
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute text-6xl"
            style={{
              left: `${p.x}%`,
              top: '50%',
              animation: `floatUp 2s ease-out forwards`,
              animationDelay: `${p.delay}s`
            }}
          >
            {p.emoji}
          </div>
        ))}
        
        {/* Floating animals */}
        {animals.map((animal, i) => (
          <div
            key={i}
            className="absolute text-5xl opacity-60"
            style={{
              left: `${5 + i * 10}%`,
              top: `${10 + (i % 4) * 20}%`,
              animation: `bounce 3s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          >
            {animal}
          </div>
        ))}
        
        {/* Day/Night */}
        <div className={`absolute top-10 right-10 text-9xl transition-all duration-1000`}>
          {isDay ? '☀️' : '🌙'}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Epic Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-4 mb-2">
            <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
            <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              THE ULTIMATE TREE
            </h1>
            <Crown className="w-16 h-16 text-yellow-500 animate-bounce" />
          </div>
          <p className="text-3xl font-bold text-purple-700 mb-2">
            🌟 Level {level} Tree Master 🌟
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <span className={`px-6 py-3 bg-gradient-to-r ${currentMode.color} text-white rounded-full font-bold text-lg animate-pulse`}>
              {currentMode.icon} {currentMode.name}
            </span>
            <span className="px-6 py-3 bg-green-600 text-white rounded-full font-bold text-lg">
              🌳 {totalTrees} Trees Planted
            </span>
            <span className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-lg">
              🏆 {achievements.length}/{allAchievements.length} Achievements
            </span>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-8 py-4 rounded-full text-center mb-4 font-bold text-2xl shadow-2xl animate-bounce">
            {message}
          </div>
        )}

        {/* Achievement Popup */}
        {showAchievement && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-8 rounded-3xl shadow-2xl z-50 animate-bounce border-4 border-yellow-300">
            <div className="text-center">
              <Trophy className="w-20 h-20 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">ACHIEVEMENT UNLOCKED!</div>
              <div className="text-3xl mb-2">{showAchievement.name}</div>
              <div className="text-xl">{showAchievement.desc}</div>
              <div className="text-2xl mt-4">+50 XP!</div>
            </div>
          </div>
        )}

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-4 text-center text-white shadow-xl">
            <div className="text-5xl mb-1">{getTreeDisplay()}</div>
            <div className="text-3xl font-bold">{treeHealth}%</div>
            <div className="text-xs font-bold">HEALTH</div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
              <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${treeHealth}%` }} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl p-4 text-center text-white shadow-xl">
            <div className="text-5xl mb-1">💧</div>
            <div className="text-3xl font-bold">{waterLevel}%</div>
            <div className="text-xs font-bold">WATER</div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
              <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${waterLevel}%` }} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl p-4 text-center text-white shadow-xl">
            <div className="text-5xl mb-1">💖</div>
            <div className="text-3xl font-bold">{loveLevel}%</div>
            <div className="text-xs font-bold">LOVE</div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
              <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${loveLevel}%` }} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 text-center text-white shadow-xl">
            <div className="text-5xl mb-1">☀️</div>
            <div className="text-3xl font-bold">{sunshineLevel}%</div>
            <div className="text-xs font-bold">SUN</div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
              <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${sunshineLevel}%` }} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl p-4 text-center text-white shadow-xl">
            <div className="text-5xl mb-1">⚡</div>
            <div className="text-3xl font-bold">{xp}/{level * 100}</div>
            <div className="text-xs font-bold">XP</div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
              <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${(xp / (level * 100)) * 100}%` }} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl p-4 text-center text-white shadow-xl">
            <div className="text-5xl mb-1">🔥</div>
            <div className="text-3xl font-bold">{combo}x</div>
            <div className="text-xs font-bold">COMBO</div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => setMode('zen')}
            className={`p-4 rounded-2xl font-bold text-xl transition-all ${
              mode === 'zen' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105 shadow-2xl' 
                : 'bg-white bg-opacity-50 text-gray-700 hover:scale-105'
            }`}
          >
            🧘 ZEN MODE
          </button>
          <button
            onClick={() => setMode('survival')}
            className={`p-4 rounded-2xl font-bold text-xl transition-all ${
              mode === 'survival' 
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white scale-105 shadow-2xl' 
                : 'bg-white bg-opacity-50 text-gray-700 hover:scale-105'
            }`}
          >
            ⚡ SURVIVAL
          </button>
          <button
            onClick={() => setMode('party')}
            className={`p-4 rounded-2xl font-bold text-xl transition-all ${
              mode === 'party' 
                ? 'bg-gradient-to-r from-yellow-400 to-pink-500 text-white scale-105 shadow-2xl' 
                : 'bg-white bg-opacity-50 text-gray-700 hover:scale-105'
            }`}
          >
            🎉 PARTY MODE
          </button>
        </div>

        {/* Tree Display */}
        <div className="bg-white bg-opacity-40 backdrop-blur-xl rounded-3xl p-8 mb-6 shadow-2xl border-4 border-white">
          <div className="relative h-96 flex items-end justify-center">
            <div className={`text-9xl transition-all duration-1000 ${
              treeHealth > 90 ? 'scale-150 animate-bounce' : 
              treeHealth > 70 ? 'scale-125' : 
              'scale-100'
            }`}>
              {getTreeDisplay()}
            </div>
            
            {combo > 5 && (
              <div className="absolute top-0 text-6xl font-bold text-yellow-500 animate-pulse">
                🔥 {combo}x COMBO! 🔥
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <button
            onClick={waterTree}
            className="bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 border-white"
          >
            <Droplets className="w-16 h-16 mx-auto mb-2" />
            <div className="text-2xl font-bold">WATER</div>
            <div className="text-sm">+10 Impact</div>
          </button>

          <button
            onClick={showLove}
            className="bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 border-white"
          >
            <Heart className="w-16 h-16 mx-auto mb-2 fill-current" />
            <div className="text-2xl font-bold">LOVE</div>
            <div className="text-sm">+15 Impact</div>
          </button>

          <button
            onClick={addSunshine}
            className="bg-gradient-to-br from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 border-white"
          >
            <Sun className="w-16 h-16 mx-auto mb-2" />
            <div className="text-2xl font-bold">SUN</div>
            <div className="text-sm">+8 Impact</div>
          </button>

          <button
            onClick={plantNewTree}
            className="bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 border-white"
          >
            <TreePine className="w-16 h-16 mx-auto mb-2" />
            <div className="text-2xl font-bold">PLANT</div>
            <div className="text-sm">+50 Impact</div>
          </button>

          <button
            onClick={makeFriend}
            className="bg-gradient-to-br from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white p-6 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 border-white"
          >
            <Users className="w-16 h-16 mx-auto mb-2" />
            <div className="text-2xl font-bold">FRIEND</div>
            <div className="text-sm">+20 Impact</div>
          </button>
        </div>

        {/* Power-Ups */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => activatePowerUp('rainbow')}
            className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white p-6 rounded-2xl font-bold text-xl transform hover:scale-110 transition-all shadow-2xl"
          >
            🌈 RAINBOW POWER
            <div className="text-sm">MAX EVERYTHING</div>
          </button>
          <button
            onClick={() => activatePowerUp('thunder')}
            className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white p-6 rounded-2xl font-bold text-xl transform hover:scale-110 transition-all shadow-2xl"
          >
            ⚡ THUNDER BOOST
            <div className="text-sm">+500 XP</div>
          </button>
          <button
            onClick={() => activatePowerUp('star')}
            className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl font-bold text-xl transform hover:scale-110 transition-all shadow-2xl"
          >
            ⭐ LEVEL UP
            <div className="text-sm">INSTANT!</div>
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl">
            <Globe className="w-12 h-12 mx-auto mb-2 text-green-600" />
            <div className="text-4xl font-bold text-green-700">{globalImpact}</div>
            <div className="text-sm text-gray-600">GLOBAL IMPACT</div>
          </div>
          <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl">
            <Target className="w-12 h-12 mx-auto mb-2 text-purple-600" />
            <div className="text-4xl font-bold text-purple-700">{daysSurvived}</div>
            <div className="text-sm text-gray-600">DAYS SURVIVED</div>
          </div>
          <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl">
            <Award className="w-12 h-12 mx-auto mb-2 text-yellow-600" />
            <div className="text-4xl font-bold text-yellow-700">{animals.length}</div>
            <div className="text-sm text-gray-600">FOREST FRIENDS</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
          <h3 className="text-3xl font-bold text-center mb-4 text-purple-700">
            🏆 ACHIEVEMENTS 🏆
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allAchievements.map(ach => {
              const unlocked = achievements.find(a => a.id === ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl text-center transition-all ${
                    unlocked 
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg scale-105' 
                      : 'bg-gray-300 opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-2">{unlocked ? ach.name.split(' ')[0] : '🔒'}</div>
                  <div className="text-sm font-bold">{ach.name.split(' ').slice(1).join(' ')}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-400px) scale(1.5) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}