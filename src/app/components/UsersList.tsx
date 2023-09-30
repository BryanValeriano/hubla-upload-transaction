import User from "@/server/entities/User";

interface userProps {
  users: Omit<User, "id">[];
}

export default function UserList({ users }: userProps) {
  return (
    <div className="max-w-xs mx-auto mt-4" >
      <h2 className="text-2xl font-semibold mb-4">Users:</h2>
      <div className="space-y-4">
        {users.map((user, index) => (
          <div key={index} className="p-4 border rounded shadow-sm">
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
