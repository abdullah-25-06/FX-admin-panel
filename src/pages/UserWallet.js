import React, { useState } from "react";

const UserWallet = () => {
  const [wallets] = useState([
    {
      id: 1,
      user: "user1",
      btc: "0.5",
      eth: "2.5",
      usdt: "1500",
      total: "$29,750",
    },
    {
      id: 2,
      user: "user2",
      btc: "1.2",
      eth: "5.8",
      usdt: "2500",
      total: "$62,300",
    },
    {
      id: 3,
      user: "user3",
      btc: "0.8",
      eth: "3.2",
      usdt: "1200",
      total: "$38,400",
    },
  ]);

  return (
    <div className='content'>
      <h1 className='page-title'>User Wallet</h1>

      <div className='card'>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>BTC</th>
                <th>ETH</th>
                <th>USDT</th>
                <th>Total Value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((wallet) => (
                <tr key={wallet.id}>
                  <td>{wallet.user}</td>
                  <td>{wallet.btc}</td>
                  <td>{wallet.eth}</td>
                  <td>{wallet.usdt}</td>
                  <td>{wallet.total}</td>
                  <td>
                    <button className='btn btn-edit'>View</button>
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

export default UserWallet;
