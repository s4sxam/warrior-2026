ChartJS.register(ArcElement, Tooltip, Legend);

export default function Analysis({ data }: { data: WarriorState }) {
  const chartData = {
    labels: Object.keys(data.triggers),
    datasets:[{
      data: Object.values(data.triggers),
      backgroundColor:['#ff3131', '#8b0000', '#ff7b7b', '#4a0000', '#ffaaaa'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  return (
    <div className="container">
      <div className="glass-card">
        <h3 className="title" style={{ textAlign: 'left', margin: 0 }}>TRIGGER ANALYSIS</h3>
        <p style={{ fontSize: '12px', color: '#777', textAlign: 'left', fontWeight: 700 }}>Visualizing the enemy.</p>
        
        {Object.keys(data.triggers).length > 0 ? (
          <div style={{ height: '250px', marginTop: '20px' }}>
            <Doughnut data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#ccc' } } }, cutout: '70%' }} />
          </div>
        ) : (
          <p style={{ color: '#666', fontWeight: 800, padding: '50px 0' }}>NO ENEMY DATA FOUND. STAY CLEAN.</p>
        )}
      </div>
    </div>
  );
}