import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div className="profile-container">
        <div className="container">
          {this.props.currentUser.user.name}
          <div className="profile-info">
            <div className="profile-avatar">
              {
                this.props.currentUser.imageUrl && (
                  <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name} />
                ) 
              }
            </div>
            <div className="profile-name">
              <h2>{this.props.currentUser.name}</h2>
              <p className="profile-email">{this.props.currentUser.email}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile
