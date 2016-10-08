import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';

class Encounter extends React.Component {

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
        <Link to='/campaign'>Back to Campaign Page</Link>
        <h1>Encounter Page!</h1>
        <Link to='/scene'>To Scene Page</Link>
      </div>
    );
  }
}


export default Encounter;
