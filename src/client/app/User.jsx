import React from 'react';

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {data: ''};
  }

  getCampaigns () {
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
    console.log(this.props.data);
    if (this.state.data.length > 0) {
      return (
        <div>You did it!</div>
      )
    } else {
      return (
        <div>
          <p>User id: {this.props.userInfo.id}</p>
          <p>User email: {this.props.userInfo.email}</p>
          <button onClick={this.getCampaigns.bind(this)}>Get Campaigns</button>
        </div>
      );
    }
  }

}

export default User;
