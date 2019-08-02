import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="main">
        <div className="profile-page-wrapper">
          <div className="user-data">
            <div className="profile-photo-area">
              <div className="profile-photo-pos">
                <div className="profile-photo">
                  <button type="">{/* <img src={ProfileImg} alt=""/> */}</button>
                </div>
                <div>
                  <form>
                    <input type="file" />
                  </form>
                </div>
              </div>
            </div>
            <div className="profile-area">
              <div className="profile-username">
                <h1>Furuyoshi55</h1>
              </div>
              <div className="profile-edit-button">
                <Link to="/ProfileUpdate" className="profile-update">
                  <button>プロフィールを編集</button>
                </Link>
              </div>
              <ul>
                <li>投稿数</li>
                <li>いいね数</li>
              </ul>
            </div>
          </div>
          <div className="profile-text-area">
            <div>
              <h1>Yoshinori</h1>
              <br />
              <span>{/* コメント */}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
