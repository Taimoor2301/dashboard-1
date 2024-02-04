import React, { useEffect, useState } from "react";

export default function Roles({ data }) {
  const [currentRole, setCurrentRole] = useState(data[0]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    setCurrentRole(data[0]);
  }, [data]);

  useEffect(() => {
    setSelectedUsers([]);
  }, [data, currentRole]);

  function handleSelect(item) {
    const existingItem = selectedUsers.find((el) => el === item);
    if (existingItem) {
      setSelectedUsers((prev) => prev.filter((el) => el !== item));
    } else {
      setSelectedUsers((prev) => [...prev, item]);
    }
  }

  return (
    <div className="col-span-1 flex flex-col gap-3">
      <div className="font-medium flex justify-between items-center bg-gray-600 text-white p-2 rounded-md">
        Roles:{" "}
        <select
          className="focus:outline-none p-2 rounded-md border border-gray-700  w-1/2 text-black text-sm"
          onChange={(e) => setCurrentRole(data[e.target.value])}
        >
          {data.map((role, index) => (
            <option key={index} value={index}>
              {role.role}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white p-2 flex flex-col gap-1 flex-1 overflow-x-hidden overflow-y-auto">
        {currentRole.users.map((user, index) => (
          <UserItem
            key={index}
            user={user}
            selectedUsers={selectedUsers}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}

const UserItem = ({ user, selectedUsers, onSelect }) => {
  const state = () => {
    const exists = selectedUsers.find((el) => el === user);
    return exists ? true : false;
  };

  return (
    <div
      className="font-medium bg-neutral-100 p-1 rounded shadow flex gap-2 items-center cursor-pointer hover:bg-neutral-300 transition-all duration-300 ease-out"
      onClick={() => onSelect(user)}
    >
      <input
        type="checkbox"
        className="accent-gray-500"
        readOnly
        checked={state()}
      />
      {user}
    </div>
  );
};
