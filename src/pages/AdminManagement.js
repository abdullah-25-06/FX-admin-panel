import React, { useState } from "react";
import { Edit, Trash2, Key } from "lucide-react";

const AdminManagement = () => {
  const [admins] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "Super Admin",
      status: "Active",
      lastLogin: "2023-05-15 09:30:15",
    },
    {
      id: 2,
      name: "Support Agent",
      email: "support@example.com",
      role: "Support",
      status: "Active",
      lastLogin: "2023-05-14 14:22:45",
    },
    {
      id: 3,
      name: "Moderator",
      email: "mod@example.com",
      role: "Moderator",
      status: "Inactive",
      lastLogin: "2023-05-10 11:15:30",
    },
  ]);

  return (
    <div className='content'>
      <h1 className='page-title'>Admin Management</h1>

      <div className='action-bar'>
        <button className='btn btn-primary'>Add Admin</button>
      </div>

      <div className='card'>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.role}</td>
                  <td>
                    <span
                      className={`status status-${admin.status.toLowerCase()}`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td>{admin.lastLogin}</td>
                  <td>
                    <button className='btn btn-edit'>
                      <Edit size={16} />
                    </button>
                    <button className='btn btn-info'>
                      <Key size={16} />
                    </button>
                    <button className='btn btn-delete'>
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

export default AdminManagement;
