import React, { useState } from "react";

const Finance = () => {
  const [transactions] = useState([
    {
      id: 1,
      user: "user1",
      type: "Deposit",
      amount: "0.5 BTC",
      status: "Completed",
      date: "2023-05-15",
    },
    {
      id: 2,
      user: "user2",
      type: "Withdrawal",
      amount: "2.5 ETH",
      status: "Pending",
      date: "2023-05-14",
    },
    {
      id: 3,
      user: "user3",
      type: "Deposit",
      amount: "1500 USDT",
      status: "Completed",
      date: "2023-05-14",
    },
    {
      id: 4,
      user: "user4",
      type: "Withdrawal",
      amount: "0.8 BTC",
      status: "Rejected",
      date: "2023-05-13",
    },
  ]);

  return (
    <div className='content'>
      <h1 className='page-title'>Finance</h1>

      <div className='stats-grid'>
        <div className='stat-card'>
          <h3>Total Deposits</h3>
          <p>24.5 BTC</p>
        </div>
        <div className='stat-card'>
          <h3>Total Withdrawals</h3>
          <p>18.2 BTC</p>
        </div>
        <div className='stat-card'>
          <h3>Pending Transactions</h3>
          <p>7</p>
        </div>
        <div className='stat-card'>
          <h3>System Balance</h3>
          <p>125.8 BTC</p>
        </div>
      </div>

      <div className='card'>
        <h2>Recent Transactions</h2>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.user}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                  <td>
                    <span
                      className={`status status-${transaction.status.toLowerCase()}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Finance;
