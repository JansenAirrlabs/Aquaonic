import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Remove Link import
import './App.css'; // Import CSS for styling
import TablePage from './TablePage'; // Import the TablePage component
import HomePage from './HomePage'; // Import the HomePage component
import Sidebar from './Sidebar'; // Import the Sidebar component




const App = () => {

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tables" element={<TablePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
