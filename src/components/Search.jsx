"use client";
import apiInstance from "@/utils/useAxios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useQuery } from "@tanstack/react-query";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [seleted, setSelected] = useState([]);
  const api = apiInstance;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["questions"],
    queryFn: () =>
      api.get("/questionnaire/questionnaire.getallquestionnaireasync"),
  });

  useEffect(() => {
    if (data) {
      setQuestions(data?.data?.data?.data);
      setCurrentData(data?.data?.data?.data);
    }
  }, [data]);

  const handelSelect = (question) => {
    const existing = seleted.find((q) => q.id === question.id);
    if (!existing) {
      setSelected((prev) => [...prev, question]);
    } else {
      setSelected((prev) => prev.filter((q) => q.id !== question.id));
    }
  };

  useEffect(() => {
    setCurrentData(questions.filter((item) => item.name.includes(searchText)));
  }, [searchText]);

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

      <div className="bg-white p-2 flex max-h-[40vh] flex-col gap-1 font-medium capitalize flex-1 overflow-x-hidden overflow-y-auto">
        {isLoading ? (
          <div className="w-full h-full grid place-content-center">
            <Spinner />
          </div>
        ) : isError ? (
          <div className="h-full w-full grid place-content-center">
            Something went wrong
          </div>
        ) : currentData?.length > 0 ? (
          currentData.map((question) => (
            <Question
              key={question.id}
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
    const exist = seleted.find((i) => i.id === question.id);
    return exist ? true : false;
  }
  return (
    <div
      className="bg-neutral-100 p-1 rounded flex items-center gap-2 cursor-pointer"
      onClick={() => handelSelect(question)}
    >
      <input
        type="checkbox"
        className="accent-gray-500"
        readOnly
        checked={status()}
      />
      {question.name}
    </div>
  );
};
