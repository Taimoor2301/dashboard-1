"use client";
import Button from "@/components/Button";
import Group from "@/components/Group";
import Roles from "@/components/Roles";
import Route from "@/components/Route";
import Search from "@/components/Search";
import SelectButton from "@/components/SelectButton";
import { groupData } from "@/data";
import { useState } from "react";
export default function Home() {
  const [currentGroup, setCurrentGroup] = useState(groupData[0]);

  return (
    <div className="bg-gray-100 min-h-screen w-full flex flex-col gap-3 p-5">
      <div className="flex items-center w-full justify-between gap-5 bg-white p-2 text-sm font-medium">
        <Group item={currentGroup} />
        <SelectButton groupData={groupData} setCurrentGroup={setCurrentGroup} />
      </div>

      <div className="flex flex-col gap-7 border-2 border-gray-500 p-2 flex-1">
        <Route data={currentGroup.routes} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 flex-1">
          <Roles data={currentGroup.roles} />
          <Search data={currentGroup.questions} />
        </div>

        <div className="flex justify-center items-center py-4 px-2 gap-5">
          <Button text="Update" color="bg-gray-800" whenClick={() => null} />
          <Button text="Delete" color="bg-red-500" whenClick={() => null} />
          <Button text="Cancel" color="bg-gray-800" whenClick={() => null} />
        </div>
      </div>
    </div>
  );
}
