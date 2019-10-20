import React, { Component } from 'react'
import mapStyle from '../mapStyles';

export default class Map extends Component {

  constructor(props){
    super(props)
    this.state = {
      map:'',
      markers: [],
    }
  }
/*****************************************/
  componentDidMount(){
    this.renderMap();
  }
/*****************************************/
  renderMap=()=>{
    this.props.loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap`);
    window.initMap = this.initMap;
  }
/*****************************************/
  addMarker = (location,info) => {
    var marker = new window.google.maps.Marker({
      position: location,
      map: this.state.map
    });
    let infowindow = new window.google.maps.InfoWindow({
      content: `<div> <button>Submit</button>${info}</div>`
    })
    marker.addListener('mouseover',function(){
      infowindow.open(this.map,marker);
    })

    marker.addListener('mouseout',function(){
      infowindow.close();
    })

    let markersCopy = [...this.state.markers] 

    markersCopy.push(marker);

    this.setState({
      markers:markersCopy
    })
  
  }
/*****************************************/
  initMap = () =>  {
    var myLatlng = {lat:26.6406,lng:-81.8723}
      let map = new window.google.maps.Map(document.getElementById('map'), {
        center: myLatlng,
        zoom: 8,
        styles: mapStyle,
        disableDoubleClickZoom: true,
      });
      this.setState({
        map:map,
      })

      map.addListener('dblclick', (event)=> {
        this.addMarker(event.latLng,'this is a test');
      });

      // let marker = new window.google.maps.Marker({
      //   position:myLatlng,
      //   map:map,
      //   title:'Hello World'
      // });

      // let infowindow = new window.google.maps.InfoWindow({
      //   content: "<div>Test</div>"
      // })
      // marker.addListener('mouseover',function(){
      //   infowindow.open(map,marker);
      // })
      // marker.setMap(map);
    }
/*********************************************************************/


setMapOnAll = (map) => {
  for (var i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(map);
  }
}


showMarkers = () => {
  this.setMapOnAll(this.state.map);
}









  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    )
  }
}


