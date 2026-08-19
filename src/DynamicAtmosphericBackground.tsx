import React, { useState, useEffect } from 'react';

const THEME_SETS: Record<string, any> = {
  classic: {
    name: 'Classic Gmail & Glassmorphism',
    dawn: { bg: 'linear-gradient(135deg, #1e1b4b 0%, #311042 35%, #701a75 70%, #ca8a04 100%)', glow1: 'rgba(250, 204, 21, 0.18)' },
    midday: { bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0369a1 80%, #0284c7 100%)', glow1: 'rgba(56, 189, 248, 0.18)' },
    sunset: { bg: 'linear-gradient(135deg, #0f172a 0%, #4c1d95 40%, #831843 75%, #c2410c 100%)', glow1: 'rgba(249, 115, 22, 0.2)' },
    night: { bg: 'linear-gradient(135deg, #020617 0%, #090d16 40%, #172554 85%, #1e1b4b 100%)', glow1: 'rgba(129, 140, 248, 0.12)' },
    particles: []
  },
  cute: {
    name: '✨ Cute Kawaii Pastel',
    dawn: { bg: 'linear-gradient(135deg, #2e1065 0%, #581c87 40%, #831843 70%, #f472b6 100%)', glow1: 'rgba(244, 114, 182, 0.3)' },
    midday: { bg: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 40%, #c084fc 80%, #f472b6 100%)', glow1: 'rgba(192, 132, 252, 0.3)' },
    sunset: { bg: 'linear-gradient(135deg, #311042 0%, #701a75 40%, #be185d 75%, #f472b6 100%)', glow1: 'rgba(244, 114, 182, 0.35)' },
    night: { bg: 'linear-gradient(135deg, #0f172a 0%, #3b0764 45%, #581c87 85%, #f472b6 100%)', glow1: 'rgba(192, 132, 252, 0.25)' },
    particles: ['✨', '🌸', '💖', '⭐', '🎀', '🦄', '🐱', '😸', '🐾']
  },
  silly: {
    name: '🤪 Silly & Funky Chaos',
    dawn: { bg: 'linear-gradient(135deg, #022c22 0%, #065f46 35%, #047857 70%, #facc15 100%)', glow1: 'rgba(250, 204, 21, 0.3)' },
    midday: { bg: 'linear-gradient(135deg, #022c22 0%, #064e3b 40%, #0d9488 80%, #10b981 100%)', glow1: 'rgba(16, 185, 129, 0.3)' },
    sunset: { bg: 'linear-gradient(135deg, #422006 0%, #78350f 40%, #b45309 75%, #facc15 100%)', glow1: 'rgba(250, 204, 21, 0.35)' },
    night: { bg: 'linear-gradient(135deg, #18181b 0%, #27272a 40%, #3f3f46 85%, #10b981 100%)', glow1: 'rgba(16, 185, 129, 0.25)' },
    particles: ['💩', '🚽', '⚽', '🚀', '🍕', '🎉', '🤡', '⚡', '😹', '😼', '🐈‍⬛']
  }
};

export default function DynamicAtmosphericBackground({
  activeC4Scene = 'all',
  weatherCondition = 'clear',
  manualTimeOfDay = 'auto',
  themeStyleSet = 'classic' // 'classic' | 'cute' | 'silly'
}) {
  const [timeOfDay, setTimeOfDay] = useState('midday');

  useEffect(() => {
    if (manualTimeOfDay !== 'auto') {
      setTimeOfDay(manualTimeOfDay);
      return;
    }

    const updateTimeBasedOnClock = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 8) setTimeOfDay('dawn');
      else if (hour >= 8 && hour < 17) setTimeOfDay('midday');
      else if (hour >= 17 && hour < 20) setTimeOfDay('sunset');
      else setTimeOfDay('night');
    };

    updateTimeBasedOnClock();
    const timer = setInterval(updateTimeBasedOnClock, 60000);
    return () => clearInterval(timer);
  }, [manualTimeOfDay]);

  const activeThemePack = THEME_SETS[themeStyleSet] || THEME_SETS.classic;
  const activeTimeTheme = activeThemePack[timeOfDay] || activeThemePack.midday;

  // C4 Scene Color Overlays
  const C4_SCENE_GLOWS = {
    create: 'rgba(16, 185, 129, 0.18)',
    consume: 'rgba(96, 165, 250, 0.18)',
    chat: 'rgba(236, 72, 153, 0.18)',
    collaborate: 'rgba(167, 139, 250, 0.18)',
    chow_down: 'rgba(245, 158, 11, 0.18)',
    calm: 'rgba(52, 211, 153, 0.18)',
    all: 'transparent'
  };

  const sceneGlow = C4_SCENE_GLOWS[activeC4Scene] || 'transparent';
  const floatingEmojis = activeThemePack.particles || [];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: activeTimeTheme.bg,
        transition: 'background 1.5s ease-in-out',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {/* Sun/Moon Ambient Light Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${activeTimeTheme.glow1} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          transition: 'all 1.5s ease-in-out'
        }}
      />

      {/* C4 Scene Ambient Color Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '5%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${sceneGlow} 0%, transparent 70%)`,
          filter: 'blur(50px)',
          transition: 'all 1s ease-in-out'
        }}
      />

      {/* Floating Theme Particles for Cute / Silly Sets */}
      {floatingEmojis.length > 0 && (
        <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.5 }}>
          <div style={{ position: 'absolute', left: '10%', top: '15%', fontSize: '1.4rem' }}>{floatingEmojis[0]}</div>
          <div style={{ position: 'absolute', left: '85%', top: '25%', fontSize: '1.6rem' }}>{floatingEmojis[1 % floatingEmojis.length]}</div>
          <div style={{ position: 'absolute', left: '30%', top: '70%', fontSize: '1.5rem' }}>{floatingEmojis[2 % floatingEmojis.length]}</div>
          <div style={{ position: 'absolute', left: '70%', top: '80%', fontSize: '1.3rem' }}>{floatingEmojis[3 % floatingEmojis.length]}</div>
        </div>
      )}

      {/* Weather Particle Layer */}
      {weatherCondition === 'rain' && (
        <div className="rain-layer" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.4 }}>
          <div style={{ background: 'linear-gradient(transparent, rgba(255,255,255,0.4))', width: '1px', height: '80px', position: 'absolute', left: '20%', top: '10%' }} />
          <div style={{ background: 'linear-gradient(transparent, rgba(255,255,255,0.4))', width: '1px', height: '60px', position: 'absolute', left: '50%', top: '30%' }} />
          <div style={{ background: 'linear-gradient(transparent, rgba(255,255,255,0.4))', width: '1px', height: '90px', position: 'absolute', left: '80%', top: '5%' }} />
        </div>
      )}

      {weatherCondition === 'snow' && (
        <div className="snow-layer" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.6 }}>
          <div style={{ background: '#fff', borderRadius: '50%', width: '4px', height: '4px', position: 'absolute', left: '15%', top: '20%' }} />
          <div style={{ background: '#fff', borderRadius: '50%', width: '6px', height: '6px', position: 'absolute', left: '45%', top: '60%' }} />
          <div style={{ background: '#fff', borderRadius: '50%', width: '5px', height: '5px', position: 'absolute', left: '75%', top: '15%' }} />
        </div>
      )}
    </div>
  );
}
