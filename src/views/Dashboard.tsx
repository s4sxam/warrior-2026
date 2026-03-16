import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FaShieldAlt, FaTintSlash, FaSkull } from 'react-icons/fa';
import { WarriorState } from '../types';

interface Props {
  data: WarriorState;
  updateData: (newData: WarriorState) => void;
  openFailModal: () => void;
  startPanic: () => void;
}

export default function Dashboard({ data, updateData, openFailModal, startPanic }: Props) {
  const[levelInfo, setLevelInfo] = useState({ name: 'RECRUIT', max: 10, pct: 0, totalClean: 0 });

  useEffect(() => {
    const totalClean = Object.values(data.history).filter(x => x.status === 'clean').length;
    const ranks =[
      { name: "RECRUIT", max: 10 }, { name: "FIGHTER", max: 30 },
      { name: "WARRIOR", max: 90 }, { name: "SPARTAN", max: 365 }, { name: "IMMORTAL", max: 9999 }
    ];
    let currentRank = ranks[0], prevMax = 0;
    for (let r of ranks) { if (totalClean < r.max) { currentRank = r; break; } prevMax = r.max; }
    
    const progress = totalClean - prevMax;
    const pct = totalClean === 0 ? 0 : Math.min((progress / (currentRank.max - prevMax)) * 100, 100);
    setLevelInfo({ name: currentRank.name, max: currentRank.max, pct, totalClean });
  }, [data]);

  const logVictory = () => {
    const today = new Date().toDateString();
    if (data.history[today]) return alert("Battle already reported for today.");
    
    const newData = { ...data, streak: data.streak + 1 };
    newData.history[today] = { status: 'clean' };
    updateData(newData);
    confetti({ particleCount: 200, spread: 90, colors: ['#1DB954', '#ffffff'] });
  };

  const renderCalendar = () => {
    const today = new Date();
    const days = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => {
      const dStr = new Date(today.getFullYear(), today.getMonth(), i + 1).toDateString();
      const status = data.history[dStr]?.status || '';
      const isFuture = (i + 1) > today.getDate();
      return (
        <div key={i} className={`day-box ${status}`} style={{ opacity: isFuture ? 0.3 : 1, border: (i+1) === today.getDate() ? '2px solid white' : 'none' }}>
          {i + 1}
        </div>
      );
    });
  };

  return (
    <div className="container">
      <div className="glass-card">
        <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 900, letterSpacing: '3px' }}>CURRENT STREAK</div>
        <h1 style={{ fontSize: '80px', color: 'var(--warrior-red)', margin: 0, textShadow: '0 0 40px rgba(255,49,49,0.6)', lineHeight: 1 }}>{data.streak}</h1>
        <div style={{ fontSize: '11px', color: '#666', fontWeight: 900, letterSpacing: '5px', marginTop: '5px' }}>DAYS OF DOMINANCE</div>
        
        <div style={{ marginTop: '30px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#888', fontWeight: 900, letterSpacing: '1px' }}>
            <span style={{ color: 'var(--warrior-red)' }}>{levelInfo.name}</span>
            <span>{levelInfo.totalClean}/{levelInfo.max} XP</span>
          </div>
          <div style={{ width: '100%', height: '12px', background: '#1a1a1a', borderRadius: '10px', marginTop: '8px', border: '1px solid #333' }}>
            <div style={{ width: `${levelInfo.pct}%`, height: '100%', background: 'linear-gradient(90deg, #8b0000, #ff3131)', borderRadius: '10px', transition: 'width 1s', boxShadow: '0 0 15px var(--warrior-red)' }} />
          </div>
        </div>
      </div>

      <button onClick={startPanic} style={{ width: '100%', padding: '20px', background: 'linear-gradient(45deg, #ff3131, #aa0000)', color: 'white', borderRadius: '50px', fontWeight: 900, border: 'none', marginBottom: '25px', cursor: 'pointer', boxShadow: '0 10px 30px rgba(255,49,49,0.4)' }}>
        <FaSkull /> INITIATE PANIC PROTOCOL
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <button className="action-btn victory" onClick={logVictory}><FaShieldAlt /> I Stay Clean</button>
        <button className="action-btn relapse" onClick={openFailModal}><FaTintSlash /> I Failed</button>
      </div>

      <div className="glass-card" style={{ marginTop: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', color: '#aaa', fontWeight: 900, letterSpacing: '2px' }}>BATTLE CALENDAR</div>
          <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--warrior-red)' }}>{new Date().toLocaleString('default', { month: 'long' }).toUpperCase()}</div>
        </div>
        <div className="calendar-grid">{renderCalendar()}</div>
      </div>
    </div>
  );
}