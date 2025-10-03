import React, { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";

const CurrencyManagement = () => {
  const [currencies, setCurrencies] = useState([
    {
      id: 6,
      code: "BTC",
      name: "BTC",
      type: "Wallet currency",
      contract: "bc1qkqlp7z7b9t9y4ghm8d5agj2f0dbmayvxd",
      state: "Available",
      deposit: "Normal",
      withdraw: "Normal",
      feeType: "Percentage: 0.00%",
      coinFee: "0.00%",
      contractFee: "0.00%",
    },
    {
      id: 7,
      code: "ETH",
      name: "ETH",
      type: "Wallet currency",
      contract: "0x05k10h0zD1ed57a3c7b35f8d13f7ad5f05caaf",
      state: "Available",
      deposit: "Normal",
      withdraw: "Normal",
      feeType: "Percentage: 0.00%",
      coinFee: "0.00%",
      contractFee: "0.00%",
    },
    {
      id: 4,
      code: "USDT",
      name: "USDT",
      type: "Wallet currency",
      contract: "TLDy7yme42Znw1f1bX0X2skkL8KYnq6jy2k",
      state: "Available",
      deposit: "Normal",
      withdraw: "Normal",
      feeType: "Percentage: 0.00%",
      coinFee: "0.00%",
      contractFee: "0.00%",
    },
    {
      id: 12,
      code: "EOS",
      name: "EOS",
      type: "Wallet currency",
      contract: "",
      state: "Available",
      deposit: "Disable",
      withdraw: "Disable",
      feeType: "Percentage: 0.00%",
      coinFee: "0.00%",
      contractFee: "1.00%",
    },
    {
      id: 13,
      code: "DOGE",
      name: "DOGE",
      type: "Wallet currency",
      contract: "",
      state: "Available",
      deposit: "Disable",
      withdraw: "Disable",
      feeType: "Percentage: 0.00%",
      coinFee: "0.00%",
      contractFee: "1.00%",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [newCurrency, setNewCurrency] = useState({
    code: "",
    name: "",
    type: "Wallet currency",
    contract: "",
    state: "Available",
    deposit: "Normal",
    withdraw: "Normal",
    feeType: "Percentage: 0.00%",
    coinFee: "0.00%",
    contractFee: "0.00%",
  });

  const handleAddCurrency = () => {
    const newId = Math.max(...currencies.map((c) => c.id)) + 1;
    setCurrencies([...currencies, { ...newCurrency, id: newId }]);
    setNewCurrency({
      code: "",
      name: "",
      type: "Wallet currency",
      contract: "",
      state: "Available",
      deposit: "Normal",
      withdraw: "Normal",
      feeType: "Percentage: 0.00%",
      coinFee: "0.00%",
      contractFee: "0.00%",
    });
    setShowAddForm(false);
  };

  const handleEditCurrency = (currency) => {
    setEditingCurrency(currency);
    setNewCurrency(currency);
    setShowAddForm(true);
  };

  const handleUpdateCurrency = () => {
    setCurrencies(
      currencies.map((c) => (c.id === editingCurrency.id ? newCurrency : c))
    );
    setEditingCurrency(null);
    setShowAddForm(false);
  };

  const handleDeleteCurrency = (id) => {
    setCurrencies(currencies.filter((c) => c.id !== id));
  };

  return (
    <div className='content'>
      <h1 className='page-title'>Currency Management</h1>

      <div className='action-bar'>
        <button
          className='btn btn-primary'
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={16} /> Add Currency
        </button>
      </div>

      {showAddForm && (
        <div className='card'>
          <h2>{editingCurrency ? "Edit Currency" : "Add New Currency"}</h2>
          <div className='form-row'>
            <div className='form-group'>
              <label>Code</label>
              <input
                type='text'
                value={newCurrency.code}
                onChange={(e) =>
                  setNewCurrency({ ...newCurrency, code: e.target.value })
                }
              />
            </div>
            <div className='form-group'>
              <label>Name</label>
              <input
                type='text'
                value={newCurrency.name}
                onChange={(e) =>
                  setNewCurrency({ ...newCurrency, name: e.target.value })
                }
              />
            </div>
            <div className='form-group'>
              <label>Type</label>
              <select
                value={newCurrency.type}
                onChange={(e) =>
                  setNewCurrency({ ...newCurrency, type: e.target.value })
                }
              >
                <option>Wallet currency</option>
                <option>Trading currency</option>
              </select>
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label>Contract Address</label>
              <input
                type='text'
                value={newCurrency.contract}
                onChange={(e) =>
                  setNewCurrency({ ...newCurrency, contract: e.target.value })
                }
              />
            </div>
            <div className='form-group'>
              <label>State</label>
              <select
                value={newCurrency.state}
                onChange={(e) =>
                  setNewCurrency({ ...newCurrency, state: e.target.value })
                }
              >
                <option>Available</option>
                <option>Disabled</option>
              </select>
            </div>
            <div className='form-group'>
              <label>Deposit</label>
              <select
                value={newCurrency.deposit}
                onChange={(e) =>
                  setNewCurrency({ ...newCurrency, deposit: e.target.value })
                }
              >
                <option>Normal</option>
                <option>Disable</option>
              </select>
            </div>
          </div>
          <div className='action-bar'>
            <button
              className='btn btn-primary'
              onClick={
                editingCurrency ? handleUpdateCurrency : handleAddCurrency
              }
            >
              {editingCurrency ? "Update" : "Add"} Currency
            </button>
            <button
              className='btn btn-secondary'
              onClick={() => {
                setShowAddForm(false);
                setEditingCurrency(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className='card'>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Name</th>
                <th>Type</th>
                <th>Contract address</th>
                <th>State</th>
                <th>Deposit</th>
                <th>Withdraw</th>
                <th>Fee type</th>
                <th>Coin-Coin fee</th>
                <th>Contract Fee</th>
                <th>Operate</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency) => (
                <tr key={currency.id}>
                  <td>{currency.id}</td>
                  <td>{currency.code}</td>
                  <td>{currency.name}</td>
                  <td>{currency.type}</td>
                  <td>{currency.contract || "Available"}</td>
                  <td>
                    <span
                      className={`status status-${currency.state.toLowerCase()}`}
                    >
                      {currency.state}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status status-${currency.deposit.toLowerCase()}`}
                    >
                      {currency.deposit}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status status-${currency.withdraw.toLowerCase()}`}
                    >
                      {currency.withdraw}
                    </span>
                  </td>
                  <td>{currency.feeType}</td>
                  <td>{currency.coinFee}</td>
                  <td>{currency.contractFee}</td>
                  <td>
                    <button
                      className='btn btn-edit'
                      onClick={() => handleEditCurrency(currency)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className='btn btn-delete'
                      onClick={() => handleDeleteCurrency(currency.id)}
                    >
                      <Trash2 size={16} />
                    </button>
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

export default CurrencyManagement;
