import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TablePage.css'; // Import your CSS file

function TablePage() {
  const [activeTab, setActiveTab] = useState('pH');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const openTab = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1); // Reset page number when tab changes
  };

  const fetchData = async (tabName) => {
    try {
      const response = await axios.get(`https://aquaponic-api-bb5761772d00.herokuapp.com/api/v1/irrigationMonitor`);
      setData(response.data.data); // Assuming the actual data is nested under the 'data' key
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Logic to calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Function to download report
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

// Function to download report
const downloadReport = () => {
  // Create CSV content
  let csvContent = "data:text/csv;charset=utf-8,";
  
  // Add header row
  const headerRow = ["ID", "pH", "PPM", "EC", "Temperature", "Date Inserted"];
  csvContent += headerRow.join(",") + "\n";
  
  // Add data rows
  csvContent += data.map(item => (
    [
      item.id,
      item.ph,
      item.ppm,
      item.ec,
      item.temp,
      formatDate(item.created_at) // Format date here
    ].join(",")
  )).join("\n");
  
  // Create a temporary anchor element
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "report.csv");
  document.body.appendChild(link);
  
  // Trigger the download
  link.click();
};
  

  return (
    <div>
      <div className="tab">
        <button className={activeTab === 'pH' ? 'tablinks active' : 'tablinks'} onClick={() => openTab('pH')}>pH</button>
        <button className={activeTab === 'ppm' ? 'tablinks active' : 'tablinks'} onClick={() => openTab('ppm')}>PPM</button>
        <button className={activeTab === 'ec' ? 'tablinks active' : 'tablinks'} onClick={() => openTab('ec')}>EC</button>
        <button className={activeTab === 'temperature' ? 'tablinks active' : 'tablinks'} onClick={() => openTab('temperature')}>Temperature</button>
      </div>

      {activeTab === 'pH' && (
        <div className="tabcontent" style={{ display: activeTab === 'pH' ? 'block' : 'none' }}>
          <h3>pH Table</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>pH</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.ph}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="pagination">
            {data.length > itemsPerPage && (
              <ul>
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
                  <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
                    <button onClick={() => paginate(i + 1)}>{i + 1}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Similar sections for other tabs */}
      
      {activeTab === 'ppm' && (
        <div className="tabcontent" style={{ display: activeTab === 'ppm' ? 'block' : 'none' }}>
          <h3>PPM Table</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ppm</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.ppm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="pagination">
            {data.length > itemsPerPage && (
              <ul>
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
                  <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
                    <button onClick={() => paginate(i + 1)}>{i + 1}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {activeTab === 'ec' && (
        <div className="tabcontent" style={{ display: activeTab === 'ec' ? 'block' : 'none' }}>
          <h3>EC Table</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>EC</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.ec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            {data.length > itemsPerPage && (
              <ul>
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
                  <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
                    <button onClick={() => paginate(i + 1)}>{i + 1}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {activeTab === 'temperature' && (
        <div className="tabcontent" style={{ display: activeTab === 'temperature' ? 'block' : 'none' }}>
          <h3>Temperature Table</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Temperature</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.temp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            {data.length > itemsPerPage && (
              <ul>
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
                  <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
                    <button onClick={() => paginate(i + 1)}>{i + 1}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      <div className="download-report">
        <button className="btn-warning" onClick={downloadReport}>Download Report</button>
      </div>
    </div>
    
  );
}

export default TablePage;
