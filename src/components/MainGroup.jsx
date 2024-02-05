import Roles from "@/components/Roles";
import Route from "@/components/Route";
import Search from "@/components/Search";
import Button from "@/components/Button";
import Group from "@/components/Group";
import { groupData } from "@/data";

export default function MainGroup({
  expandedGroup,
  setExpandedGroup,
  groupNo,
}) {
  return (
    <div
      className={`flex flex-col gap-5 overflow-hidden border border-gray-700 bg-white p-2 transition-all duration-700 ${
        expandedGroup === groupNo ? "max-h-[200vh]" : "max-h-16 md:max-h-10"
      }`}
    >
      <Group
        item={groupData[0]}
        expandedGroup={expandedGroup}
        groupNo={groupNo}
        onClick={() => {
          setExpandedGroup((prev) => (prev === groupNo ? null : groupNo));
        }}
      />
      <div className="flex flex-col gap-7 bg-gray-200 p-2 flex-1">
        <Route />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 flex-1 min-h-[50vh]">
          <Roles />
          <Search />
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
