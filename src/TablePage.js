import React, { useState } from 'react';

function TablePage() {
  const [activeTab, setActiveTab] = useState('pH');

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <div className="tab">
        <button className={activeTab === 'pH' ? 'tablinks active' : 'tablinks'} onClick={() => openTab('pH')}>pH</button>
        <button className={activeTab === 'ppm' ? 'tablinks active' : 'tablinks'} onClick={() => openTab('ppm')}>PPM</button>
        <button className={activeTab === 'ec' ? 'tablinks active' : 'tablinks'} onClick={() => openTab('ec')}>EC</button>
        <button className={activeTab === 'temperature' ? 'tablinks active' : 'tablinks'} onClick={() => openTab('temperature')}>Temperature</button>
      </div>

      <div className="tabcontent" style={{ display: activeTab === 'pH' ? 'block' : 'none' }}>
        <h3>pH Table</h3>
        <table>
          {/* Your pH table content here */}
        </table>
      </div>

      <div className="tabcontent" style={{ display: activeTab === 'ppm' ? 'block' : 'none' }}>
        <h3>PPM Table</h3>
        <table>
          {/* Your PPM table content here */}
        </table>
      </div>

      <div className="tabcontent" style={{ display: activeTab === 'ec' ? 'block' : 'none' }}>
        <h3>EC Table</h3>
        <table>
          {/* Your EC table content here */}
        </table>
      </div>

      <div className="tabcontent" style={{ display: activeTab === 'temperature' ? 'block' : 'none' }}>
        <h3>Temperature Table</h3>
        <table>
          {/* Your temperature table content here */}
        </table>
      </div>
    </div>
  );
}

export default TablePage;
