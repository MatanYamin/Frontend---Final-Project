import React, { Component } from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
    render() {
      return (
        <Map google={this.props.google} zoom={14}>
   
          <Marker onClick={this.onMarkerClick}
                  name={'Jerusalem'} />
   
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                {/* <h1>{this.state.selectedPlace.name}</h1> */}
                {/* <h1>Matan Yamin</h1> */}
              </div>
          </InfoWindow>
        </Map>
      );
    }
  }
   
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyAiGkubS17E5pQVXBGxsrFmZ0X8ioQisK0'
  })(MapContainer)