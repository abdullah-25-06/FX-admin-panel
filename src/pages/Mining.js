import React, { useState } from "react";

const Mining = () => {
  const [miningPools] = useState([
    {
      id: 1,
      name: "BTC Pool",
      hashrate: "125.8 PH/s",
      miners: 1250,
      reward: "6.25 BTC",
    },
    {
      id: 2,
      name: "ETH Pool",
      hashrate: "285.3 TH/s",
      miners: 2850,
      reward: "2.0 ETH",
    },
    {
      id: 3,
      name: "LTC Pool",
      hashrate: "45.2 TH/s",
      miners: 850,
      reward: "12.5 LTC",
    },
  ]);

  return (
    <div className='content'>
      <h1 className='page-title'>Mining</h1>

      <div className='stats-grid'>
        <div className='stat-card'>
          <h3>Total Hashrate</h3>
          <p>456.3 PH/s</p>
        </div>
        <div className='stat-card'>
          <h3>Active Miners</h3>
          <p>4,950</p>
        </div>
        <div className='stat-card'>
          <h3>24h Rewards</h3>
          <p>18.75 BTC</p>
        </div>
        <div className='stat-card'>
          <h3>Total Blocks</h3>
          <p>12,458</p>
        </div>
      </div>

      <div className='card'>
        <h2>Mining Pools</h2>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Pool Name</th>
                <th>Hashrate</th>
                <th>Miners</th>
                <th>Block Reward</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {miningPools.map((pool) => (
                <tr key={pool.id}>
                  <td>{pool.name}</td>
                  <td>{pool.hashrate}</td>
                  <td>{pool.miners}</td>
                  <td>{pool.reward}</td>
                  <td>
                    <button className='btn btn-edit'>Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Mining;
