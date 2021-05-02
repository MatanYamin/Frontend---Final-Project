import React, { Component } from 'react';
// import GetCoordinates from "./GetCoordinates"
import Geocode from "react-geocode";
import myAPI from "../GoogleApi"
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const url = "http://127.0.0.1:5000/"
// const url = "https://skycleanerapi.xyz/"


export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      coordinates: [],
      locationName: [],
      markers: [],
      cities: [],
      indexOfLocation: 0
    };
    this.getCoordinateFromLocation = this.getCoordinateFromLocation.bind(this);
}

async readAddresses() {
  // This function gets all bookings's addresses
  let response = await fetch(url + 'get/customers/address');
  let data = await response.json(); // for string
  return data
}

componentDidMount() {
  // when the component is opening, get all addresses to array
  this.readAddresses().then((data) => {
    this.setState({
        cities: data
    });
    this.state.cities.map((address) => (
      this.getCoordinateFromLocation(address)
    ));
});
}

componentDidUpdate(prevProps, prevState){
  if (prevState.coordinates !== this.state.coordinates) {
      this.state.markers.push(
           <Marker 
          title={this.state.locationName[0]}
          position={{ lat:this.state.coordinates[this.state.indexOfLocation]["lat"], lng: this.state.coordinates[this.state.indexOfLocation]["lng"]}}
          label={this.state.locationName[0]}
            />
      );
      this.setState({
        indexOfLocation: this.state.indexOfLocation+1
      });
    }
}

  getCoordinateFromLocation = (input) => {
    // Using on my api for the service
    Geocode.setApiKey(myAPI);
    // setting lang as hebrew
    Geocode.setLanguage("iw");
    // gets the coordinate from the string address
    Geocode.fromAddress(input).then(
      (response) => {
        // every city is added to the state and later is marking the map
        this.setState({
          coordinates: this.state.coordinates.concat(response.results[0].geometry.location),
          locationName: input
        })
      },
      (error) => {
        console.error(error);
      }
    );
  }

  render() {
      return (
        <>
        {/* <div className="map-title">
          כאן תוכלו לראות את כל התורים העתידיים על גבי המפה
          </div> */}
    <Map google={this.props.google} zoom={9} centerAroundCurrentLocation>
     {this.state.markers}
          <InfoWindow onClose={this.onInfoWindowClose} visible={true}>
          </InfoWindow>
        </Map>
  </>
      );
    }
  }
   
  export default GoogleApiWrapper({
    apiKey: myAPI
  })(MapContainer)