import React from "react";

const Dashboard = () => {
  return (
    <div className='content'>
      <h1 className='page-title'>Dashboard</h1>

      <div className='stats-grid'>
        <div className='stat-card'>
          <h3>Total Users</h3>
          <p>1,245</p>
        </div>
        <div className='stat-card'>
          <h3>Total Transactions</h3>
          <p>8,742</p>
        </div>
        <div className='stat-card'>
          <h3>Active Currencies</h3>
          <p>24</p>
        </div>
        <div className='stat-card'>
          <h3>System Health</h3>
          <p>100%</p>
        </div>
      </div>

      <div className='card'>
        <h2>Recent Activity</h2>
        <p>System overview and recent activities will be displayed here.</p>
      </div>
    </div>
  );
};

export default Dashboard;
