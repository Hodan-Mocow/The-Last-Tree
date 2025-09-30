import { useState, useEffect } from 'react';
import { Skull, Zap, AlertTriangle, Flame, CloudRain, Wind } from 'lucide-react';

export default function ApocalypseSurvivor() {
  const [treeHealth, setTreeHealth] = useState(50);
  const [waterLevel, setWaterLevel] = useState(30);
  const [hopeLevel, setHopeLevel] = useState(40);
  const [threat, setThreat] = useState('drought');
  const [daysSurvived, setDaysSurvived] = useState(0);
  const [extinctionClock, setExtinctionClock] = useState(100);
  const [message, setMessage] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  const threats = ['drought', 'pollution', 'fire', 'storm'];

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setDaysSurvived(prev => prev + 1);
      setExtinctionClock(prev => Math.max(0, prev - 1));
      
      // Random threat
      if (Math.random() > 0.7) {
        setThreat(threats[Math.floor(Math.random() * threats.length)]);
      }

      // Harsh depletion
      setWaterLevel(prev => Math.max(0, prev - 8));
      setHopeLevel(prev => Math.max(0, prev - 5));
      
      // Health calculation
      if (waterLevel < 15 || hopeLevel < 15) {
        setTreeHealth(prev => {
          const newHealth = Math.max(0, prev - 10);
          if (newHealth === 0) {
            setIsGameOver(true);
            setMessage('💀 THE LAST TREE HAS DIED... GAME OVER');
          }
          return newHealth;
        });
      } else if (waterLevel > 50 && hopeLevel > 50) {
        setTreeHealth(prev => Math.min(100, prev + 5));
        setExtinctionClock(prev => Math.min(100, prev + 2));
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [waterLevel, hopeLevel, isGameOver]);

  const findWater = () => {
    if (isGameOver) return;
    const found = Math.floor(Math.random() * 40) + 30;
    setWaterLevel(prev => Math.min(100, prev + found));
    setMessage(`💧 Found ${found}% water in the wasteland!`);
    setTimeout(() => setMessage(''), 2000);
  };

  const giveHope = () => {
    if (isGameOver) return;
    setHopeLevel(prev => Math.min(100, prev + 35));
    setMessage('🔥 Your determination fuels hope!');
    setTimeout(() => setMessage(''), 2000);
  };

  const fightThreat = () => {
    if (isGameOver) return;
    const success = Math.random() > 0.3;
    if (success) {
      setTreeHealth(prev => Math.min(100, prev + 15));
      setMessage(`✊ Successfully fought off ${threat}!`);
      setThreat('none');
    } else {
      setTreeHealth(prev => Math.max(0, prev - 10));
      setMessage(`⚠️ Failed to stop ${threat}! Tree damaged!`);
    }
    setTimeout(() => setMessage(''), 2000);
  };

  const restart = () => {
    setTreeHealth(50);
    setWaterLevel(30);
    setHopeLevel(40);
    setDaysSurvived(0);
    setExtinctionClock(100);
    setIsGameOver(false);
    setMessage('');
  };

  const getThreatIcon = () => {
    switch(threat) {
      case 'drought': return '🔥';
      case 'pollution': return '☠️';
      case 'fire': return '🔥';
      case 'storm': return '⛈️';
      default: return '☮️';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white p-8 relative overflow-hidden">
      {/* Smoke/particles effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `flicker ${1 + Math.random() * 2}s infinite`
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-7xl font-bold text-red-500 mb-2 animate-pulse">
            ☠️ APOCALYPSE SURVIVOR ☠️
          </h1>
          <p className="text-2xl text-gray-300">
            THE LAST TREE. THE LAST HOPE. DO NOT LET IT DIE.
          </p>
        </div>

        {message && (
          <div className="bg-red-600 text-white px-8 py-4 rounded-lg text-center mb-6 font-bold text-xl border-2 border-red-400 animate-pulse">
            {message}
          </div>
        )}

        {/* Critical Stats */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          <div className={`rounded-2xl p-4 text-center border-2 ${
            treeHealth > 60 ? 'bg-green-900 border-green-500' : 
            treeHealth > 30 ? 'bg-yellow-900 border-yellow-500' : 
            'bg-red-900 border-red-500 animate-pulse'
          }`}>
            <div className="text-4xl mb-1">
              {treeHealth > 60 ? '🌳' : treeHealth > 30 ? '🍂' : '💀'}
            </div>
            <div className="text-3xl font-bold">{treeHealth}%</div>
            <div className="text-xs">HEALTH</div>
          </div>

          <div className="bg-blue-900 border-2 border-blue-500 rounded-2xl p-4 text-center">
            <div className="text-4xl mb-1">💧</div>
            <div className="text-3xl font-bold">{waterLevel}%</div>
            <div className="text-xs">WATER</div>
          </div>

          <div className="bg-orange-900 border-2 border-orange-500 rounded-2xl p-4 text-center">
            <div className="text-4xl mb-1">🔥</div>
            <div className="text-3xl font-bold">{hopeLevel}%</div>
            <div className="text-xs">HOPE</div>
          </div>

          <div className="bg-purple-900 border-2 border-purple-500 rounded-2xl p-4 text-center">
            <div className="text-4xl mb-1">⏳</div>
            <div className="text-3xl font-bold">{daysSurvived}</div>
            <div className="text-xs">DAYS</div>
          </div>

          <div className={`rounded-2xl p-4 text-center border-2 ${
            extinctionClock < 20 ? 'bg-red-900 border-red-500 animate-pulse' : 'bg-gray-900 border-gray-500'
          }`}>
            <div className="text-4xl mb-1">☠️</div>
            <div className="text-3xl font-bold">{extinctionClock}</div>
            <div className="text-xs">COUNTDOWN</div>
          </div>
        </div>

        {/* Active Threat */}
        {threat !== 'none' && !isGameOver && (
          <div className="bg-red-900 border-4 border-red-500 rounded-2xl p-6 mb-6 animate-pulse">
            <div className="flex items-center justify-center gap-4">
              <AlertTriangle className="w-12 h-12" />
              <div>
                <div className="text-3xl font-bold">ACTIVE THREAT: {getThreatIcon()} {threat.toUpperCase()}</div>
                <div className="text-lg">The tree is under attack! Fight back now!</div>
              </div>
            </div>
          </div>
        )}

        {/* Tree Display */}
        <div className="bg-black bg-opacity-50 border-4 border-red-900 rounded-3xl p-8 mb-6">
          <div className="relative h-72 flex items-end justify-center">
            {isGameOver ? (
              <div className="text-center">
                <div className="text-9xl mb-4">💀</div>
                <div className="text-4xl font-bold text-red-500">EXTINCTION</div>
              </div>
            ) : (
              <>
                <div className={`text-9xl transition-all duration-1000 ${
                  treeHealth > 60 ? 'scale-110' : 
                  treeHealth > 30 ? 'scale-100 opacity-80' : 
                  'scale-90 opacity-50 grayscale'
                }`}>
                  {treeHealth > 60 ? '🌳' : treeHealth > 30 ? '🍂' : '🥀'}
                </div>
                {threat !== 'none' && (
                  <div className="absolute top-0 text-6xl animate-bounce">
                    {getThreatIcon()}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        {isGameOver ? (
          <button
            onClick={restart}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white p-8 rounded-2xl font-bold text-3xl transform hover:scale-105 transition-all shadow-2xl"
          >
            🔄 TRY AGAIN - SAVE THE NEXT TREE
          </button>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={findWater}
              disabled={waterLevel >= 90}
              className="bg-gradient-to-br from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800 disabled:opacity-30 text-white p-6 rounded-2xl font-bold text-xl transform hover:scale-105 transition-all shadow-xl border-2 border-blue-400"
            >
              <CloudRain className="w-12 h-12 mx-auto mb-2" />
              FIND WATER
              <div className="text-sm">Scavenge wasteland</div>
            </button>

            <button
              onClick={giveHope}
              disabled={hopeLevel >= 90}
              className="bg-gradient-to-br from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 disabled:opacity-30 text-white p-6 rounded-2xl font-bold text-xl transform hover:scale-105 transition-all shadow-xl border-2 border-orange-400"
            >
              <Flame className="w-12 h-12 mx-auto mb-2" />
              GIVE HOPE
              <div className="text-sm">Restore will to live</div>
            </button>

            <button
              onClick={fightThreat}
              disabled={threat === 'none'}
              className="bg-gradient-to-br from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 disabled:opacity-30 text-white p-6 rounded-2xl font-bold text-xl transform hover:scale-105 transition-all shadow-xl border-2 border-red-400"
            >
              <Zap className="w-12 h-12 mx-auto mb-2" />
              FIGHT THREAT
              <div className="text-sm">70% success rate</div>
            </button>
          </div>
        )}

        {/* Warning Messages */}
        {waterLevel < 20 && !isGameOver && (
          <div className="mt-6 bg-blue-900 border-2 border-blue-500 rounded-xl p-4 text-center animate-pulse">
            ⚠️ CRITICAL: Water levels dangerously low!
          </div>
        )}
        {hopeLevel < 20 && !isGameOver && (
          <div className="mt-6 bg-orange-900 border-2 border-orange-500 rounded-xl p-4 text-center animate-pulse">
            ⚠️ CRITICAL: Hope is fading fast!
          </div>
        )}
        {extinctionClock < 20 && !isGameOver && (
          <div className="mt-6 bg-red-900 border-2 border-red-500 rounded-xl p-4 text-center animate-pulse">
            ☠️ EXTINCTION IMMINENT: {extinctionClock} seconds remaining!
          </div>
        )}

        <div className="mt-6 bg-gray-900 bg-opacity-50 border border-gray-700 rounded-2xl p-6 text-center">
          <p className="text-xl text-gray-300 italic">
            "In the ashes of civilization, one tree stands. One chance remains. Don't waste it."
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes flicker {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}