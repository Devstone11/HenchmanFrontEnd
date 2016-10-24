import React from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import urls from '../scripts/urls.js';
import Login from './Login.jsx';

class Container extends React.Component {

  componentDidMount () {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '200596083700635',
        cookie     : true,  // enable cookies to allow the server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.1' // use version 2.1
      });
    }.bind(this);

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  logOut () {
    cookie.remove("userId");
    FB.logout(function(response) {
      console.log('cookie removed!');
    });
    console.log('logout successful');
  }

  render() {
    var backgroundDiv;
    if (this.props.params.combat) {
      backgroundDiv = <div className="background-image burningtown"></div>;
    } else if (this.props.params.scene_id) {
      backgroundDiv = <div className="background-image ships"></div>;
    } else if (this.props.params.encounter_id) {
      backgroundDiv = <div className="background-image ruins"></div>;
    } else if (this.props.params.camp_id) {
      backgroundDiv = <div className="background-image book"></div>;
    } else {
      backgroundDiv = <div className="background-image forest"></div>;
    }
    if (cookie.load('userId')) {
      return (
        <div>
          {backgroundDiv}
          <header className="header">
            <h1><a href="/" className="title">Henchman</a></h1>
            <a id="logout" href="#/login" onClick={this.logOut.bind(this)}>Logout</a>
          </header>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div>
          {backgroundDiv}
          <h1 id="welcome">Welcome to Henchman</h1>
          <Login></Login>
        </div>
      );
    }
  }
}


export default Container;
