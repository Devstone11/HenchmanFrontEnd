import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';

class Scene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      showCampaign: 0
    };
  }

  getCampaigns () {
    this.props.pickUser(this.props.userInfo.id);
    $.ajax({
      url: this.props.url + this.props.userInfo.id,
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
    return (
      <div>
        <Link to='/encounter'>Back to Encounter Page</Link>
        <h1>Scene Page!</h1>
        <Link to='/combat'>To Combat Page</Link>
      </div>
    );
  }
}


export default Scene;
