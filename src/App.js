import React, { useState }from 'react';
import mapStyle from './mapStyles';
import './App.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';


let center;
if (navigator.geolocation) {

  // Get current position
  // The permissions dialog will pop up
  navigator.geolocation.getCurrentPosition(function (position) {
    // Create an object to match Google's Lat-Lng object format
    center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log('center: ', center)
    // User granted permission
    // Center the map in the position we got
  }, function () {
    // If something goes wrong
    console.log('Error in the geolocation service.');
  });
} else {
  // Browser says: Nah! I do not support this.
  console.log('Browser does not support geolocation.');
}


function Map(){

  const [selectedPark, setSelectedPark] = useState(null);
  return(
    <GoogleMap 
          defaultZoom={10} 
          defaultCenter={{lat:center.lat,lng:center.lng}}
          defaultOptions={{styles:mapStyle}}
          onClick={(e)=>{
            const position = {
              lat:e.latLng.lat(),
              lng:e.latLng.lng()
            }

            console.log(position)
  
          }}
          >
          <Marker  
                position={{lat:45.4215, lng:-75.6972 }}
                onClick={()=>{
                  setSelectedPark({lat:45.4215, lng:-75.6972 })
                }}
                icon={{
                  url:'data:image/png;base64,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',
                  scaledSize: new window.google.maps.Size(25,25)
                }}
                /> 
  if{selectedPark && (
      <InfoWindow 
      position={{
            lat:selectedPark.lat, 
            lng:selectedPark.lng
            }}
      onCloseClick= {()=>{
        setSelectedPark(null);
      }}     
            >
        <div>
          <h2>Park Details</h2>
        </div>
      </InfoWindow>
  )}
    </GoogleMap>
  )
}


const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {
  return (
    <div style={{width:"100wh", height:"100vh"}}>
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`} 
                  loadingElement={<div style={{height: '100%'}} />} 
                  containerElement={<div style={{height: '100%'}} />} 
                  mapElement={<div style={{height: '100%'}} />} />
    </div>
  );
}

export default App;
