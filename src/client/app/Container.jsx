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

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.

      // FB.getLoginStatus(function(response) {
      //   this.statusChangeCallback(response);
      // }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  logOut () {
    FB.logout(function(response) {
      cookie.remove("userId");
      console.log('cookie removed!');
      // document.getElementById('status').innerHTML = 'You have successfully logged out.';
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
            <h1>Henchman</h1>
            <a id="logout" href="#/login" onClick={this.logOut.bind(this)}>Logout</a>
          </header>
          <Login></Login>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div>
          {backgroundDiv}
          <header className="header">
            <h1>Henchman</h1>
            <a id="logout" href="#/login" onClick={this.logOut.bind(this)}>Logout</a>
          </header>
          <Login></Login>
        </div>
      );
    }
  }
}


export default Container;
