import React, { useState, useEffect, useRef } from 'react';

export default function Timer() {
  // time in seconds
  const [timeLeft, setTimeLeft] = useState(300); // default 5:00
  const [isRunning, setIsRunning] = useState(false);
  const [inputMin, setInputMin] = useState(5);
  const [inputSec, setInputSec] = useState(0);
  const alarmRef = useRef(null);

  useEffect(() => {
    alarmRef.current = new Audio('/alarm.mp3'); // put an alarm.mp3 in public/
  }, []);

  useEffect(() => {
    let t;
    if (isRunning && timeLeft > 0) {
      t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (alarmRef.current) {
        // try to play - browsers usually allow user-initiated audio; if blocked, it's fine
        alarmRef.current.currentTime = 0;
        alarmRef.current.play().catch(() => {});
      }
    }
    return () => clearInterval(t);
  }, [isRunning, timeLeft]);

  const format = (s) => `${Math.floor(s / 60)}:${('0' + (s % 60)).slice(-2)}`;

  const handleSet = () => {
    const total = Math.max(0, parseInt(inputMin || 0, 10)) * 60 + Math.max(0, parseInt(inputSec || 0, 10));
    setTimeLeft(total);
    setIsRunning(false);
  };

  const handleStartPause = () => setIsRunning((r) => !r);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const increment = (delta) => setTimeLeft((t) => Math.max(0, t + delta));

  return (
    <div className="timer" style={{ width: 220 }}>
      <div style={{ fontSize: 20, textAlign: 'center', fontWeight: 600 }}>{format(timeLeft)}</div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
        <button onClick={() => increment(60)}>+1m</button>
        <button onClick={() => increment(-60)}>-1m</button>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
        <button onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', marginTop: 10, paddingTop: 10 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
          <input
            type="number"
            min="0"
            value={inputMin}
            onChange={(e) => setInputMin(e.target.value)}
            style={{ width: 50, padding: 6 }}
          />
          <span>m</span>
          <input
            type="number"
            min="0"
            max="59"
            value={inputSec}
            onChange={(e) => setInputSec(e.target.value)}
            style={{ width: 50, padding: 6 }}
          />
          <span>s</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <button onClick={handleSet}>Set</button>
        </div>
      </div>
    </div>
  );
}
