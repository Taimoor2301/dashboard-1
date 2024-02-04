"use client";
import React, { useEffect, useState } from "react";

export default function Search({ data }) {
  const [searchText, setSearchText] = useState("");
  const [currentData, setCurrentData] = useState(data);

  const [seleted, setSelected] = useState([]);

  const handelSelect = (question) => {
    const existing = seleted.find((q) => q === question);
    if (!existing) {
      setSelected((prev) => [...prev, question]);
    } else {
      setSelected((prev) => prev.filter((q) => q !== question));
    }
  };

  useEffect(() => {
    if (!searchText) {
      setCurrentData(data);
    } else {
      setCurrentData(data.filter((item) => item.includes(searchText)));
    }
  }, [searchText]);
  useEffect(() => {
    setCurrentData(data);
    setSelected([]);
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
            <Question
              key={question}
              question={question}
              handelSelect={handelSelect}
              seleted={seleted}
            />
          ))
        ) : (
          <div className="py-2 text-center">No match</div>
        )}
      </div>
    </div>
  );
}

const Question = ({ question, handelSelect, seleted }) => {
  function status() {
    const exist = seleted.find((i) => i === question);
    return exist ? true : false;
  }
  return (
    <div
      className="bg-neutral-100 p-1 rounded flex items-center gap-2 cursor-pointer"
      onClick={() => handelSelect(question)}
      key={question}
    >
      <input
        type="checkbox"
        className="accent-gray-500"
        readOnly
        checked={status()}
      />
      {question}
    </div>
  );
};
