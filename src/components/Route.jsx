import React, { useEffect, useState } from "react";
import Map from "./Map";
import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/utils/useAxios";
import Spinner from "./Spinner";

export default function Route() {
  const [currentRouteId, setCurrentRouteId] = useState();
  const [selectedSite, setSelectedSite] = useState([]);
  const [currentSites, setCurrentSites] = useState([]);

  const {
    data: routes,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["routes"],
    queryFn: () => apiInstance.get("/routes/route.getallrouteasync"),
  });

  const {
    data: sites,
    isError: siteError,
    isLoading: siteLoading,
  } = useQuery({
    queryKey: ["sites"],
    queryFn: () => apiInstance.get("/sites/sites.getallsitesasync"),
  });

  useEffect(() => {
    setCurrentRouteId(routes?.data?.data?.data[0].id);
  }, [routes]);

  useEffect(() => {
    setCurrentSites(
      sites?.data?.data?.data.filter((site) => site.route.id === currentRouteId)
    );
  }, [currentRouteId]);

  function handleSelect(item) {
    const existingItem = selectedSite.find((el) => el.id === item.id);
    if (existingItem) {
      setSelectedSite((prev) => prev.filter((el) => el.id !== item.id));
    } else {
      setSelectedSite((prev) => [...prev, item]);
    }
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 min-h-44 gap-6 flex-col md:flex-row">
      <div className="flex flex-col col-span-2 lg:col-span-1 gap-2 min-h-44">
        <div className="bg-gray-600 p-2 flex justify-between items-center rounded-md text-white">
          Route:
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <div>Error fetching routes</div>
          ) : (
            <select
              className="text-black text-sm rounded-md focus:outline-none p-2 w-1/2"
              onChange={(e) => setCurrentRouteId(e.target.value)}
            >
              {routes?.data?.data?.data.map((route) => (
                <option value={route.id} key={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex flex-col gap-2 bg-white p-2 shadow rounded-md flex-1 overflow-y-auto">
          <div className="flex gap-6 flex-wrap">
            {selectedSite.length > 0 && (
              <span className="text-xs font-medium"> Selected:</span>
            )}
            {selectedSite.map((site) => (
              <span
                className="bg-gray-300 p-2 rounded-md relative group text-xs font-medium"
                key={site.id}
              >
                {" "}
                <img
                  src="/close.svg"
                  alt="remove"
                  onClick={() => handleSelect(site)}
                  className="w-6 absolute top-[-7px] right-[-15px]"
                />
                {site.name}
              </span>
            ))}
          </div>
          {currentSites?.map((site) => (
            <SiteItem
              key={site.id}
              site={site}
              selectedSite={selectedSite}
              handleSelect={handleSelect}
            />
          ))}
        </div>
      </div>
      <div className="col-span-2 min-h-[40vh] overflow-hidden bg-white rounded-xl shadow flex justify-center items-center">
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
    const exists = selectedSite.find((el) => el.id === site.id);
    return exists ? true : false;
  };
  return (
    <div
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
