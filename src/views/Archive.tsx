import React from 'react';
import { WarriorState } from '../types';

export default function Archive({ data }: { data: WarriorState }) {
  let tV = 0, tD = 0;
  Object.values(data.history).forEach(x => { if(x.status === 'clean') tV++; else tD++; });
  const winRate = tV + tD > 0 ? Math.round((tV / (tV + tD)) * 100) : 0;

  const renderMonths = () => {
    const months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    let cards =[];

    for (let m = currentMonth; m >= 0; m--) {
      let mV = 0, mD = 0, hasData = false;
      const days = new Date(currentYear, m + 1, 0).getDate();
      
      let grid =[];
      for (let i = 1; i <= days; i++) {
        const dStr = new Date(currentYear, m, i).toDateString();
        const dData = data.history[dStr];
        if (dData) {
          hasData = true;
          if (dData.status === 'clean') mV++; else mD++;
          grid.push(
            <div key={i} className={`day-box ${dData.status}`}>
              {i}
              {dData.site && <div className="shame-label">{dData.site}</div>}
            </div>
          );
        } else {
          const isFuture = m === currentMonth && i > new Date().getDate();
          grid.push(<div key={i} className="day-box" style={{ opacity: isFuture ? 0 : 0.3 }}>{isFuture ? '' : i}</div>);
        }
      }

      if (hasData || m === currentMonth) {
        cards.push(
          <div key={m} className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ color: 'var(--warrior-red)', fontSize: '14px', margin: '0 0 15px 0', letterSpacing: '1px', textAlign: 'left' }}>
              {months[m].toUpperCase()} {currentYear}
            </h3>
            <div className="calendar-grid">{grid}</div>
            <div style={{ marginTop: '15px', fontSize: '11px', fontWeight: 900, color: '#888', textAlign: 'right' }}>
              CLEAN: {mV} | FAILED: {mD}
            </div>
          </div>
        );
      }
    }
    return cards;
  };

  return (
    <div className="container">
      <h2 className="title" style={{ fontSize: '26px', marginBottom: '25px' }}>WARRIOR ARCHIVES</h2>
      
      <div style={{ background: 'linear-gradient(135deg, #111, #000)', border: '1px solid #333', borderRadius: '28px', padding: '25px', marginBottom: '25px' }}>
        <div style={{ fontSize: '11px', color: '#888', fontWeight: 900, letterSpacing: '2px' }}>LIFETIME RECORD</div>
        <div style={{ fontSize: '28px', fontWeight: 900, margin: '10px 0' }}>
          <span style={{ color: 'var(--success)' }}>{tV} W</span> <span style={{ color: '#555' }}>/</span> <span style={{ color: 'var(--warrior-red)' }}>{tD} L</span>
        </div>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#aaa' }}>WIN RATE: <span style={{ color: 'white' }}>{winRate}%</span></div>
      </div>

      {renderMonths()}
    </div>
  );
}