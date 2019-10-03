import React, { Component } from 'react';
import './Login.css';
import { FACEBOOK_AUTH_URL, ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { login } from '../../util/APIUtils';
import { Link, Redirect } from 'react-router-dom'
import fbLogo from '../../img/fb-logo.png';

class Login extends Component {
  render() {
    if (this.props.authenticated) {
      return <Redirect
        to={{
          pathname: "/",
          state: { from: this.props.location }
        }} />;
    }

    return (
      <div className="login-container">
        <div className="login-content">
          <h1 className="login-title">Login to Social Login</h1>
          <SocialLogin />
          <div className="or-separator">
            <span className="or-text">OR</span>
          </div>
          <LoginForm {...this.props} />
          <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
        </div>
      </div>
    );
  }
}

class SocialLogin extends Component {
  render() {
    return (
      <div className="social-login">
        <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
          <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a>
      </div>
    );
  }
}


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const loginRequest = Object.assign({}, this.state);

    login(loginRequest)
      .then(response => {
        console.log(response)
        localStorage.setItem(ACCESS_TOKEN, response.token.accessToken);
        localStorage.setItem(REFRESH_TOKEN, response.token.refreshToken);
        this.props.history.push("/");
      }).catch(error => {
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-item">
          <input type="email" name="email"
            className="form-control" placeholder="Email"
            value={this.state.email} onChange={this.handleInputChange} required />
        </div>
        <div className="form-item">
          <input type="password" name="password"
            className="form-control" placeholder="Password"
            value={this.state.password} onChange={this.handleInputChange} required />
        </div>
        <div className="form-item">
          <button type="submit" className="btn btn-block btn-primary">Login</button>
        </div>
      </form>
    );
  }
}

export default Login
