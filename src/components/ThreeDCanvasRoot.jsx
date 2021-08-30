import React, {Component} from "react";
import ThreeDCanvas from "../containers/ThreeDCanvas";
export default class ThreeDCanvasRoot extends Component{
    render(){
      return (
        <div>
          <h1>Bohyemian Walk-Songline</h1>
          <ThreeDCanvas></ThreeDCanvas>
        </div>
      )
    }
  }