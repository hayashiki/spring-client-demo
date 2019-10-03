import React, { Component } from 'react';
import './Home.css';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { refreshToken } from '../util/APIUtils';

class Home extends Component {

  handleClick = () => {

    // このデモではリフレッシュトークンをローカルストレージから取得する
    const refreshLocalToken = localStorage.getItem(REFRESH_TOKEN)

    refreshToken({refreshToken: refreshLocalToken})
      .then(response => {
    // トークンを一新
      localStorage.setItem(ACCESS_TOKEN, response.token.accessToken);
        localStorage.setItem(REFRESH_TOKEN, response.token.refreshToken);
        this.props.history.push("/");
      }).catch(error => {
        console.error(error)
      });    
  }

  render() {
    console.log(this.props)
    return (
      <div className="home-container">
        <h1 className="home-title">Home</h1>
        <button onClick={this.handleClick}>リフレッシュ！！</button>
      </div>
    )
  }
}

export default Home;