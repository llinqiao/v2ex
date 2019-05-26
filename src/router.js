import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Home";
import Detail from "./detail";
import Information from "./Information";

const BasicExample = props => (
  <Router>
    <div className="top-wrapper">
      <div className="top">
        <div id="logo" />
        <ul className="topList">
          <li>
            <Link to="/">首页</Link>
          </li>
          {/* <li>
            <Link to="/registered">注册</Link>
          </li>
          <li>
            <Link to="/login">登录</Link>
          </li> */}
        </ul>
      </div>
    </div>

    <div className="wrapper">
      <div className="sep">
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/registered" component={Registered} />
          <Route path="/login" component={Login} />
          <Route path="/t/:id" component={Detail} />
          <Route path="/member/:id" component={Information} />
        </div>
      </div>
    </div>
  </Router>
);

// const Detail = ({ match }) => {
// return <div>{match.params.id}</div>
// }

const Registered = () => (
  <div>
    <h2>registered</h2>
  </div>
);

const Login = () => (
  <div>
    <h2>login</h2>
  </div>
);
export default BasicExample;
