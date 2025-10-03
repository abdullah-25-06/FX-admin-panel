import React, { useState } from "react";

const UserCoin = () => {
  const [userCoins] = useState([
    { id: 1, user: "user1", coin: "BTC", balance: "0.5", value: "$15,000" },
    { id: 2, user: "user1", coin: "ETH", balance: "2.5", value: "$4,625" },
    { id: 3, user: "user2", coin: "BTC", balance: "1.2", value: "$36,000" },
    { id: 4, user: "user2", coin: "USDT", balance: "2500", value: "$2,500" },
  ]);

  return (
    <div className='content'>
      <h1 className='page-title'>User Coin</h1>

      <div className='filters'>
        <input type='text' placeholder='Search user...' />
        <select>
          <option>All Coins</option>
          <option>BTC</option>
          <option>ETH</option>
          <option>USDT</option>
        </select>
      </div>

      <div className='card'>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Coin</th>
                <th>Balance</th>
                <th>Value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userCoins.map((uc) => (
                <tr key={uc.id}>
                  <td>{uc.user}</td>
                  <td>{uc.coin}</td>
                  <td>{uc.balance}</td>
                  <td>{uc.value}</td>
                  <td>
                    <button className='btn btn-edit'>Details</button>
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

export default UserCoin;
