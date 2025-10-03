import React from "react";

const SystemSettings = () => {
  return (
    <div className='content'>
      <h1 className='page-title'>System Settings</h1>

      <div className='card'>
        <h2>System Configuration</h2>
        <div className='form-group'>
          <label>Site Name</label>
          <input type='text' defaultValue='Poloniex Trade' />
        </div>
        <div className='form-group'>
          <label>Maintenance Mode</label>
          <select>
            <option>Disabled</option>
            <option>Enabled</option>
          </select>
        </div>
        <button className='btn btn-primary'>Save Settings</button>
      </div>
    </div>
  );
};

export default SystemSettings;
