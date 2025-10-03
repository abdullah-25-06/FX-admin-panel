import React, { useState } from "react";
import { Edit, Bell, UserPlus } from "lucide-react";

const UserManagement = () => {
  const [users] = useState([
    {
      id: 167,
      account: "1388888888",
      login: "1 time",
      ip: "105.213.148.152",
      time: "2022-09-28 22:55:45",
      address: "802RTp-h5x0Z",
      recommended: "Not submitted",
      certification: "Login: Normal",
      status: "Normal",
      code: "2QDYPINAN",
    },
    {
      id: 166,
      account: "test@gmail.com",
      login: "3 times",
      ip: "128.199.21.54",
      time: "2022-06-17 05:58:53",
      address: "802R",
      recommended: "Not submitted",
      certification: "Login: Normal",
      status: "Normal",
      code: "DHBCC20X",
    },
    {
      id: 165,
      account: "anba@gmail.com",
      login: "256 times",
      ip: "172.107.384.172",
      time: "2022-08-04 31:59:48",
      address: "1.38x0Z",
      recommended: "Authentication successful",
      certification: "Login: Normal",
      status: "Normal",
      code: "XOVYENEWO",
    },
  ]);

  return (
    <div className='content'>
      <h1 className='page-title'>User Management</h1>

      <div className='action-bar'>
        <button className='btn btn-primary'>New</button>
        <button className='btn btn-secondary'>Freeze</button>
        <button className='btn btn-success'>Thaw</button>
        <button className='btn btn-info'>Allow Withdrawal</button>
        <button className='btn btn-warning'>Prohibited Withdrawal</button>
        <button className='btn btn-danger'>Delete</button>
        <button className='btn btn-primary'>Mass Notification</button>
      </div>

      <div className='filters'>
        <select>
          <option>All status</option>
          <option>Normal</option>
          <option>Frozen</option>
        </select>
        <select>
          <option>Email Account</option>
        </select>
        <input type='text' placeholder='Please enter your email' />
      </div>

      <div className='card'>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Member account</th>
                <th>Login</th>
                <th>Register IP/Time</th>
                <th>Address</th>
                <th>Recommended By</th>
                <th>Certification</th>
                <th>State</th>
                <th>Invitation code</th>
                <th>Operate</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.account}</td>
                  <td>{user.login}</td>
                  <td>
                    IP: {user.ip}
                    <br />
                    Time: {user.time}
                  </td>
                  <td>{user.address}</td>
                  <td>
                    <span
                      className={`status status-${
                        user.recommended === "Not submitted"
                          ? "disable"
                          : "available"
                      }`}
                    >
                      {user.recommended}
                    </span>
                  </td>
                  <td>{user.certification}</td>
                  <td>
                    <span
                      className={`status status-${user.status.toLowerCase()}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>{user.code}</td>
                  <td>
                    <button className='btn btn-edit'>
                      <Edit size={16} />
                    </button>
                    <button className='btn btn-info'>
                      <Bell size={16} />
                    </button>
                    <button className='btn btn-warning'>
                      <UserPlus size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='pagination'>
          <span>3 records / 1 page</span>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
