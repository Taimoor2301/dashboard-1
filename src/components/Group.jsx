import React from "react";

export default function Group({ item }) {
  return (
    <div
      className="flex flex-1 flex-wrap justify-between items-center"
      key={item.groupName}
    >
      <span>Group Name: {item.groupName}</span>
      <span>Total Users: {item.totalUsers}</span>
      <span>Total Sites: {item.totalSites}</span>
      <span>Total Questions: {item.totalQuestions}</span>
    </div>
  );
}
