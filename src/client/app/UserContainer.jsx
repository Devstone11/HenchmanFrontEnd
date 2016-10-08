import React from 'react';
import User from './User.jsx'

class UserContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      showUser: 0,
    };
  }

  pickUser(userId) {
    this.setState({showUser: userId});
  }

  getUsers () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }

  render() {
    var url = this.props.url;
    var userNodes;
    var containerThis = this;
    if (this.state.data.length > 0) {
      if (this.state.showUser === 0) {
        userNodes = this.state.data.map(function(user) {
          return <User key={user.id} userInfo={user} url={url} pickUser={containerThis.pickUser.bind(containerThis)} />
        });
      } else {
        this.state.data.forEach(function(user) {
          if (user.id === containerThis.state.showUser) {
            userNodes = <User key={user.id} userInfo={user} url={url}/>;
          }
        })
      }
      return (
        <div>
          {userNodes}
        </div>
      )
    } else {
      return (
        <div>
          <p>Welcome to the "Get Users" Page!</p>
          <div>
            <button onClick={this.getUsers.bind(this)}>Get Users</button>
          </div>
        </div>
      );
    }
  }
}

export default UserContainer;
