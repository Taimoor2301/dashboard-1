"use client";
import React, { useEffect, useState } from "react";

export default function Search({ data }) {
  const [searchText, setSearchText] = useState("");
  const [currentData, setCurrentData] = useState(data);

  useEffect(() => {
    if (!searchText) {
      setCurrentData(data);
    } else {
      setCurrentData(data.filter((item) => item.includes(searchText)));
    }
  }, [searchText]);
  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  return (
    <div className="col-span-1 flex flex-col gap-3">
      <div className="flex items-center md:gap-10 gap-2 flex-wrap justify-between font-medium bg-gray-600 p-2 rounded-md text-white">
        Search:
        <input
          className="text-black p-1.5 flex-1 rounded-md focus:outline-none"
          type="text"
          placeholder="search a question"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="bg-white p-2 flex flex-col gap-1 font-medium capitalize flex-1 overflow-x-hidden overflow-y-auto">
        {currentData.length > 0 ? (
          currentData.map((question) => (
            <div className="bg-neutral-100 p-1 rounded" key={question}>
              {question}
            </div>
          ))
        ) : (
          <div className="py-2 text-center">No match</div>
        )}
      </div>
    </div>
  );
}
