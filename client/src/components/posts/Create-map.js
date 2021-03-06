import React, { useState, useEffect } from "react";
import ReactMapGl, { Popup } from "react-map-gl";
import "../../App.css";
import { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import PostForm from "./PostForm";

const CreateMap = (props) => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "50vh",
    // latitude: props.latitude,
    // longitude: props.longitude + 4,
    latitude: 31.681995,
    longitude: 120.3034471,
    zoom: 1,
  });
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude: latitude,
      longitude: longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapStyle="mapbox://styles/nazmus-a/ckaezkycl1tl91imt9d78haxp"
      mapboxApiAccessToken={
        process.env.REACT_APP_MAPBOX_TOKEN ||
        "pk.eyJ1IjoibmF6bXVzLWEiLCJhIjoiY2s5cDRocG5wMDZpeTNvcjFkMnQ2MmFrayJ9.u5jhbDKNZKvZy0I-Gitaaw"
      }
      onDblClick={showAddMarkerPopup}
    >
      {
        //if addEntryLocation present
        addEntryLocation ? (
          <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
            >
              <div>
                <svg
                  className="marker-on-click"
                  style={{
                    width: `calc(1vmin * ${viewport.zoom})`,
                    height: `calc(1vmin * ${viewport.zoom})`,
                  }}
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              anchor="top"
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
            >
              <div className="popup">
                <PostForm
                  onClose={() => {
                    window.location.reload();
                    setAddEntryLocation(null);
                    // getEntries();
                  }}
                  location={addEntryLocation}
                />
              </div>
            </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
};

export default CreateMap;
