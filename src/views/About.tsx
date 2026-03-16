import React from 'react';
import { FaDownload, FaUpload } from 'react-icons/fa';
import { WarriorState } from '../types';

interface Props {
  data: WarriorState;
  updateData: (newData: WarriorState) => void;
}

export default function About({ data, updateData }: Props) {
  
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `warrior_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (importedData.history && importedData.triggers) {
          updateData(importedData);
          alert("Data Successfully Restored, Commander.");
        } else {
          alert("Invalid backup file format.");
        }
      } catch (err) {
        alert("Error reading file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container">
      <div className="glass-card" style={{ textAlign: 'left' }}>
        <h2 className="title" style={{ fontSize: '22px', marginBottom: '15px' }}>SYSTEM DATA</h2>
        <p style={{ color: '#aaa', fontSize: '13px', fontWeight: 700, marginBottom: '20px', lineHeight: 1.5 }}>
          Your data is strictly saved on this device. Updates to the website will NOT delete it. However, if you clear your browser history, you will lose it. Back it up here.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <button onClick={handleExport} style={{ background: '#222', color: '#fff', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FaDownload /> BACKUP
          </button>
          
          <label style={{ background: '#222', color: '#fff', border: 'none', padding: '15px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FaUpload /> RESTORE
            <input type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
          </label>
        </div>
      </div>

      <div className="glass-card" style={{ textAlign: 'left' }}>
        <h2 className="title" style={{ fontSize: '22px', marginBottom: '20px' }}>THE WARRIOR CODE</h2>
        <p style={{ color: '#bbb', fontSize: '14px', lineHeight: 1.8, fontWeight: 600 }}>
          <span style={{ color: 'white', fontWeight: 900 }}>1. HONESTY:</span> Lying to the system is lying to your soul.<br/><br/>
          <span style={{ color: 'white', fontWeight: 900 }}>2. OWNERSHIP:</span> Failures are yours. Victory is earned.<br/><br/>
          <span style={{ color: 'white', fontWeight: 900 }}>3. ISOLATION:</span> Identify triggers. Neutralize them.<br/><br/>
          <span style={{ color: 'var(--warrior-red)', fontWeight: 900 }}>4. CHAPTER 2:</span> Build the ultimate version of yourself.
        </p>
      </div>
      
      <div style={{ margin: '40px 0', fontSize: '12px', color: '#444', letterSpacing: '5px', fontWeight: 900 }}>BUILT FOR GREATNESS</div>
    </div>
  );
}