import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import urls from '../scripts/urls.js';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

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
      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
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

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  testAPI () {
    FB.api('/me', function(response) {
      document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
    });
  }

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback (response) {
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      this.testAPI();
      cookie.save('userId', response.authResponse.userID);
    } else if (response.status === 'not_authorized') {
      document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    } else {
      document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  checkLoginState () {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleClick () {
    FB.login(this.checkLoginState());
  }

  logOut () {
    FB.logout(function(response) {
      cookie.remove("userId");
      console.log('cookie removed!');
      document.getElementById('status').innerHTML = 'You have successfully logged out.';
    });
    console.log('logout successful');
  }

  render() {

    return (
      <div>
        <div id="status">
        </div>
        <a href="#/" onClick={this.handleClick.bind(this)}>Login</a>
        <a href="#/login" onClick={this.logOut.bind(this)}>Logout</a>
      </div>
    );

  }
}

export default Login;
