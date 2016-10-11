import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';
import NewCampaignForm from './NewCampaignForm.jsx';

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
      return <div><Link to={url} key={campaign.id}>{campaign.name}</Link></div>
    })
    if (this.state.showNewForm === true) {
      return (
        <div>
          <NewCampaignForm showNewForm={this.showNewForm.bind(this)}></NewCampaignForm>
          <button onClick={this.showNewForm.bind(this)}>Cancel</button>
        </div>
      );
    } else {
      return (
        <div>
          <h2>User Page!</h2>
          <h3>Select a Campaign:</h3>
          {campaignNodes}
          <button onClick={this.showNewForm.bind(this)}>Add New +</button>
        </div>
      );
    }
  }
}

export default User;
