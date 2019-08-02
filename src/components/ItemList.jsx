import React, { Component } from 'react';
import '../css/App.css';
import {Link,Route} from 'react-router-dom';
import { firebaseDb, storage } from '../firebase';
import LazyLoad from 'react-lazyload';

const messagesRef = firebaseDb.ref('Items');


// class ItemPage extends Component {
//   constructor(props){
//     super(props);
//     // this.state{
//     // }
//   }
//   render(){
//     console.log(this.props.itemOpen)
//     return(this.props.itemOpen ? (
//       <div id="mask-1" className="hidden mask-hidden">
//         <div className="container">
//           <div className="page-wrapper">
//             <div className="the-item">
//               <div className="container-photo">
//                 <div className="photo-of-the-item">
//                   <img src={this.props.list.imageUrl} alt="" id="img" />
//                 </div>
//               </div>
//               <div className="titletext-area-pos-of-the-item">
//                 <div className="titletext-area-of-the-item">
//                   <h1>{this.props.list.title}</h1>
//                   <div className="post-day">{this.props.list.postDate}</div>
//                   {/* <button className={goodButton ? "good" : "bad"} onClick={()=>this.changeButtonStyle()}><i className="fas fa-thumbs-up"></i>  Good</button> */}
//                   <div className="text-of-the-item">{this.props.list.text}</div>
//                   <div className="edit-area">
//                     <div className="buttons">
//                       <Link to={`/${this.props.list.id}/ItemUpdate`} className="update">UpDate</Link>
//                       {/* <button type="button" className="delete" onClick={() => this.handledelete()}>Delete</button> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     ):(
//       <div id="mask-1" className="hidden mask-hidden">
//         Hello
//       </div>
//     ));
//   };
// };

class ItemPage extends Component {
  constructor(props){
    super(props);
    // this.state{
    // }
  }
  render(){
    return(
      <div id="mask-1" className="hidden mask-hidden">
        <div className="container">
          <div className="page-wrapper">
            <div className="the-item">
              <div className="container-photo">
                <div className="photo-of-the-item">
                  {/* <img src={this.props.list.imageUrl} alt="" id="img" /> */}
                </div>
              </div>
              <div className="titletext-area-pos-of-the-item">
                <div className="titletext-area-of-the-item">
                  <h1>{this.props.list.title}</h1>
                  <h1>hhh</h1>
                  {/* <div className="post-day">{this.props.list.postDate}</div> */}
                  <div className="post-day">jjj</div>
                  {/* <button className={goodButton ? "good" : "bad"} onClick={()=>this.changeButtonStyle()}><i className="fas fa-thumbs-up"></i>  Good</button> */}
                  {/* <div className="text-of-the-item">{this.props.list.text}</div> */}
                  <div className="text-of-the-item">jjj</div>
                  <div className="edit-area">
                    <div className="buttons">
                      {/* <Link to={`/${this.props.list.id}/ItemUpdate`} className="update">UpDate</Link> */}
                      {/* <button type="button" className="delete" onClick={() => this.handledelete()}>Delete</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

    

     

const ModalSmallWindow = (props) => {
    return (
    <div id="mask" className="hidden mask-hidden" onClick={props.closeSmallWindow}>
      <div id="modal" className="hidden">
        <div className="modal-list">
          <div className="modal-btns">
          <div>{props.title}</div>
            <button><Link to={`/${props.id}/ItemUpdate`} className="update">Edit</Link></button>
            <button onClick={() => props.handledelete(props.id, props.imagePath)}>Delete</button>
            <button onClick={props.closeSmallWindow}>Cansel</button>
          </div>
        </div>
      </div>
    </div>
    );
}


class Item extends Component {
  constructor(props){
    super(props);
    this.state={
      isReady: true,
      count: 1,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id && this.props.id){
      this.setState({
        isReady: false,
      });
      setTimeout(() => {
        this.setState({
          isReady: true,
        });
      }, 1000);
    }else{
      this.setState({
        isReady: true,
      })
    }
  }

  render(){
    const {item}=this.props;
      return( this.state.isReady ? (
        // <LazyLoad　throttle={200} height={300}>
          <div className="an-items-pos" key={item.id}>
            <Link to={`/items/${item.id}`} className="" item={item} onClick={()=>this.props.openItemWindow(item.title, item.text, item.imageUrl, item.id, item.goodButton, item.postDate)}>open</Link>
              <div className="an-item">
                <div className="title-text-area">
                  <div>
                    <div className="profile-img">
                      <img src={item.imageUrl} alt="" />
                    </div>
                    <button onClick={()=>this.props.openSmallWindow(item.id, item.imagePath, item.title)}>open</button>
                  </div>
                  <div className="title">{item.title}</div>
                  <div class="textarea-list">
                      <pre class="grad-textarea-list">{item.text}</pre>
                  </div>
                </div>
                {/* <div className="an-item-img" style={{backgroundImage: `url(${item.imageUrl})` }}> */}
                <div className="an-item-img">
                  <img src={item.imageUrl} alt="" />
                </div>
              </div>
          </div>
        // </LazyLoad>
      ):(
        <div className="an-items-pos" key={item.id}>
          <Link to={`/${item.id}/item`} className="">
            <div className="loading-box">
              <div>Loading...</div>
            </div>
          </Link>
        </div>
      ));
  }
}

class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      list: [],
      id: null,
      imagePath: '',
      title: '',
      isReady: true,
      itemOpen: false,
    };
    this.openSmallWindow=this.openSmallWindow.bind(this);
    this.closeSmallWindow=this.closeSmallWindow.bind(this);
    this.openItemWindow=this.openItemWindow.bind(this);
    this.handledelete=this.handledelete.bind(this);
  }


  componentDidMount() {
    //Get Data from Firebase(Real time database)
    const month = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December' ]
    const lists= this.state.lists;
    messagesRef.on('child_added', (resolve) => {
      const id = resolve.key;
      const data = resolve.val();
      const date = data.postDate;
      const postDate = month[date.month] + ' ' + date.date + ', ' + date.year;
      const title = data.title;
      const text = data.text;
      const txtLine = text.match(/\r?\n/g);
      if(txtLine){
        var len = txtLine.length + 1;
      }else{
        len = 0;
      };
      const imageUrl = data.imageUrl;
      const imagePath = data.imagePath;
      lists.push({
        id: id,
        title: title,
        text: text,
        imageUrl: imageUrl,
        imagePath: imagePath,
        postDate: postDate,
        len: len,
      });
      this.setState({
        lists: lists,
      });
    });
  }

  openSmallWindow(id, imagePath, title){
    const open = document.getElementById('mask');
    open.className = '';
    this.setState({
      id: id,
      imagePath: imagePath,
      title: title,
    })
  }

  closeSmallWindow(){
    const close = document.getElementById('mask');
    close.className = 'hidden mask-hidden'
  }

  openItemWindow(title, text, imageUrl, id, goodButton, postDate){
    const open = document.getElementById('mask-1');
    open.className = '';
    console.log(this.state.itemOpen)
    console.log([title, text, imageUrl, id, goodButton, postDate])
    this.setState({
      list: [title, text, imageUrl, id, goodButton, postDate],
      itemOpen: true,
    })
  }

  handledelete(id,imagePath) {
    const storageRef = storage.ref().child(imagePath);
    firebaseDb.ref(`Items/${id}`).remove().then(() => {
      storageRef.delete().then(() => {
        this.props.history.push('/');
      });
    });
  }


  // handledelete() {
  //   const { item } = this.state;
  //   const storageRef = storage.ref().child(item.imagePath);
  //   // console.log(item.id)
  //   firebaseDb.ref(`Items/${item.id}`).remove().then(() => {
  //     storageRef.delete().then(() => {
  //       this.props.history.push('/');
  //     });
  //   });
  // }

  // changeButtonStyle() {
  //   const { item } = this.state;
  //   const changeBool = !item.goodButton;
  //   item.goodButton = changeBool;
  //   this.setState({
  //     item,
  //   });
  // }

  // closeItemPage(){
  //   const close = document.getElementById('mask-1');
  //   close.className = 'hidden mask-hidden'
  // }


  render() {
    return (
      <main>
    
        
        {/* <div className="item-list-pos">
          <div className="item-list">
          <div className="message-list">
              <Route path='/' component={Item}
                {...this.state}
                handledelete={this.handledelete}
                openSmallWindow={this.openSmallWindow}
              />
            </div>
          </div>
        </div> */}


        <Route path='/items/:id' component={ItemPage}/>
        <div className="item-list-pos">
          <div className="item-list">
            <div className="message-list">
              {this.state.lists.map(item => {
                return(
                  <LazyLoad　throttle={200} height={300}>
                  <Item
                  {...this.state}
                  id={item.id}
                  item={item}
                  handledelete={this.handledelete}
                  openSmallWindow={this.openSmallWindow}
                  openItemWindow={this.openItemWindow}
                />
                </LazyLoad>
                )
              })}
            </div>
          </div>
        </div>


                  {/* <LazyLoad　throttle={200} height={300}>
                  <Item
                  
                  {...this.state}
                  handledelete={this.handledelete}
                  openSmallWindow={this.openSmallWindow}
                  openItemWindow={this.openItemWindow}
                />
                </LazyLoad> */}
                
           


        <ModalSmallWindow
          {...this.state}
          openSmallWindow={this.openSmallWindow}
          closeSmallWindow={this.closeSmallWindow}
          handledelete={this.handledelete}
        />
      </main>
    );
  }
}

export default ItemList;
