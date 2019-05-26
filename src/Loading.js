import React, { Component } from "react";
import loading from "./common/images/loading-out.png";
class Loading extends Component {
  render() {
    return (
      <div className="loading-background">
        <img className="loading" src={loading} />
      </div>
    );
  }
}
export default Loading;
