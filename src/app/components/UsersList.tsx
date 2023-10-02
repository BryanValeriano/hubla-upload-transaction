"use client"
import User from "@/server/entities/User";
import { useState, useEffect } from 'react';

interface userProps {
  users: User[];
}

export default function UserList({ users }: userProps) {
  const [filterText, setFilterText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const result = users.filter(user =>
      user.userName.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredUsers(result);
  }, [users, filterText]);

  return (
    <div className="max-w-xs mx-auto mt-4">
      <h2 className="text-2xl font-semibold mb-4">Users:</h2>
      <input
        type="text"
        placeholder="Filter by name"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="mb-4 p-2 border rounded text-black bg-slate-100"
      />
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div key={user.userName} className="p-4 border rounded shadow-sm">
            <div className="border-b border-gray-200 pb-2 mb-2">
              <span className="text-gray-500">Name:</span>
              <span className="font-medium ml-2">{user.userName}</span>
            </div>
            <div className="border-b border-gray-200 pb-2 mb-2">
              <span className="text-gray-500">Balance:</span>
              <span className="font-medium ml-2">{user.balance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
