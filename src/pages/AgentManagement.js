import React, { useState } from "react";
import { Edit, UserPlus } from "lucide-react";

const AgentManagement = () => {
  const [agents] = useState([
    {
      id: 1,
      name: "Agent 1",
      email: "agent1@example.com",
      users: 45,
      commission: "15%",
      status: "Active",
    },
    {
      id: 2,
      name: "Agent 2",
      email: "agent2@example.com",
      users: 28,
      commission: "12%",
      status: "Active",
    },
    {
      id: 3,
      name: "Agent 3",
      email: "agent3@example.com",
      users: 12,
      commission: "10%",
      status: "Inactive",
    },
  ]);

  return (
    <div className='content'>
      <h1 className='page-title'>Agent Management</h1>

      <div className='action-bar'>
        <button className='btn btn-primary'>Add Agent</button>
      </div>

      <div className='card'>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Users</th>
                <th>Commission</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.name}</td>
                  <td>{agent.email}</td>
                  <td>{agent.users}</td>
                  <td>{agent.commission}</td>
                  <td>
                    <span
                      className={`status status-${agent.status.toLowerCase()}`}
                    >
                      {agent.status}
                    </span>
                  </td>
                  <td>
                    <button className='btn btn-edit'>
                      <Edit size={16} />
                    </button>
                    <button className='btn btn-info'>
                      <UserPlus size={16} />
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

export default AgentManagement;
