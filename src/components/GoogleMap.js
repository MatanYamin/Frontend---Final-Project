import React, { Component } from 'react';
// import GetCoordinates from "./GetCoordinates"
import Geocode from "react-geocode";
import myAPI from "../GoogleApi"

// import { Map, GoogleApiWrapper } from 'google-maps-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { RiContrastDropLine } from 'react-icons/ri';

export class MapContainer extends Component {


  // check =()=> {
  //   Geocode.setApiKey(myAPI);
  //   Geocode.fromAddress("Eiffel Tower").then(
  //     (response) => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       console.log(lat, lng);
  //       RiContrastDropLine.log("works?")
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  render() {
      return (
        <>
        {/* {this.check()} */}
        {/* <GetCoordinates /> */}
        <Map google={this.props.google} zoom={11} initialCenter={{ lat: 32.070940, lng: 34.822880}}>
   
   <Marker 
  //  position={this.matan()}
  //  position={Geocode.fromAddress("hanayadot 27")}
  //  position={{ lat: 31.826170, lng: 35.241640}}
  // position={lat, lng}
    />
   
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                {/* <h1>{this.state.selectedPlace.name}</h1> */}
                <h1>Matan Yamin</h1>
              </div>
          </InfoWindow>
        </Map>
  </>
      );
    }
  }
   
  export default GoogleApiWrapper({
    apiKey: myAPI
  })(MapContainer)