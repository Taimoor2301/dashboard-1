import React from "react";

export default function Group({ item, onClick, expandedGroup, groupNo }) {
  return (
    <div
      onClick={() => onClick()}
      className="flex cursor-pointer flex-1 flex-wrap justify-between items-center"
      key={item.groupName}
    >
      <span>Group Name: {item.groupName}</span>
      <span>Total Users: {item.totalUsers}</span>
      <span>Total Sites: {item.totalSites}</span>
      <span>Total Questions: {item.totalQuestions}</span>
      <span
        className={`${
          expandedGroup === groupNo && "rotate-180"
        } transition-all duration-500`}
      >
        <img src="/chevron.svg" className="w-5" alt="icon" />
      </span>
    </div>
  );
}
