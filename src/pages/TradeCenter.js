import React, { useState } from "react";

const TradeCenter = () => {
  const [trades] = useState([
    {
      id: 1,
      pair: "BTC/USDT",
      price: "29,500.00",
      change: "+2.5%",
      volume: "125.8 BTC",
    },
    {
      id: 2,
      pair: "ETH/USDT",
      price: "1,850.50",
      change: "-1.2%",
      volume: "845.3 ETH",
    },
    {
      id: 3,
      pair: "XRP/USDT",
      price: "0.52",
      change: "+5.3%",
      volume: "1.2M XRP",
    },
    {
      id: 4,
      pair: "ADA/USDT",
      price: "0.38",
      change: "-0.8%",
      volume: "2.5M ADA",
    },
  ]);

  return (
    <div className='content'>
      <h1 className='page-title'>Trade Center</h1>

      <div className='card'>
        <h2>Market Overview</h2>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Pair</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>24h Volume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.id}>
                  <td>{trade.pair}</td>
                  <td>{trade.price}</td>
                  <td
                    className={
                      trade.change.startsWith("+") ? "positive" : "negative"
                    }
                  >
                    {trade.change}
                  </td>
                  <td>{trade.volume}</td>
                  <td>
                    <button className='btn btn-edit'>Trade</button>
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

export default TradeCenter;
