import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom';
import { firebaseDb, storage } from '../firebase';

class ItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
    };
    this.handledelete = this.handledelete.bind(this);
    this.handledelete = this.handledelete.bind(this);
  }

  componentDidMount() {
  //  Get Data from Firebase(Real time database)
    const { id } = this.props.match.params;
    const month = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December' ]
    firebaseDb.ref(`Items/${id}`).once('value', (resolve) => {
      const data = resolve.val();
      data.id = id
      const date = data.postDate;
      const postDate = month[date.month] + ' ' + date.date + ', ' + date.year;
      data.postDate = postDate
      const txt = data.text;
      const txtLine = txt.match(/\r?\n/g);
      if(txtLine){
        var len = txtLine.length + 1;
      }else{
        len = 0;
      };
      data.len=len
      console.log(data)
      this.setState({
        item: data,
      });
    });
  }

  handledelete() {
    const { item } = this.state;
    const storageRef = storage.ref().child(item.imagePath);
    // console.log(item.id)
    firebaseDb.ref(`Items/${item.id}`).remove().then(() => {
      storageRef.delete().then(() => {
        this.props.history.push('/');
      });
    });
  }

  changeButtonStyle() {
    const { item } = this.state;
    const changeBool = !item.goodButton;
    item.goodButton = changeBool;
    this.setState({
      item,
    });
  }

  render() {
    const { title, text, imageUrl, id, goodButton, postDate} = this.state.item;
    return (
        // <div id="mask" className="hidden mask-hidden">
          <div className="container">
            <div className="page-wrapper">
              <div className="the-item">
                <div className="container-photo">
                  <div className="photo-of-the-item">
                    <img src={imageUrl} alt="" id="img" />
                  </div>
                </div>
                <div className="titletext-area-pos-of-the-item">
                  <div className="titletext-area-of-the-item">
                    <h1>{title}</h1>
                    <div className="post-day">{postDate}</div>
                    <button className={goodButton ? "good" : "bad"} onClick={()=>this.changeButtonStyle()}><i className="fas fa-thumbs-up"></i>  Good</button>
                    <div className="text-of-the-item">{text}</div>
                    <div className="edit-area">
                      <div className="buttons">
                        <Link to={`/${id}/ItemUpdate`} className="update">UpDate</Link>
                        <button type="button" className="delete" onClick={() => this.handledelete()}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        // </div>
    );
  }
}

export default ItemPage;
