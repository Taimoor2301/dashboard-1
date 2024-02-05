import apiInstance from "@/utils/useAxios";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function Roles() {
  const [currentRoleId, setCurrentRoleId] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userList, setUserList] = useState([]);

  const api = apiInstance;

  const {
    data: roles,
    isLoading: rolesLoading,
    isError: rolesError,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: () => api.get("/roles/roles.getlistofrolesasync"),
  });

  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["allusers"],
    queryFn: () => api.get("/users/users.getlistofallusersasync"),
  });

  useEffect(() => {
    setCurrentRoleId(roles?.data?.data[0].id);
  }, [roles]);

  useEffect(() => {
    if (currentRoleId) {
      setUserList(
        users?.data?.data.filter(
          (user) => user.roles[0].roleId === currentRoleId
        )
      );
    }
  }, [currentRoleId]);

  function handleSelect(item) {
    const existingItem = selectedUsers.find((el) => el.id === item.id);
    if (existingItem) {
      setSelectedUsers((prev) => prev.filter((el) => el.id !== item.id));
    } else {
      setSelectedUsers((prev) => [...prev, item]);
    }
  }

  return (
    <div className="col-span-1 flex flex-col gap-3">
      <div className="font-medium flex justify-between items-center bg-gray-600 text-white p-2 rounded-md">
        Roles:
        {rolesLoading ? (
          <Spinner />
        ) : rolesError ? (
          "Error fetching role"
        ) : (
          <select
            className="focus:outline-none p-2 rounded-md border border-gray-700  w-1/2 text-black text-sm"
            onChange={(e) => {
              setCurrentRoleId(e.target.value);
            }}
          >
            {roles?.data?.data?.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="bg-white p-2 flex flex-col gap-1 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="flex p-2 gap-6 flex-wrap font-medium text-xs">
          {selectedUsers.length > 0 && (
            <span className="text-xs font-medium"> Selected:</span>
          )}
          {selectedUsers.map((user) => (
            <span
              className="p-2 bg-gray-300 rounded-lg relative group:"
              key={user.id}
            >
              {user.firstName}
              <img
                src="/close.svg"
                alt="remove"
                className="w-6 absolute top-[-7px] right-[-15px] group-hover:opacity-100"
                onClick={() => handleSelect(user)}
              />
            </span>
          ))}
        </div>
        {userList?.length > 0 ? (
          userList.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              selectedUsers={selectedUsers}
              onSelect={handleSelect}
            />
          ))
        ) : (
          <div className="font-medium w-full text-center pt-5">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}

const UserItem = ({ user, selectedUsers, onSelect }) => {
  const state = () => {
    const exists = selectedUsers.find((el) => el.id === user.id);
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
      {user.firstName}
    </div>
  );
};
