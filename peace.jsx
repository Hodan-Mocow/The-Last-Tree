import { useState, useEffect } from 'react';
import { Heart, Cloud, Flower2, Moon, Sun, Wind, Droplets, Sparkles } from 'lucide-react';

export default function Peace() {
  const [tranquility, setTranquility] = useState(100);
  const [harmony, setHarmony] = useState(100);
  const [serenity, setSerenity] = useState(100);
  const [innerPeace, setInnerPeace] = useState(100);
  const [breathCount, setBreathCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('hold'); // inhale, hold, exhale
  const [timeInPeace, setTimeInPeace] = useState(0);
  const [peacefulMoments, setPeacefulMoments] = useState(0);
  const [clouds, setClouds] = useState([]);
  const [petals, setPetals] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [message, setMessage] = useState('Welcome to your peaceful sanctuary 🕊️');
  const [affirmation, setAffirmation] = useState('');
  const [soundscape, setSoundscape] = useState('nature');

  const affirmations = [
    "I am at peace with myself and the world",
    "I breathe in calmness, I breathe out stress",
    "Inner peace is my natural state",
    "I am centered, balanced, and serene",
    "Peace flows through me like a gentle river",
    "I release all tension and embrace tranquility",
    "My mind is clear, my heart is light",
    "I am grateful for this moment of peace",
    "Harmony surrounds me and fills me",
    "I am safe, I am loved, I am at peace"
  ];

  const soundscapes = [
    { id: 'nature', name: '🌲 Forest', icon: '🌲', color: 'from-green-300 to-emerald-400' },
    { id: 'ocean', name: '🌊 Ocean', icon: '🌊', color: 'from-blue-300 to-cyan-400' },
    { id: 'rain', name: '🌧️ Rain', icon: '☔', color: 'from-gray-300 to-blue-400' },
    { id: 'garden', name: '🌸 Garden', icon: '🌸', color: 'from-pink-300 to-rose-400' },
    { id: 'mountain', name: '⛰️ Mountain', icon: '⛰️', color: 'from-purple-300 to-indigo-400' },
    { id: 'stars', name: '✨ Starlight', icon: '✨', color: 'from-indigo-400 to-purple-500' }
  ];

  const currentSoundscape = soundscapes.find(s => s.id === soundscape);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInPeace(prev => prev + 1);
      
      // Gentle restoration
      setTranquility(prev => Math.min(100, prev + 0.5));
      setHarmony(prev => Math.min(100, prev + 0.5));
      setSerenity(prev => Math.min(100, prev + 0.5));
      setInnerPeace(prev => Math.min(100, prev + 0.5));
      
      // Create gentle clouds
      if (Math.random() > 0.95) {
        createCloud();
      }
      
      // Peaceful moments counter
      if (tranquility > 80 && harmony > 80 && serenity > 80 && innerPeace > 80) {
        setPeacefulMoments(prev => prev + 1);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [tranquility, harmony, serenity, innerPeace]);

  useEffect(() => {
    if (message && message !== 'Welcome to your peaceful sanctuary 🕊️') {
      const timer = setTimeout(() => setMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Breathing cycle
  useEffect(() => {
    if (isBreathing) {
      const breathingTimer = setInterval(() => {
        setBreathPhase(prev => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          return 'inhale';
        });
      }, 4000);
      
      return () => clearInterval(breathingTimer);
    }
  }, [isBreathing]);

  const createCloud = () => {
    const newCloud = {
      id: Date.now(),
      y: Math.random() * 30,
      size: 3 + Math.random() * 2,
      speed: 60 + Math.random() * 40
    };
    setClouds(prev => [...prev, newCloud]);
    setTimeout(() => {
      setClouds(prev => prev.filter(c => c.id !== newCloud.id));
    }, newCloud.speed * 1000);
  };

  const createPetals = (count = 15) => {
    const newPetals = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 6 + Math.random() * 4
    }));
    setPetals(prev => [...prev, ...newPetals]);
    setTimeout(() => {
      setPetals(prev => prev.filter(p => !newPetals.find(np => np.id === p.id)));
    }, 10000);
  };

  const createRipple = (x, y) => {
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 2000);
  };

  const startBreathing = () => {
    setIsBreathing(true);
    setBreathPhase('inhale');
    setMessage('🫁 Follow the breathing circle... Inhale...');
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setBreathCount(prev => prev + 1);
    setMessage('☮️ Beautiful practice. You are centered.');
  };

  const meditate = () => {
    setTranquility(100);
    setHarmony(100);
    setSerenity(100);
    setInnerPeace(100);
    createPetals(25);
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(randomAffirmation);
    setMessage('🧘 Deep peace washes over you...');
    setTimeout(() => setAffirmation(''), 6000);
  };

  const sendLove = () => {
    createPetals(20);
    createRipple(50, 50);
    setMessage('💝 Love and peace radiate from your heart');
    setHarmony(100);
  };

  const gratitude = () => {
    createRipple(50, 50);
    setMessage('🙏 Gratitude fills your being with light');
    setSerenity(100);
  };

  const letGo = () => {
    setPetals([]);
    setMessage('🍃 Release... Let go... Be free...');
    setTranquility(100);
  };

  const getBreathingText = () => {
    if (!isBreathing) return 'Start';
    if (breathPhase === 'inhale') return 'Breathe In...';
    if (breathPhase === 'hold') return 'Hold...';
    return 'Breathe Out...';
  };

  const getBreathingScale = () => {
    if (!isBreathing) return 1;
    if (breathPhase === 'inhale') return 1.3;
    if (breathPhase === 'hold') return 1.3;
    return 0.7;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentSoundscape.color} transition-all duration-1000 p-4 md:p-8 relative overflow-hidden`}>
      
      {/* Floating clouds */}
      {clouds.map(cloud => (
        <div
          key={cloud.id}
          className="fixed opacity-40"
          style={{
            top: `${cloud.y}%`,
            left: '-10%',
            fontSize: `${cloud.size}rem`,
            animation: `driftRight ${cloud.speed}s linear forwards`
          }}
        >
          ☁️
        </div>
      ))}

      {/* Falling petals */}
      {petals.map(petal => (
        <div
          key={petal.id}
          className="fixed text-4xl pointer-events-none"
          style={{
            left: `${petal.x}%`,
            top: '-5%',
            animation: `fall ${petal.duration}s ease-in forwards`,
            animationDelay: `${petal.delay}s`
          }}
        >
          🌸
        </div>
      ))}

      {/* Water ripples */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="fixed rounded-full border-4 border-white pointer-events-none"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 2s ease-out forwards'
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Peaceful Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center gap-4">
              <div className="text-6xl animate-pulse">🕊️</div>
              <h1 className="text-7xl md:text-8xl font-light text-white drop-shadow-lg">
                PEACE
              </h1>
              <div className="text-6xl animate-pulse">☮️</div>
            </div>
          </div>
          <p className="text-3xl font-light text-white opacity-90 mb-4">
            Find your center. Breathe. Be still.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <div className="px-6 py-3 bg-white bg-opacity-30 backdrop-blur-lg rounded-full text-white font-medium">
              ⏱️ {formatTime(timeInPeace)} in peace
            </div>
            <div className="px-6 py-3 bg-white bg-opacity-30 backdrop-blur-lg rounded-full text-white font-medium">
              ✨ {peacefulMoments} peaceful moments
            </div>
            <div className="px-6 py-3 bg-white bg-opacity-30 backdrop-blur-lg rounded-full text-white font-medium">
              🫁 {breathCount} breath cycles
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-white bg-opacity-40 backdrop-blur-lg text-gray-800 px-8 py-4 rounded-full text-center mb-6 text-xl font-light shadow-lg">
            {message}
          </div>
        )}

        {/* Affirmation */}
        {affirmation && (
          <div className="bg-white bg-opacity-50 backdrop-blur-xl text-gray-800 px-12 py-8 rounded-3xl text-center mb-6 text-3xl font-light italic shadow-2xl animate-pulse border-2 border-white">
            "{affirmation}"
          </div>
        )}

        {/* Soundscape Selector */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          {soundscapes.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setSoundscape(s.id);
                setMessage(`${s.icon} ${s.name} soundscape activated`);
              }}
              className={`p-4 rounded-2xl font-medium transition-all ${
                soundscape === s.id
                  ? `bg-gradient-to-br ${s.color} text-white shadow-lg scale-105`
                  : 'bg-white bg-opacity-30 backdrop-blur-sm text-white hover:scale-105'
              }`}
            >
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="text-sm">{s.name.split(' ')[1]}</div>
            </button>
          ))}
        </div>

        {/* Peace Levels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white bg-opacity-40 backdrop-blur-lg rounded-3xl p-6 text-center shadow-lg">
            <div className="text-5xl mb-2">🕊️</div>
            <div className="text-4xl font-light text-white mb-1">{Math.round(tranquility)}%</div>
            <div className="text-sm text-white opacity-90">Tranquility</div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-3">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-1000"
                style={{ width: `${tranquility}%` }}
              />
            </div>
          </div>

          <div className="bg-white bg-opacity-40 backdrop-blur-lg rounded-3xl p-6 text-center shadow-lg">
            <div className="text-5xl mb-2">☯️</div>
            <div className="text-4xl font-light text-white mb-1">{Math.round(harmony)}%</div>
            <div className="text-sm text-white opacity-90">Harmony</div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-3">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-1000"
                style={{ width: `${harmony}%` }}
              />
            </div>
          </div>

          <div className="bg-white bg-opacity-40 backdrop-blur-lg rounded-3xl p-6 text-center shadow-lg">
            <div className="text-5xl mb-2">🌙</div>
            <div className="text-4xl font-light text-white mb-1">{Math.round(serenity)}%</div>
            <div className="text-sm text-white opacity-90">Serenity</div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-3">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-1000"
                style={{ width: `${serenity}%` }}
              />
            </div>
          </div>

          <div className="bg-white bg-opacity-40 backdrop-blur-lg rounded-3xl p-6 text-center shadow-lg">
            <div className="text-5xl mb-2">💫</div>
            <div className="text-4xl font-light text-white mb-1">{Math.round(innerPeace)}%</div>
            <div className="text-sm text-white opacity-90">Inner Peace</div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-3">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-1000"
                style={{ width: `${innerPeace}%` }}
              />
            </div>
          </div>
        </div>

        {/* Breathing Circle */}
        <div className="bg-white bg-opacity-30 backdrop-blur-xl rounded-3xl p-12 mb-8 shadow-2xl">
          <h3 className="text-3xl font-light text-white text-center mb-8">Guided Breathing</h3>
          <div className="flex flex-col items-center">
            <div 
              className="relative mb-8"
              style={{
                transition: 'transform 4s ease-in-out',
                transform: `scale(${getBreathingScale()})`
              }}
            >
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-white to-blue-200 opacity-60 flex items-center justify-center shadow-2xl">
                <div className="text-3xl font-light text-gray-700">
                  {getBreathingText()}
                </div>
              </div>
            </div>
            
            <button
              onClick={isBreathing ? stopBreathing : startBreathing}
              className="bg-white bg-opacity-50 hover:bg-opacity-70 backdrop-blur-lg text-gray-800 px-12 py-6 rounded-full font-light text-2xl shadow-lg transition-all transform hover:scale-105"
            >
              {isBreathing ? '⏸️ Complete Cycle' : '▶️ Begin Breathing'}
            </button>
            
            {isBreathing && (
              <div className="mt-6 text-white text-lg font-light opacity-80">
                Inhale (4s) → Hold (4s) → Exhale (4s)
              </div>
            )}
          </div>
        </div>

        {/* Peace Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={meditate}
            className="bg-white bg-opacity-40 hover:bg-opacity-60 backdrop-blur-lg text-white p-8 rounded-3xl shadow-lg transition-all transform hover:scale-105"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-3 opacity-80" />
            <div className="text-2xl font-light mb-1">Meditate</div>
            <div className="text-sm opacity-80">Find stillness</div>
          </button>

          <button
            onClick={sendLove}
            className="bg-white bg-opacity-40 hover:bg-opacity-60 backdrop-blur-lg text-white p-8 rounded-3xl shadow-lg transition-all transform hover:scale-105"
          >
            <Heart className="w-16 h-16 mx-auto mb-3 opacity-80" />
            <div className="text-2xl font-light mb-1">Send Love</div>
            <div className="text-sm opacity-80">Share compassion</div>
          </button>

          <button
            onClick={gratitude}
            className="bg-white bg-opacity-40 hover:bg-opacity-60 backdrop-blur-lg text-white p-8 rounded-3xl shadow-lg transition-all transform hover:scale-105"
          >
            <Flower2 className="w-16 h-16 mx-auto mb-3 opacity-80" />
            <div className="text-2xl font-light mb-1">Gratitude</div>
            <div className="text-sm opacity-80">Give thanks</div>
          </button>

          <button
            onClick={letGo}
            className="bg-white bg-opacity-40 hover:bg-opacity-60 backdrop-blur-lg text-white p-8 rounded-3xl shadow-lg transition-all transform hover:scale-105"
          >
            <Wind className="w-16 h-16 mx-auto mb-3 opacity-80" />
            <div className="text-2xl font-light mb-1">Let Go</div>
            <div className="text-sm opacity-80">Release tension</div>
          </button>
        </div>

        {/* Peace Quote */}
        <div className="bg-white bg-opacity-30 backdrop-blur-xl rounded-3xl p-8 text-center shadow-lg">
          <p className="text-3xl font-light italic text-white leading-relaxed">
            "Peace comes from within. Do not seek it without."
          </p>
          <p className="text-xl text-white opacity-80 mt-4">— Buddha</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes driftRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(110vw); }
        }
        @keyframes ripple {
          0% { width: 20px; height: 20px; opacity: 1; }
          100% { width: 400px; height: 400px; opacity: 0; }
        }
      `}</style>
    </div>
  );
}