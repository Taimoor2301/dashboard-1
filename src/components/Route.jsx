import React, { useEffect, useState } from "react";
import Map from "./Map";

export default function Route({ data }) {
  const [currentRoute, setCurrentRoute] = useState(data[0]);
  const [selectedSite, setSelectedSite] = useState([]);
  useEffect(() => {
    setCurrentRoute(data[0]);
  }, [data]);

  useEffect(() => {
    setSelectedSite([]);
  }, [data, currentRoute]);

  function handleSelect(item) {
    const existingItem = selectedSite.find((el) => el.name === item.name);
    if (existingItem) {
      setSelectedSite((prev) => prev.filter((el) => el.name !== item.name));
    } else {
      setSelectedSite((prev) => [...prev, item]);
    }
  }

  return (
    <div className="flex min-h-44 gap-6 flex-col md:flex-row">
      <div className="flex flex-col grow-[1] gap-2">
        <div className="bg-gray-600 p-2 flex justify-between items-center rounded-md text-white">
          Route:{" "}
          <select
            className="text-black text-sm rounded-md focus:outline-none p-2 w-1/2"
            onChange={(e) => setCurrentRoute(data[e.target.value])}
          >
            {data.map((route, index) => (
              <option value={index} key={index}>
                {route.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 bg-white p-2 shadow rounded-md flex-1 overflow-y-auto">
          {currentRoute.sitesList.map((site) => (
            <SiteItem
              key={site.name}
              site={site}
              selectedSite={selectedSite}
              handleSelect={handleSelect}
            />
          ))}
        </div>
      </div>
      <div className="grow-[2] min-h-[40vh] overflow-hidden bg-white rounded-xl shadow flex justify-center items-center">
        {selectedSite.length > 0 ? (
          <Map sites={selectedSite} />
        ) : (
          "Choose a location"
        )}
      </div>
    </div>
  );
}

const SiteItem = ({ site, selectedSite, handleSelect }) => {
  const state = () => {
    const exists = selectedSite.find((el) => el.name === site.name);
    return exists ? true : false;
  };
  return (
    <div
      key={site.name}
      onClick={() => handleSelect(site)}
      className="cursor-pointer bg-neutral-100 rounded p-1 shadow gap-2 flex items-center hover:bg-neutral-300 transition-all duration-300 ease-out"
    >
      <input
        type="checkbox"
        className="accent-gray-500"
        readOnly
        checked={state()}
      />
      {site.name}
    </div>
  );
};
