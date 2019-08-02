import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ItemList from './components/ItemList';
import ItemPage from './components/ItemList';
import ItemPost from './components/ItemPost';
import ItemUpdate from './components/ItemUpdate';
import Profile from './components/Profile';
import ProfileUpdate from './components/ProfileUpdate';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

if(document.getElementById('root')){
    ReactDOM.render(

        <BrowserRouter>
        <div>
            <input type="checkbox" className="check" id="checked"/>
            <label class="menu-btn" for="checked">
                <span class="bar top"></span>
                <span class="bar middle"></span>
                <span class="bar bottom"></span>
                <span class="menu-btn__text">MENU</span>
            </label>
            <label class="close-menu" for="checked"></label>
            <nav class="drawer-menu">
                <ul>
                    <li><Link to="/">All</Link></li>
                    <li><Link to="/">Photo</Link></li>
                    {/* <li><Link to="/">Video</Link></li> */}
                    <li><Link to="/ItemPost">ItemPost</Link></li>
                    <li><Link to="/Profile">Profile</Link></li>
                </ul>
            </nav>

                {/* <nav id='nav drawer-menu'>
                    <div className='logoPos'>
                        <Link to="/" className='logoLink'>
                            <div className='logo'>Instagramみたいなや〜つ</div>
                        </Link>
                    </div>
                    <div className='right-side'>
                        <div className='right-side-item'>
                            <div><Link to="/">All</Link></div>
                        </div>
                        <div className='right-side-item'>
                            <div><Link to="/">Photo</Link></div>
                        </div>
                        <div className='right-side-item'>
                            <div><Link to="/">Video</Link></div>
                        </div>
                        <div className='right-side-item'>
                            <div><Link to="/ItemPost">ItemPost</Link></div>
                        </div>
                        <div className='right-side-item'>
                            <div><Link to="/Profile">Profile</Link></div>
                        </div>
                    </div>
                </nav> */}
                
                
                <Switch>
                    <Route exact path="/" component={ItemList} />
                    <Route exact path="/items/:id" component={ItemPage} />
                    <Route path="/ItemPost" component={ItemPost} />
                    <Route path="/:id/ItemUpdate" component={ItemUpdate} />
                    <Route path="/Profile" component={Profile} />
                    <Route path="/ProfileUpdate" component={ProfileUpdate} />
                </Switch>
            </div>
        </BrowserRouter>

    , document.getElementById('root'));
}
