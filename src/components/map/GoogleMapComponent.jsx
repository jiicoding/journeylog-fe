import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";

const InnerGoogleMapComponent = withScriptjs(
  withGoogleMap((innerProps) => (
    <GoogleMap defaultZoom={1} defaultCenter={{ lat: 0, lng: 0 }}>
      {innerProps.children}
    </GoogleMap>
  ))
);

// noinspection JSUnresolvedVariable
export const GoogleMapComponent = (props) => (
  <InnerGoogleMapComponent
    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.33&key=${
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100%` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    {...props}
  />
);