import { useState, useEffect, useRef } from 'react';

export default function Study() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      if (!isBreak) {
        setCompletedSessions(prev => prev + 1);
        setIsBreak(true);
        setTimeLeft(breakMinutes * 60);
        playSound();
      } else {
        setIsBreak(false);
        setTimeLeft(workMinutes * 60);
        setIsActive(false);
        playSound();
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, isBreak, workMinutes, breakMinutes]);

  const playSound = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(workMinutes * 60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetSessions = () => {
    setCompletedSessions(0);
    resetTimer();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = isBreak
    ? ((breakMinutes * 60 - timeLeft) / (breakMinutes * 60)) * 100
    : ((workMinutes * 60 - timeLeft) / (workMinutes * 60)) * 100;

  return (
    <div className="study-container">
      <h2>⏰ Study Timer (Pomodoro)</h2>
      <p className="subtitle">Stay focused with the Pomodoro Technique</p>

      <div className="timer-stats">
        <div className="stat-card">
          <span className="stat-number">{completedSessions}</span>
          <span className="stat-label">Completed Sessions</span>
        </div>
      </div>

      <div className="timer-display">
        <div
          className={`timer-circle ${isActive ? 'active' : ''} ${isBreak ? 'break' : ''}`}
          style={{
            background: `conic-gradient(
              ${isBreak ? '#10b981' : '#3b82f6'} ${percentage}%, 
              #e5e7eb ${percentage}%
            )`,
          }}
        >
          <div className="timer-inner">
            <div className="timer-time">{formatTime(timeLeft)}</div>
            <div className="timer-label">{isBreak ? 'Break Time' : 'Focus Time'}</div>
          </div>
        </div>
      </div>

      <div className="timer-controls">
        <button className="btn-primary btn-large" onClick={toggleTimer}>
          {isActive ? '⏸️ Pause' : '▶️ Start'}
        </button>
        <button className="btn-secondary" onClick={resetTimer}>
          🔄 Reset
        </button>
      </div>

      <div className="timer-settings">
        <h3>Settings</h3>
        <div className="settings-grid">
          <div className="setting-group">
            <label>Focus Duration (minutes):</label>
            <input
              type="number"
              min="1"
              max="60"
              value={workMinutes}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 25;
                setWorkMinutes(value);
                if (!isActive && !isBreak) {
                  setTimeLeft(value * 60);
                }
              }}
              disabled={isActive}
            />
          </div>
          <div className="setting-group">
            <label>Break Duration (minutes):</label>
            <input
              type="number"
              min="1"
              max="30"
              value={breakMinutes}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 5;
                setBreakMinutes(value);
                if (!isActive && isBreak) {
                  setTimeLeft(value * 60);
                }
              }}
              disabled={isActive}
            />
          </div>
        </div>
        <button className="btn-secondary" onClick={resetSessions}>
          Reset Sessions Count
        </button>
      </div>

      <div className="study-tips">
        <h3>💡 Study Tips</h3>
        <ul>
          <li>🎯 Focus on one task during each Pomodoro session</li>
          <li>📱 Eliminate distractions (phone, social media, etc.)</li>
          <li>☕ Use breaks to rest, stretch, or grab a snack</li>
          <li>📝 After 4 sessions, take a longer break (15-30 minutes)</li>
          <li>🔄 Adjust timer durations based on your preference</li>
        </ul>
      </div>
    </div>
  );
}
