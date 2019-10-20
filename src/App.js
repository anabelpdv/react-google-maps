//import React, { useState }from 'react';
import React, { Component } from 'react'

import './App.css';
import Map from './components/Map'


class App extends Component {

 loadScript = (url)=>{
    let index = window.document.getElementsByTagName('script')[0];
    let script = window.document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script,index);
  }
  

  render() {
    return (
      <div>

      <Map loadScript={this.loadScript} ></Map>
      </div>
    )
  }
}


export default App;

