"use client";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import MarkerIcon from "leaflet/dist/images/marker-icon.png";
import MarkerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

export default function Map({ sites }) {
  const [center, setCenter] = useState([sites[0].lat, sites[0].lon]);
  const [locationList, setLocationList] = useState(
    sites.map((site) => [site.lat, site.lon])
  );

  useEffect(() => {
    setLocationList(sites.map((site) => [site.lat, site.lon]));
  }, [sites]);

  return (
    <div className="h-full w-full">
      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={center}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locationList.map((list, i) => (
          <Marker
            key={i}
            icon={
              new L.Icon({
                iconUrl: MarkerIcon.src,
                iconRetinaUrl: MarkerIcon.src,
                iconSize: [25, 41],
                iconAnchor: [12.5, 41],
                popupAnchor: MarkerShadow.src,
                shadowSize: [41, 41],
              })
            }
            position={[...list]}
          ></Marker>
        ))}
      </MapContainer>
    </div>
  );
}
