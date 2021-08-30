import React, {Component} from 'react';
import './App.css';
import AddNumberRoot from "./components/AddNumberRoot";
import DisplayNumberRoot from "./components/DisplayNumberRoot";
import ThreeDCanvasRoot from "./components/ThreeDCanvasRoot";
import LinesRoot from "./components/LinesRoot";

class App extends Component {
  state = {number:0}
  render(){
    return (
      <div className="App">
        {/* <h1>Root</h1> */}
        {/* <AddNumberRoot></AddNumberRoot> */}
        {/* <DisplayNumberRoot></DisplayNumberRoot> */}
        {/* <ThreeDCanvasRoot></ThreeDCanvasRoot> */}
        <LinesRoot></LinesRoot>
      </div>
    );  
  }
}

export default App;
