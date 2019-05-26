import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import Request from "./common/request";

function openInNewTab(url) {
  var win = window.open(url, "_blank");
  win.focus();
}

const TOPIC_CONFIG = {
  latest: {
    name: "全部",
    url: "/api/topics/latest.json"
  },
  hot: {
    name: "最热",
    url: "/api/topics/hot.json"
  },
  apple: {
    name: "Apple",
    url: "/api/topics/show.json?node_name=apple"
  },
  tech: {
    name: "技术",
    url: "/api/topics/show.json?node_name=tech"
  },
  jobs: {
    name: "酷工作",
    url: "/api/topics/show.json?node_name=jobs"
  },
  play: {
    name: "好玩",
    url: "/api/topics/show.json?node_name=play"
  },
  qna: {
    name: "问与答",
    url: "/api/topics/show.json?node_name=qna"
  },
  deals: {
    name: "交易",
    url: "/api/topics/show.json?node_name=deals"
  }
};

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      topic: "latest",
      posts: []
    };
  }

  switchTopic = topic => {
    this.setState({
      loading: true,
      topic
    });
    this.fetchPostList(TOPIC_CONFIG[topic].url);
  };

  fetchPostList = url => {
    Request(url).then(myJson => {
      this.setState({
        loading: false,
        posts: myJson
      });
    });
  };

  componentDidMount() {
    this.switchTopic("latest");
  }

  render() {
    return (
      <div className="nav-wrapper">
        <div className="nav">
          {Object.keys(TOPIC_CONFIG).map(key => {
            //把对象的所有属性变成一个数组
            return (
              <div
                className="item"
                style={
                  this.state.topic === key
                    ? { backgroundColor: "#334", color: "white" }
                    : null
                }
                onClick={() => this.switchTopic(key)}
              >
                {TOPIC_CONFIG[key].name}
              </div>
            );
          })}
          {/* <div className="item" style={this.state.topic === "latest" ? {backgroundColor: "red"}: null} onClick={() =>  this.switchTopic("latest")}>
            全部
          </div>
          <div className="item" style={this.state.topic === "hot" ? {backgroundColor: "red"}: null} onClick={() =>  this.switchTopic("hot")}>
            最热
          </div>*/}
        </div>
        {this.state.loading ? (
          <Loading />
        ) : (
          this.state.posts.map(item => {
            return (
              <div className="post" key={item.id}>
                <Link to={`/member/${item.member.username}`}>
                  <img
                    className="avatar_normal"
                    src={item.member.avatar_normal}
                  />
                </Link>
                <div className="post-text">
                  <div
                    className="post-title"
                    onClick={() => {
                      openInNewTab(`/t/${item.id}`);
                    }}
                  >
                    {item.title}
                  </div>
                  <span className="post-nodeTitle">{item.node.title}</span>
                  <span className="post-username">{item.member.username}</span>
                </div>
                <div className="replayAmount">
                  <div className="replayAmount-text">{item.replies}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
export default Home;
