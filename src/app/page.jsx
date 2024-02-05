"use client";

import MainGroup from "@/components/MainGroup";

import { useState } from "react";
export default function Home() {
  const [expandedGroup, setExpandedGroup] = useState(0);

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col gap-3 p-5">
      <MainGroup
        expandedGroup={expandedGroup}
        setExpandedGroup={setExpandedGroup}
        groupNo={0}
      />
      <MainGroup
        expandedGroup={expandedGroup}
        setExpandedGroup={setExpandedGroup}
        groupNo={1}
      />
      <MainGroup
        expandedGroup={expandedGroup}
        setExpandedGroup={setExpandedGroup}
        groupNo={2}
      />
    </div>
  );
}
