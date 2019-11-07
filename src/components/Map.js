import React,{useState} from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyles from "../mapStyles";
import  parksData from "../data/skateboard-parks.js";


function Map() {
  const [selectedPark, setSelectedPark] = useState(null);
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
      defaultOptions={{ styles: mapStyles, disableDoubleClickZoom: true }}
      onDblClick={(e)=>console.log('This is the event', e.latLng.lat())}
    >
    {parksData.map(park=>(
    <Marker 
      key={park.properties.PARK_ID}
      position = {{ 
        lat: park.geometry.coordinates[1],
        lng: park.geometry.coordinates[0] }}
        onClick={()=>{
          setSelectedPark(park);
        }}
    /> 
    ))}
  {selectedPark && (
      <InfoWindow
        position = {{ 
          lat: selectedPark.geometry.coordinates[1],
          lng: selectedPark.geometry.coordinates[0] }}
          onCloseClick={()=>{
          setSelectedPark(null);
        }}
        >
        <div>
          <h1>{selectedPark.properties.NAME}</h1>
          <h4>{selectedPark.properties.NAME}</h4>

        </div>
        </InfoWindow>
    )} 
   
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default MapWrapped;