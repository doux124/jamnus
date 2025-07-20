import React, { useState } from 'react';
import HomeIntro from './HomeIntro';
import ChatInterface from './ChatInterface';
import ChatInterface2 from './ChatInterface2';

function Main() {
  const [mode, setMode] = useState('home'); // 'home' | 'classic' | 'gentle'

  const goHome = () => setMode('home');

  return (
    <>
      {mode === 'home' && (
        <HomeIntro
          onStartClassic={() => setMode('classic')}
          onStartGentle={() => setMode('gentle')}
        />
      )}
      {mode === 'classic' && <ChatInterface onBack={goHome} />}
      {mode === 'gentle' && <ChatInterface2 onBack={goHome} />}
    </>
  );
}

export default Main;
