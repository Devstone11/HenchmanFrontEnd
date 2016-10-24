import React from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import urls from '../scripts/urls.js';
import NewCampaignForm from './NewCampaignForm.jsx';
import Login from './Login.jsx';

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      campaigns: [],
      showNewForm: false
    };
  }

  showNewForm () {
    this.setState({showNewForm: !this.state.showNewForm});
    this.getCampaigns();
  }

  componentWillMount () {
    this.getCampaigns();
  }

  getCampaigns () {
    $.ajax({
      url: urls.getUsers + '1',
      data: {userId: cookie.load('userId')},
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({campaigns: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }

  render() {
    var campaignNodes = this.state.campaigns.map(function(campaign) {
      var url = '/campaign/' + campaign.id;
      return <div key={campaign.id} className="nav-link"><Link to={url} key={campaign.id}>{campaign.name} &#62;</Link></div>
    })
    if (this.state.showNewForm === true && cookie.load('userId')) {
      return (
        <div className="left-bar">
          <NewCampaignForm showNewForm={this.showNewForm.bind(this)}></NewCampaignForm>
          <button className="form-button" onClick={this.showNewForm.bind(this)}>Cancel</button>
        </div>
      );
    } else if (cookie.load('userId')){
      return (
        <div className="left-bar">
          <h3>Select a Campaign:</h3>
          <div className="nav-link-container">
            {campaignNodes}
          </div>
          <button className="nav-link add-button" onClick={this.showNewForm.bind(this)}>Add New +</button>
        </div>
      );
    } else {
      return (
        <Login></Login>
      )
    }
  }
}

export default User;
