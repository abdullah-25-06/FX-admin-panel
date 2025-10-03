import React, { useState } from "react";

const CoinSubscribe = () => {
  const [subscriptions] = useState([
    {
      id: 1,
      coin: "BTC",
      price: "29,500.00",
      change: "+2.5%",
      subscribers: 12500,
    },
    {
      id: 2,
      coin: "ETH",
      price: "1,850.50",
      change: "-1.2%",
      subscribers: 9850,
    },
    { id: 3, coin: "BNB", price: "305.75", change: "+3.1%", subscribers: 7450 },
  ]);

  return (
    <div className='content'>
      <h1 className='page-title'>Coin Subscribe</h1>

      <div className='card'>
        <h2>Subscription Plans</h2>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Current Price</th>
                <th>24h Change</th>
                <th>Subscribers</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.coin}</td>
                  <td>{sub.price}</td>
                  <td
                    className={
                      sub.change.startsWith("+") ? "positive" : "negative"
                    }
                  >
                    {sub.change}
                  </td>
                  <td>{sub.subscribers}</td>
                  <td>
                    <button className='btn btn-edit'>Subscribe</button>
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

export default CoinSubscribe;
