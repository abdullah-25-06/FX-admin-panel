import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

const Announcement = () => {
  const [announcements] = useState([
    {
      id: 1,
      title: "System Maintenance",
      content: "Scheduled maintenance on May 20th",
      date: "2023-05-15",
      status: "Active",
    },
    {
      id: 2,
      title: "New Coin Listing",
      content: "XYZ coin will be listed next week",
      date: "2023-05-10",
      status: "Active",
    },
    {
      id: 3,
      title: "Trading Competition",
      content: "Join our new trading competition",
      date: "2023-05-05",
      status: "Expired",
    },
  ]);

  return (
    <div className='content'>
      <h1 className='page-title'>Announcement</h1>

      <div className='action-bar'>
        <button className='btn btn-primary'>New Announcement</button>
      </div>

      <div className='card'>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement) => (
                <tr key={announcement.id}>
                  <td>{announcement.title}</td>
                  <td>{announcement.content}</td>
                  <td>{announcement.date}</td>
                  <td>
                    <span
                      className={`status status-${announcement.status.toLowerCase()}`}
                    >
                      {announcement.status}
                    </span>
                  </td>
                  <td>
                    <button className='btn btn-edit'>
                      <Edit size={16} />
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

export default Announcement;
