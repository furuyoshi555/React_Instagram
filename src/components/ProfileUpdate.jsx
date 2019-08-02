import React, { Component } from 'react';
import '../css/App.css';
// import ProfileImg from "../IMG_4836.JPG";

class ProfileUpdate extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="main">
        <div className="profile-editpage-wrapper">
          <div className="edit-page">
            <div className="profile-photo-area">
              <button>{/* <img src={ProfileImg} alt=""/> */}</button>
              <div>
                <form>
                  <input type="file" />
                </form>
              </div>
            </div>
            <div className="profile-photo-edit">
              <h1>Furuyoshi55</h1>
                <button>プロフィール写真を変更</button>
              <div>
                <form>
                  <input type="file" />
                </form>
              </div>
            </div>
          </div>
          <form className="profile-edit-form">
            <div className="profile-form-item">
              <div className="profile-form-title">
                <label>Name</label>
              </div>
              <div className="profile-form-input">
                <input type="text" />
              </div>
            </div>
            <div className="profile-form-item">
              <div className="profile-form-title">
                <label>User Name</label>
              </div>
              <div className="profile-form-input">
                <input type="text" />
              </div>
            </div>
            <div className="profile-form-item">
              <div className="profile-form-title">
                <label>紹介文</label>
              </div>
              <div className="profile-form-input">
                <input type="textarea" />
              </div>
            </div>
            <div className="profile-form-item">
              <div className="profile-form-title">s</div>
              <div className="profile-form-input">
                <button type="submit">Up Date</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ProfileUpdate;
