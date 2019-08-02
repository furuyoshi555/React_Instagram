import React, { Component } from 'react';
import '../css/App.css';
import { firebaseDb, storage } from '../firebase';

class ItemUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      imageFile: null,
      title: '',
      text: '',
      processing: false,
    };
    this.updateItem = this.updateItem.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
  }

  componentDidMount() {
    //  Get Data from Firebase(Real time database)
      const { id } = this.props.match.params;
      firebaseDb.ref(`Items/${id}`).once('value', (resolve) => {
        const data = resolve.val();
        data.id = id
        // console.log(data)
        this.setState({
          item: data,
          title: data.title,
          text: data.text,
        });
      });
    }

  onChangeFile(e) {
    const imageFile = e.target.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(imageFile);
      fr.onload = () => {
        const img = new Image();
        img.src = fr.result;
        const width = img.width;
        const height = img.height;

        const dstWidth = 1024;
        const scale = dstWidth / width;
        const dstHeight = height * scale;
        const canvas = document.createElement('canvas');

        canvas.width = dstWidth;
        canvas.height = dstHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, dstWidth, dstHeight);

        // const resized = canvas.toDataURL('image/jpeg');                                                         
        const imgNode = this.refs.image;
        // imgNode.src = resized;
        imgNode.src = fr.result;
      };
    
    this.setState({ imageFile: imageFile });
  }

  updateItem(e) {
    e.preventDefault();

    if(!this.state.processing){
      this.setState({
        processing: true,
      });
      // ImageFile削除の変数
      const {item, imageFile, title, text} = this.state;
      const storageRef = storage.ref().child(item.imagePath);
      let imagePath=null;
      if(imageFile===null){
        firebaseDb.ref(`Items/${item.id}`).update({
          text,
          title,
          goodButton: false,
        }).then(()=>{
          this.props.history.push(`/${item.id}/item`);
        });
      }else{
        const date = new Date();
        const photoId  = date.getTime().toString(36) + '-' + Math.random().toString(36);
        imagePath = `images/${photoId}.${imageFile.name}`;
        const storageref = storage.ref(imagePath);
        storageRef.delete().then(()=>{
          storageref.put(imageFile).then((snapshot)=>{
            snapshot.task.snapshot.ref.getDownloadURL().then((imageUrl)=>{
              firebaseDb.ref(`Items/${item.id}`).update({
                imagePath,
                imageUrl,
                text,
                title,
                goodButton: false,
                processing: false,
              }).then(()=>{
                this.props.history.push(`/${item.id}/item`);
              });
            });
          });
        });
      }
    }
  }

  render() {
    return ( !this.state.processing ? (
      <div className="container">
        <div className="page-wrapper">
          <div className="the-item">
            <h2 className="title-post-item">Item Update</h2>
            <form onSubmit={this.updateItem}>
              <div className="photo-pos-box">
                <h3>Photo</h3>
                <div className="photo-drop-box">
                  <div className="is-img-box">
                    <div><img ref="image" src={this.state.item.imageUrl} alt=""/></div>
                    <div className="photo-upload-drop-box is-img">
                      <input type="file" onChange={this.onChangeFile} id="trigger-file" />
                      <label className="filr-area" for="trigger-file">
                        <pre>変更はここへドラッグandドロップ<br/>またはファイルをアップロードしてね</pre>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="title-text-post-box">
                <div className="title-post-box">
                  <label>Title</label>
                  <span>必須</span>
                  <div>
                    <input type="text" placeholder="30文字以内" onChange={e => this.setState({ title: e.target.value })} value={this.state.title } />
                  </div>
                </div>
                <div className="text-post-box">
                  <label>comment</label>
                  <span>必須</span>
                  <div>
                    <textarea type="textarea" placeholder="300文字以内" onChange={e => this.setState({text: e.target.value})} value={this.state.text}/>
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
          Updata.....
        </div>
      </div>
    ));
  }
}

export default ItemUpdate;
