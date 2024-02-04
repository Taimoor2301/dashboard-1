import React from "react";

export default function SelectButton({ groupData, setCurrentGroup }) {
  return (
    <select
      className="px-2 py-1 focus:outline-none border border-gray-600 rounded-md"
      onChange={(e) => setCurrentGroup(groupData[e.target.value])}
    >
      {groupData.map((group, index) => (
        <option key={group.groupName} value={index}>
          {group.groupName}
        </option>
      ))}
    </select>
  );
}
