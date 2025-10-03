import React, { useState } from "react";

const WebSettings = () => {
  const [settings, setSettings] = useState({
    siteTitle: "Crypto Exchange",
    siteDescription: "Best crypto trading platform",
    maintenanceMode: false,
    registrationEnabled: true,
  });

  return (
    <div className='content'>
      <h1 className='page-title'>Web Settings</h1>

      <div className='card'>
        <h2>Website Configuration</h2>
        <div className='form-group'>
          <label>Site Title</label>
          <input
            type='text'
            value={settings.siteTitle}
            onChange={(e) =>
              setSettings({ ...settings, siteTitle: e.target.value })
            }
          />
        </div>
        <div className='form-group'>
          <label>Site Description</label>
          <textarea
            value={settings.siteDescription}
            onChange={(e) =>
              setSettings({ ...settings, siteDescription: e.target.value })
            }
            rows='3'
          />
        </div>
        <div className='form-group'>
          <label>Maintenance Mode</label>
          <select
            value={settings.maintenanceMode}
            onChange={(e) =>
              setSettings({
                ...settings,
                maintenanceMode: e.target.value === "true",
              })
            }
          >
            <option value={false}>Disabled</option>
            <option value={true}>Enabled</option>
          </select>
        </div>
        <div className='form-group'>
          <label>Registration</label>
          <select
            value={settings.registrationEnabled}
            onChange={(e) =>
              setSettings({
                ...settings,
                registrationEnabled: e.target.value === "true",
              })
            }
          >
            <option value={true}>Enabled</option>
            <option value={false}>Disabled</option>
          </select>
        </div>
        <button className='btn btn-primary'>Save Settings</button>
      </div>
    </div>
  );
};

export default WebSettings;
