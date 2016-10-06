import React from 'react';
import User from './User.jsx'

class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: '' };
  }

  getUsers () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        console.log(this.state.data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }

  render() {
    if (this.state.data.length > 0) {
      var userNodes = this.state.data.map(function(user) {
        return <User key={user.id} userInfo={user} />
      });
      return (
        <div>
          {userNodes}
        </div>
      )
    } else {
      return (
        <div>
          <p>Name Prop: {this.props.name}</p>
          <div>
            <button onClick={this.getUsers.bind(this)}>Get Users</button>
          </div>
        </div>
      );
    }
  }

}

export default AwesomeComponent;
