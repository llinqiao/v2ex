import React, { Component } from "react";
import Loading from "./Loading";
import Request from "./common/request";

class Information extends Component {
  constructor() {
    super();
    this.state = {
      member: [],
      loading: true
    };
  }

  componentDidMount() {
    // fetch(`/api/members/show.json?username=${this.props.match.params.id}`) //通过父组件的Route拿到this.props，里面有三个属性
    //   .then(response => {
    //     return response.json();
    //   })
    Request(
      `/api/members/show.json?username=${this.props.match.params.id}`
    ).then(myJson => {
      console.log(myJson);
      this.setState({
        member: myJson,
        loading: false
      });
    }); //fetch返回一个pomise，会调用then方法拿到一个json格式的数据，之后的then会就收到json数据作为参数变成了一个对象格式
  }
  render() {
    return (
      <div className="nav-wrapper">
        {this.state.loading ? (
          <Loading />
        ) : (
          <div className="post">
            <img
              className="avatar_normal information-avatar"
              src={this.state.member.avatar_normal}
            />
            <div className="post-text">
              <h1>{this.state.member.username}</h1>
              <div className="information-text">
                V2EX 第{this.state.member.id} 号会员，加入于2017-06-14 00:01:51
                +08:00
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Information;
