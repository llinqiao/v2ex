import React, { Component } from "react";
import { Link } from "react-router-dom";
import Request from "../common/request";
import Loading from "../Loading";


import "./index.scss"

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      detail: {
        title: ""
      },
      replay: []
    };
  }

  componentDidMount() {
    Request(`/api/topics/show.json?id=${this.props.match.params.id}`).then(
      myJson => {
        this.setState({
          detail: myJson[0],
          loading: false
        });
        console.log(this.state.detail.member.avatar_normal);
      }
    );
    // .catch(err => {
    //   // 处理 err
    // });

    Request(
      `/api/replies/show.json?topic_id=${this.props.match.params.id}`
    ).then(myJson => {
      this.setState({
        replay: myJson
      });
    });
  }

  render() {
    return (
      <div className="detail-loading">
        {this.state.loading ? (
          <Loading />
        ) : (
          <div className="detail-header">
            <div className="detail-headerContent">
              <h1>{<div>{this.state.detail.title}</div>}</h1>
              {this.state.loading ? null : (
                <div className="detail-avatar">
                  <Link to={`/member/${this.state.detail.member.username}`}>
                    <img
                      className="avatar_normal"
                      src={this.state.detail.member.avatar_normal}
                    />
                  </Link>
                </div>
              )}
            </div>
            <div className="detail-content">{this.state.detail.content}</div>
            <div>
              {this.state.loading
                ? null
                : this.state.replay.map(item => {
                    return (
                      <div className="post" key={item.id}>
                        <Link to={`/member/${item.member.username}`}>
                          <img
                            className="avatar_normal"
                            src={item.member.avatar_normal}
                          />
                        </Link>
                        <div className="post-text">
                          <div className="post-title replay-username">
                            {item.member.username}
                          </div>
                          <div className="post-nodeTitle time">
                            {new Date(new Date() - item.created).getHours()}
                            个小时
                            {new Date(new Date() - item.created).getMinutes()}
                            分钟前
                          </div>
                          <div className="post-username">{item.content}</div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Detail;
