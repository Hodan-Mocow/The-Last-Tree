import { useState, useEffect } from 'react';
import { TreePine, Droplets, Wind, Sun, Moon, Heart, AlertTriangle, Sprout, Users, Globe } from 'lucide-react';

export default function TheLastTree() {
  const [treeHealth, setTreeHealth] = useState(100);
  const [waterLevel, setWaterLevel] = useState(50);
  const [loveLevel, setLoveLevel] = useState(50);
  const [dayCount, setDayCount] = useState(0);
  const [isDay, setIsDay] = useState(true);
  const [treesPlanted, setTreesPlanted] = useState(0);
  const [co2Absorbed, setCo2Absorbed] = useState(0);
  const [supporters, setSupporters] = useState(1247);
  const [activeTab, setActiveTab] = useState('care');
  const [message, setMessage] = useState('');
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDayCount(prev => prev + 1);
      setIsDay(prev => !prev);
      
      // Tree health based on water AND love
      if (waterLevel < 20 || loveLevel < 20) {
        setTreeHealth(prev => Math.max(0, prev - 5));
      } else if (waterLevel > 50 && loveLevel > 50) {
        setTreeHealth(prev => Math.min(100, prev + 5));
      } else if (waterLevel > 30 && loveLevel > 30) {
        setTreeHealth(prev => Math.min(100, prev + 2));
      }
      
      // Water and love naturally deplete
      setWaterLevel(prev => Math.max(0, prev - 5));
      setLoveLevel(prev => Math.max(0, prev - 3));
      
      // CO2 absorption based on tree health
      if (treeHealth > 50) {
        setCo2Absorbed(prev => prev + Math.floor(treeHealth / 10));
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [waterLevel, loveLevel, treeHealth]);

  const waterTree = () => {
    setWaterLevel(prev => Math.min(100, prev + 30));
    setMessage('💧 Tree watered! Health improving...');
    setTimeout(() => setMessage(''), 2000);
  };

  const showLove = () => {
    setLoveLevel(prev => Math.min(100, prev + 25));
    setMessage('💚 Love given! The tree feels cherished!');
    
    // Create floating hearts animation
    const newHearts = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5
    }));
    setHearts(prev => [...prev, ...newHearts]);
    
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
      setMessage('');
    }, 2000);
  };

  const plantTree = () => {
    setTreesPlanted(prev => prev + 1);
    setSupporters(prev => prev + 1);
    setMessage('🌱 New tree planted! You\'re making a difference!');
    setTimeout(() => setMessage(''), 2000);
  };

  const shareMessage = () => {
    setMessage('🌍 Message shared! Spreading awareness...');
    setSupporters(prev => prev + Math.floor(Math.random() * 10) + 1);
    setTimeout(() => setMessage(''), 2000);
  };

  const getTreeStatus = () => {
    if (treeHealth > 80) return { text: 'Thriving', color: 'text-green-400', emoji: '🌳' };
    if (treeHealth > 60) return { text: 'Healthy', color: 'text-lime-400', emoji: '🌲' };
    if (treeHealth > 40) return { text: 'Struggling', color: 'text-yellow-400', emoji: '🍂' };
    if (treeHealth > 20) return { text: 'Dying', color: 'text-orange-400', emoji: '🥀' };
    return { text: 'Critical', color: 'text-red-400', emoji: '💀' };
  };

  const status = getTreeStatus();

  const tabs = [
    { id: 'care', name: 'Care', icon: Heart },
    { id: 'impact', name: 'Impact', icon: Globe },
    { id: 'community', name: 'Community', icon: Users },
    { id: 'story', name: 'Story', icon: TreePine }
  ];

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      isDay 
        ? 'bg-gradient-to-br from-sky-400 via-blue-300 to-green-200' 
        : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900'
    } p-4 md:p-8 relative overflow-hidden`}>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating leaves */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            🍃
          </div>
        ))}
        
        {/* Floating hearts when love is shown */}
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="absolute text-6xl animate-pulse"
            style={{
              left: `${heart.left}%`,
              bottom: '10%',
              animation: `floatUp 2s ease-out forwards`,
              animationDelay: `${heart.delay}s`,
              pointerEvents: 'none'
            }}
          >
            💚
          </div>
        ))}
        
        {/* Day/Night indicator */}
        <div className={`absolute top-10 right-10 text-8xl transition-all duration-1000 ${
          isDay ? 'opacity-100' : 'opacity-30'
        }`}>
          {isDay ? '☀️' : '🌙'}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-6xl md:text-8xl font-bold mb-4 transition-colors duration-1000 ${
            isDay ? 'text-green-800' : 'text-green-300'
          }`}>
            🌳 THE LAST TREE
          </h1>
          <p className={`text-xl md:text-3xl mb-4 transition-colors duration-1000 ${
            isDay ? 'text-green-700' : 'text-green-200'
          }`}>
            In a world where nature fades, one tree remains...
          </p>
          <p className={`text-lg ${isDay ? 'text-gray-700' : 'text-gray-300'}`}>
            Can you keep it alive?
          </p>
        </div>

        {/* Message Banner */}
        {message && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-8 py-4 rounded-full shadow-2xl font-bold text-xl z-50 animate-bounce">
            {message}
          </div>
        )}

        {/* Main Stats Bar */}
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 ${
          isDay ? 'text-gray-800' : 'text-white'
        }`}>
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-4 text-center border-2 border-white border-opacity-30">
            <div className={`text-4xl font-bold ${status.color}`}>{status.emoji}</div>
            <div className="text-sm opacity-80">Tree Status</div>
            <div className={`text-2xl font-bold ${status.color}`}>{status.text}</div>
          </div>
          
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-4 text-center border-2 border-white border-opacity-30">
            <div className="text-4xl font-bold text-green-400">{treeHealth}%</div>
            <div className="text-sm opacity-80">Health</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  treeHealth > 60 ? 'bg-green-400' : treeHealth > 30 ? 'bg-yellow-400' : 'bg-red-400'
                }`}
                style={{ width: `${treeHealth}%` }}
              />
            </div>
          </div>
          
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-4 text-center border-2 border-white border-opacity-30">
            <div className="text-4xl font-bold text-blue-400">{waterLevel}%</div>
            <div className="text-sm opacity-80">Water</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-400 h-2 rounded-full transition-all"
                style={{ width: `${waterLevel}%` }}
              />
            </div>
          </div>
          
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-4 text-center border-2 border-white border-opacity-30">
            <div className="text-4xl font-bold text-pink-400">{loveLevel}%</div>
            <div className="text-sm opacity-80">Love</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-pink-400 h-2 rounded-full transition-all"
                style={{ width: `${loveLevel}%` }}
              />
            </div>
          </div>
          
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-4 text-center border-2 border-white border-opacity-30">
            <div className="text-4xl font-bold text-purple-400">{dayCount}</div>
            <div className="text-sm opacity-80">Days Survived</div>
            <div className="text-lg font-bold">{isDay ? '☀️ Day' : '🌙 Night'}</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-2xl scale-105'
                    : `${isDay ? 'bg-white bg-opacity-30' : 'bg-white bg-opacity-10'} backdrop-blur-lg hover:bg-opacity-40`
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-2" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className={`${isDay ? 'bg-white bg-opacity-30' : 'bg-white bg-opacity-10'} backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-white border-opacity-30`}>
          
          {/* Care Tab */}
          {activeTab === 'care' && (
            <div className="space-y-6">
              <h2 className={`text-4xl font-bold text-center mb-6 ${isDay ? 'text-green-800' : 'text-green-300'}`}>
                🌿 Care For The Last Tree
              </h2>

              {/* The Tree Visualization */}
              <div className="relative h-96 flex items-end justify-center mb-8">
                <div className={`text-9xl transition-all duration-1000 ${
                  treeHealth > 80 ? 'scale-110' : treeHealth > 40 ? 'scale-100' : 'scale-90 opacity-70'
                }`}>
                  {status.emoji}
                </div>
                
                {/* Roots */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32 opacity-30">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M50,0 Q30,50 10,100" stroke="brown" strokeWidth="2" fill="none" />
                    <path d="M50,0 Q50,50 50,100" stroke="brown" strokeWidth="3" fill="none" />
                    <path d="M50,0 Q70,50 90,100" stroke="brown" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={waterTree}
                  disabled={waterLevel >= 100}
                  className="bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-8 rounded-2xl font-bold text-2xl transform hover:scale-105 transition-all shadow-lg flex flex-col items-center gap-3"
                >
                  <Droplets className="w-16 h-16" />
                  Water Tree
                  <span className="text-sm">+30% Water</span>
                </button>

                <button
                  onClick={showLove}
                  disabled={loveLevel >= 100}
                  className="bg-gradient-to-br from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-8 rounded-2xl font-bold text-2xl transform hover:scale-105 transition-all shadow-lg flex flex-col items-center gap-3 relative overflow-hidden"
                >
                  <Heart className="w-16 h-16 fill-current animate-pulse" />
                  Show LOVE
                  <span className="text-sm">+25% Love</span>
                </button>

                <button
                  onClick={plantTree}
                  className="bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-8 rounded-2xl font-bold text-2xl transform hover:scale-105 transition-all shadow-lg flex flex-col items-center gap-3"
                >
                  <Sprout className="w-16 h-16" />
                  Plant New Tree
                  <span className="text-sm">Help Reforest</span>
                </button>
              </div>

              {/* Share button - separate row */}
              <button
                onClick={shareMessage}
                className="w-full bg-gradient-to-br from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white p-8 rounded-2xl font-bold text-2xl transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <Globe className="w-12 h-12" />
                Share The Message - Spread Environmental Awareness
              </button>

              {/* Warning if critical */}
              {treeHealth < 30 && (
                <div className="bg-red-600 text-white p-6 rounded-2xl flex items-center gap-4 animate-pulse">
                  <AlertTriangle className="w-12 h-12" />
                  <div>
                    <div className="text-2xl font-bold">CRITICAL CONDITION!</div>
                    <div className="text-lg">The tree needs immediate care! Give it water and love!</div>
                  </div>
                </div>
              )}

              {/* Love tip */}
              {loveLevel < 30 && treeHealth < 60 && (
                <div className="bg-pink-600 text-white p-6 rounded-2xl flex items-center gap-4">
                  <Heart className="w-12 h-12 fill-current" />
                  <div>
                    <div className="text-2xl font-bold">Trees Need Love Too! 💚</div>
                    <div className="text-lg">Show the tree some love - it thrives on positive energy and care!</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Impact Tab */}
          {activeTab === 'impact' && (
            <div className="space-y-6">
              <h2 className={`text-4xl font-bold text-center mb-6 ${isDay ? 'text-green-800' : 'text-green-300'}`}>
                🌍 Your Environmental Impact
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className={`${isDay ? 'bg-green-600' : 'bg-green-700'} text-white rounded-2xl p-8 text-center`}>
                  <div className="text-6xl font-bold mb-2">{treesPlanted}</div>
                  <div className="text-xl">Trees Planted</div>
                  <div className="text-sm opacity-80 mt-2">Each tree = 1 ton CO₂/year</div>
                </div>

                <div className={`${isDay ? 'bg-blue-600' : 'bg-blue-700'} text-white rounded-2xl p-8 text-center`}>
                  <div className="text-6xl font-bold mb-2">{co2Absorbed}</div>
                  <div className="text-xl">kg CO₂ Absorbed</div>
                  <div className="text-sm opacity-80 mt-2">Fighting climate change</div>
                </div>

                <div className={`${isDay ? 'bg-purple-600' : 'bg-purple-700'} text-white rounded-2xl p-8 text-center`}>
                  <div className="text-6xl font-bold mb-2">{supporters.toLocaleString()}</div>
                  <div className="text-xl">Global Supporters</div>
                  <div className="text-sm opacity-80 mt-2">Growing community</div>
                </div>
              </div>

              <div className={`${isDay ? 'bg-yellow-100 text-yellow-900' : 'bg-yellow-900 text-yellow-100'} p-8 rounded-2xl`}>
                <h3 className="text-3xl font-bold mb-4">🌟 Real-World Facts</h3>
                <ul className="space-y-3 text-lg">
                  <li>• A single mature tree absorbs 48 lbs of CO₂ per year</li>
                  <li>• Trees provide oxygen for 2 people annually</li>
                  <li>• We've lost 46% of Earth's trees since civilization began</li>
                  <li>• Planting 1 billion trees could remove 25% of atmospheric CO₂</li>
                  <li>• Every minute, we lose forest area the size of 40 football fields</li>
                </ul>
              </div>
            </div>
          )}

          {/* Community Tab */}
          {activeTab === 'community' && (
            <div className="space-y-6">
              <h2 className={`text-4xl font-bold text-center mb-6 ${isDay ? 'text-green-800' : 'text-green-300'}`}>
                👥 Join The Movement
              </h2>

              <div className={`${isDay ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-green-700 to-emerald-700'} text-white rounded-2xl p-8 text-center`}>
                <h3 className="text-5xl font-bold mb-4">{supporters.toLocaleString()}</h3>
                <p className="text-2xl mb-4">People Fighting For Nature</p>
                <p className="text-lg opacity-90">Together we can reforest the planet 🌍</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className={`${isDay ? 'bg-white bg-opacity-50' : 'bg-white bg-opacity-10'} p-6 rounded-2xl`}>
                  <h4 className={`text-2xl font-bold mb-3 ${isDay ? 'text-green-800' : 'text-green-300'}`}>
                    💚 Take Action
                  </h4>
                  <ul className={`space-y-2 ${isDay ? 'text-gray-800' : 'text-gray-200'}`}>
                    <li>✓ Show love and care to nature daily</li>
                    <li>✓ Plant trees in your community</li>
                    <li>✓ Reduce paper consumption</li>
                    <li>✓ Support reforestation projects</li>
                    <li>✓ Educate others about conservation</li>
                    <li>✓ Choose sustainable products</li>
                  </ul>
                </div>

                <div className={`${isDay ? 'bg-white bg-opacity-50' : 'bg-white bg-opacity-10'} p-6 rounded-2xl`}>
                  <h4 className={`text-2xl font-bold mb-3 ${isDay ? 'text-green-800' : 'text-green-300'}`}>
                    🌱 Organizations
                  </h4>
                  <ul className={`space-y-2 ${isDay ? 'text-gray-800' : 'text-gray-200'}`}>
                    <li>→ One Tree Planted</li>
                    <li>→ The Nature Conservancy</li>
                    <li>→ Rainforest Alliance</li>
                    <li>→ World Wildlife Fund</li>
                    <li>→ Trees for the Future</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Story Tab */}
          {activeTab === 'story' && (
            <div className="space-y-6">
              <h2 className={`text-4xl font-bold text-center mb-6 ${isDay ? 'text-green-800' : 'text-green-300'}`}>
                📖 The Story of The Last Tree
              </h2>

              <div className={`${isDay ? 'text-gray-800' : 'text-gray-200'} space-y-6 text-lg leading-relaxed`}>
                <p>
                  In a future not far from now, humanity's endless consumption finally caught up with us. 
                  The forests that once covered a third of Earth's land are now memories in old photographs.
                </p>

                <div className={`${isDay ? 'bg-green-100' : 'bg-green-900'} p-6 rounded-2xl italic`}>
                  <p className={isDay ? 'text-green-900' : 'text-green-100'}>
                    "We never thought it would happen. We saw the warnings, the rising temperatures, 
                    the disappearing species. But we kept thinking: tomorrow. We'll fix it tomorrow."
                  </p>
                  <p className={`${isDay ? 'text-green-700' : 'text-green-300'} text-right mt-2`}>
                    — A survivor's journal, 2047
                  </p>
                </div>

                <p>
                  But this tree—this magnificent, resilient survivor—stands as a symbol of hope. 
                  It's a reminder that it's not too late. Not yet. And most importantly, it teaches us 
                  that nature doesn't just need resources—it needs LOVE.
                </p>

                <p>
                  Every day you keep this tree alive with water AND love is a promise. A promise that we can change. 
                  That we can rebuild. That the forests can return. Trees are living beings that respond to care, 
                  attention, and positive energy. When we love nature, nature loves us back.
                </p>

                <div className={`${isDay ? 'bg-yellow-100' : 'bg-yellow-900'} p-6 rounded-2xl border-l-4 ${isDay ? 'border-yellow-600' : 'border-yellow-400'}`}>
                  <p className="font-bold text-xl mb-2">The Choice Is Ours</p>
                  <p>
                    This is not just a game. This is our reality—or it will be, if we don't act now. 
                    Every tree we plant, every action we take, every person we inspire creates ripples 
                    of change that can transform our world.
                  </p>
                </div>

                <p className="text-2xl font-bold text-center">
                  {treeHealth > 70 
                    ? "Your love is making it thrive! Keep going! 💚🌱" 
                    : treeHealth > 50
                    ? "You're giving it hope with your care. Keep going! 🌱"
                    : "The tree needs your love and water. Don't give up! 💚"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-lg ${isDay ? 'text-gray-800' : 'text-gray-300'} mb-4`}>
            "The best time to plant a tree was 20 years ago. The second best time is now."
          </p>
          <p className={`text-sm ${isDay ? 'text-gray-600' : 'text-gray-400'}`}>
            🌍 Every action counts. Start today.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes floatUp {
          0% { 
            transform: translateY(0) scale(0.5);
            opacity: 1;
          }
          100% { 
            transform: translateY(-500px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}