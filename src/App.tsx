import React, { useState, useEffect } from 'react';
import { loadData, saveData } from './utils/storage';
import { WarriorState, ViewState } from './types';
import Dashboard from './views/Dashboard';
import Analysis from './views/Analysis';
import Archive from './views/Archive';
import About from './views/About';
import { FaBars, FaTimesCircle } from 'react-icons/fa';

export default function App() {
  const [data, setData] = useState<WarriorState>(loadData());
  const [view, setView] = useState<ViewState>('dashboard');
  const[showMenu, setShowMenu] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [panicMode, setPanicMode] = useState(false);
  const[urlInput, setUrlInput] = useState('');

  // Automatically save to localStorage ANY time data changes
  useEffect(() => { saveData(data); }, [data]);

  const handleFail = () => {
    try {
      const domain = urlInput ? new URL(urlInput).hostname.replace('www.', '') : "Unknown Weakness";
      const today = new Date().toDateString();
      
      setData(prev => ({
        streak: 0,
        history: { ...prev.history, [today]: { status: 'failed', site: domain } },
        triggers: { ...prev.triggers, [domain]: (prev.triggers[domain] || 0) + 1 }
      }));
      setShowFailModal(false);
      setUrlInput('');
    } catch {
      alert("Please enter a valid URL.");
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <div>
          <div style={{ fontSize: '10px', color: '#777', letterSpacing: '4px', fontWeight: 900 }}>COMMANDER MODE</div>
          <div className="title" style={{ fontSize: '26px' }}>WARRIOR 2026</div>
        </div>
        <FaBars size={26} color="#fff" onClick={() => setShowMenu(true)} style={{ cursor: 'pointer' }} />
      </div>

      {/* SIDEBAR MENU */}
      {showMenu && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(5,5,5,0.98)', backdropFilter: 'blur(10px)', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {['dashboard', 'analysis', 'archive', 'about'].map(v => (
            <div key={v} onClick={() => { setView(v as ViewState); setShowMenu(false); window.scrollTo(0,0); }} style={{ color: '#555', fontSize: '24px', fontFamily: 'Lexend', fontWeight: 900, textTransform: 'uppercase', margin: '25px 0', cursor: 'pointer', transition: '0.3s' }}>
              {v === 'dashboard' ? 'War Room' : v === 'analysis' ? 'Analytics' : v === 'archive' ? 'Archives' : 'System / About'}
            </div>
          ))}
          <FaTimesCircle size={40} color="var(--warrior-red)" onClick={() => setShowMenu(false)} style={{ marginTop: '50px', cursor: 'pointer' }} />
        </div>
      )}

      {/* PANIC OVERLAY */}
      {panicMode && (
        <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center' }}>
          <h1 className="title" style={{ fontSize: '40px', color: 'var(--warrior-red)', animation: 'pulse 1s infinite' }}>DROP DOWN. NOW.</h1>
          <p style={{ color: '#aaa', fontSize: '16px', fontWeight: 700, margin: '20px 0' }}>Do not let temporary urges destroy permanent glory.</p>
          <button className="action-btn victory" onClick={() => setPanicMode(false)} style={{ width: '80%', maxWidth: '300px', marginTop: '30px' }}>I REGAINED CONTROL</button>
        </div>
      )}

      {/* FAIL MODAL */}
      {showFailModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(15px)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#0f0f0f', padding: '40px 30px', borderRadius: '35px', border: '2px solid var(--warrior-red)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
            <h2 className="title" style={{ fontSize: '24px', margin: '0 0 15px 0' }}>EWW.</h2>
            <p style={{ color: '#888', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Paste the URL of your defeat</p>
            <input type="url" placeholder="https://shameful-site.com" value={urlInput} onChange={e => setUrlInput(e.target.value)} style={{ width: '100%', padding: '18px', background: '#1a1a1a', color: 'white', border: '1px solid #333', borderRadius: '15px', marginTop: '20px', fontFamily: 'Inter', fontWeight: 700 }} />
            <button className="action-btn relapse" onClick={handleFail} style={{ width: '100%', marginTop: '20px' }}>CONFESS & RESET</button>
            <button onClick={() => setShowFailModal(false)} style={{ background: 'none', border: 'none', color: '#888', textDecoration: 'underline', marginTop: '20px', cursor: 'pointer' }}>Cancel (Misclick)</button>
          </div>
        </div>
      )}

      {/* VIEWS ROUTER */}
      {view === 'dashboard' && <Dashboard data={data} updateData={setData} openFailModal={() => setShowFailModal(true)} startPanic={() => setPanicMode(true)} />}
      {view === 'analysis' && <Analysis data={data} />}
      {view === 'archive' && <Archive data={data} />}
      {view === 'about' && <About data={data} updateData={setData} />}
    </div>
  );
}