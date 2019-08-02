import React, { Component } from 'react';
import '../css/App.css';
import { firebaseDb, storage } from '../firebase';
import {Link } from 'react-router-dom';

const messagesRef = firebaseDb.ref('Items');

class ItemPost extends Component {
  constructor() {
    super();
    this.state = {
      imageFile: null,
      title: '',
      text: '',
      processing: false,
    };
    this.onChangeFile = this.onChangeFile.bind(this);
    this.addItem = this.addItem.bind(this);
    this.closeSmallWindow = this.closeSmallWindow.bind(this);
  }

  // onChangeFile(e) {
  //   this.setState({ imageFile: e.target.files[0] });
  // }


  onChangeFile(e) {
    const imageFile = e.target.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(imageFile);
    fr.onload = () => {                                                      
      const imgNode = this.refs.image;
      imgNode.src = fr.result;
    };
    this.setState({ 
      imageFile: imageFile,
      isImage: true,
     });
  }

  closeSmallWindow(){
    const close = document.getElementById('mask-for-postpage');
    close.className = 'hidden mask-hidden'
  }

  addItem(e) {
    e.preventDefault();

    if(!this.state.processing){
      this.setState({
        processing: true,
      });
      // const imageFile = e.target.files[0];
      const { title, text, imageFile } = this.state;
      console.log(imageFile);
      console.log(imageFile);
      if (imageFile === null) {
        alert('Photo File empty');
      } else if (title === '') {
        alert('Title empty');
      } else if (text === '') {
        alert('Text empty');
      }

      // Image File Update to Storage of Firebase
      const date = new Date();
      const photoId  = date.getTime().toString(36) + '-' + Math.random().toString(36);
      const postDate = { 'month' : date.getMonth(), 'date' : date.getDate(), 'year' : date.getFullYear(), 'hours' : date.getHours(), 'minutes' : date.getMinutes(), 'seconds' : date.getSeconds()};
      // console.log(postDate)
      const imagePath = `images/${photoId}.${imageFile.name}`;    
      const storageRef = storage.ref(imagePath);
      storageRef.put(imageFile).then((snapshot) => {
        snapshot.task.snapshot.ref.getDownloadURL().then((imageUrl) => {
          messagesRef.push({
            postDate,
            imagePath,
            imageUrl,
            text,
            title,
            goodButton: false,
          }).then(() => {
            this.setState({
              // imageFile: '',
              processing: false,
              isImage: false,
              imageFile: null,
              title: '',
              text: '',
            });
          }).then(()=>{
            const open = document.getElementById('mask-for-postpage');
            open.className = '';
          })
        });
      });
    }
  }

  render() {
    return ( !this.state.processing ? (
      <div className="container">
        <div id="mask-for-postpage" className="hidden mask-hidden">
          <div id="modal-for-postpage" className="hidden">
            <div className="modal-for-postpage-list">
              <div className="modal-for-postpage-btns">
                <button onClick={this.closeSmallWindow}>続けて登録</button>
                <button><Link to="/">一覧ページへ</Link></button>
              </div>
            </div>
          </div>
        </div>
      
        <div className="page-wrapper">
          <div className="the-item">
            <h2 className="title-post-item">Post Item</h2>
            <form onSubmit={this.addItem}>
              <div className="photo-pos-box">
                <h3>Photo</h3>
                <div className="photo-drop-box">
                {this.state.isImage ? (
                  <div className="is-img-box">
                    <div><img ref="image" src="" alt=""/></div>
                    <div className="photo-upload-drop-box is-img">
                      <input type="file" onChange={this.onChangeFile} id="trigger-file" />
                      <label className="filr-area" for="trigger-file">
                        <pre>変更はここへドラッグandドロップ<br/>またはファイルをアップロードしてね</pre>
                      </label>
                    </div>
                  </div>
                ):(
                  <div className="photo-upload-drop-box">
                    <input type="file" onChange={this.onChangeFile} id="trigger-file" />
                    <label className="filr-area" for="trigger-file">
                    <pre>ドラッグandドロップ<br/>またはファイルをアップロードしてね</pre>
                    </label>
                  </div>
                )}
                </div>
              </div>
              <div className="title-text-post-box">
                <div className="title-post-box">
                  <label>Title</label><span>必須</span>
                  <div>
                    <input type="text" value={this.state.title} maxLength="15" placeholder="15文字以内" onChange={e => this.setState({ title: e.target.value })} />
                  </div>
                </div>
                <div className="text-post-box">
                  <label>comment</label><span>必須</span>
                  <div>
                    <textarea row="5" value={this.state.text} placeholder="300文字以内" onChange={e => this.setState({ text: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="submit-button">
                <button type="submit">Post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    ):(
      <div>
        <div>
          Saving.....
        </div>
      </div>
    ));
  }
}

export default ItemPost;
