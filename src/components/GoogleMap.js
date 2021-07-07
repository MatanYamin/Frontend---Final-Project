import React, { Component } from 'react';
// import GetCoordinates from "./GetCoordinates"
import Geocode from "react-geocode";
import myAPI from "../GoogleApi";
import Modal from 'react-bootstrap/Modal'
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Button from 'react-bootstrap/Button'
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import PinDropIcon from '@material-ui/icons/PinDrop';
// const url = "http://127.0.0.1:5000/"
const url = "https://skycleanerapi.xyz/"


export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentLat: "",
      currentLng: "",
      nextLat: "",
      nextLng: "",
      coordinates: [],
      locationName: [],
      markers: [],
      cities: [],
      details: [],
      custName: "",
      custEmail: "",
      custPhone: "",
      custService: "",
      custDate: "",
      custTime: "",
      directionDistance: "",
      directionTime: "",
      indexOfLocation: 0,
      show: false,
      showDirections: false,
      modalTitle: "",
      modalBody: "",
      directionsButton: "זמני הגעה",
      currentLocationText: ""
    };
    this.getCoordinateFromLocation = this.getCoordinateFromLocation.bind(this);
}

async readAddresses() {
  // This function gets all bookings's addresses
  let response = await fetch(url + 'get/customers/address');
  let data = await response.json(); // for string
  return data
}

//this function handles click on the pin. it gets the coordinates and gives eta to destination as well.
handleClose = (e) => {
  if(e){
    this.setState({
      currentLat: e.mapCenter.lat,
      currentLng: e.mapCenter.lng,
      nextLat: e.position.lat,
      nextLng: e.position.lng
    })
    this.getLocations();
    // this.getDistanceOneToOne();
    this.state.details.forEach((data) => {
      if(data[4].includes(e.title)){
        this.setState({
          custName: data[1],
          custEmail: data[2],
          custPhone: data[3],
          custService: data[5],
          custDate: data[6],
          custTime: data[7]
        })
      }
    }
    );
    this.setState({
      show: !this.state.show,
      modalTitle: e.title,
      showDirections: false
    })
  }
}

handleOff = () => {
  this.setState({
    show: !this.state.show
  })
}



getLocations = () => {
  const Location1Str = this.state.currentLat + "," + this.state.currentLng;
  const Location2Str = this.state.nextLat + "," + this.state.nextLng;
  // var destinationB = new google.maps.LatLng(50.087692, 14.421150);
  // new window.google.setLanguage('iw')
  var service = new window.google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [Location1Str],
      destinations: [Location2Str],
      travelMode: 'DRIVING',
    }, this.callback);

}

 callback = (response, status) => {
   console.log(response)
  if (status === 'OK') {
    Geocode.fromLatLng(this.state.currentLat, this.state.currentLng, myAPI, "iw").then(
      (response) => {
        // every city is added to the state and later is marking the map
        this.setState({
          currentLocationText: response.results[[0]].formatted_address
        })
      },
      (error) => {
        console.error(error);
      }
    );
  let hours = Math.floor(response.rows[[0]].elements[[0]].duration.value / 3600);
  response.rows[[0]].elements[[0]].duration.value %= 3600;
  let minutes = Math.floor(response.rows[[0]].elements[[0]].duration.value / 60);
   this.setState({
    directionTime: hours + " שעות ו " + minutes + " דקות",
    directionDistance: (response.rows[[0]].elements[[0]].distance.value/1000).toFixed(1) + " ק''מ",
    currentLocationText: Geocode.fromLatLng(this.state.currentLat, this.state.currentLng, myAPI, "iw")
    })

}
 }


handleDirections = () => {
  this.setState({
    showDirections: !this.state.showDirections
  })
  if(this.state.showDirections){
    this.setState({
      directionsButton: "זמני הגעה"
    })
  }
  else{
    this.setState({
      directionsButton: "פרטי התור"
    })
  }
}

// this function gets coordinates of 2 places and returns the distance, the traffic time and current location.
async getDistanceOneToOne()
    {
       const Location1Str = this.state.currentLat + "," + this.state.currentLng;
       const Location2Str = this.state.nextLat + "," + this.state.nextLng;
       // using google api for "distancematrix" service
       let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";
       // sending the parameters to the api including return language (hebrew)
       let params = `origins=${Location1Str}&destinations=${Location2Str}&key=${myAPI}&language=${"iw"}`;
       let finalApiURL = `${ApiURL}${encodeURI(params)}`;
       let fetchResult = await fetch(finalApiURL); // call API
       let result = await fetchResult.json(); // extract json
       this.setState({
        directionTime: result.rows[[0]].elements[[0]].duration.text,
        directionDistance: result.rows[[0]].elements[[0]].distance.text,
        currentLocationText: result.origin_addresses
       })
    }

componentDidMount() {
  // when the component is opening, get all addresses to array
  this.readAddresses().then((data) => {
    this.setState({
        cities: data[0],
        details: data[1]
    });
    this.state.cities.map((address) => (
      this.getCoordinateFromLocation(address)
    ));
});
}

componentDidUpdate(prevProps, prevState){
  // when the coordinates change we will add a new pin on the map
  if (prevState.coordinates !== this.state.coordinates) {
    // this pushes all locations inside "markers" array or markers
      this.state.markers.push(
           <Marker
          //  onMouseOver
          onClick={(e) => this.handleClose(e)}
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
        <Modal show={this.state.show} onHide={this.handleOff}>
        <Modal.Header closeButton>
          <Modal.Title><HomeIcon style={{ verticalAlign: "sub" }} fontSize="large" /> {this.state.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!this.state.showDirections? <>
            <PersonIcon style={{ verticalAlign: "bottom" }} />&nbsp;{this.state.custName} <br/>
            <MailOutlineIcon style={{ verticalAlign: "bottom" }} />&nbsp;{this.state.custEmail} <br/>
            <PhoneIcon style={{ verticalAlign: "bottom" }} />&nbsp;{this.state.custPhone} <br/>
            <RoomServiceIcon style={{ verticalAlign: "bottom" }} />&nbsp;{this.state.custService} <br/>
            <EventAvailableIcon style={{ verticalAlign: "bottom" }} />&nbsp;{this.state.custDate} <br/>
            <QueryBuilderIcon style={{ verticalAlign: "bottom" }} />&nbsp;{this.state.custTime} 
            </>
             : 
             <>
             <PinDropIcon style={{ verticalAlign: "bottom" }} />
             מיקום נוכחי: 
             &nbsp;
             {this.state.currentLocationText}
             <br/><br/>
             <QueryBuilderIcon style={{ verticalAlign: "bottom" }} />
             מרחק למיקום: 
             &nbsp;{this.state.directionDistance}
             <br/><br/>
             <DirectionsCarIcon style={{ verticalAlign: "bottom" }}  />
             זמן משוער: 
             &nbsp;{this.state.directionTime}

          </>}
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btnModal btn-secondary" onClick={this.handleOff}>
            סגור
          </Button>
          <Button variant="btnModal btn-primary" onClick={this.handleDirections}>
            {this.state.directionsButton}
          </Button>
        </Modal.Footer>
      </Modal>
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