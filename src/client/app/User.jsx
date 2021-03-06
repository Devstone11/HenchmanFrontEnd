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
      return <div className="nav-link"><Link to={url} key={campaign.id}>{campaign.name} &#62;</Link></div>
    })
    if (this.state.showNewForm === true) {
      return (
        <div className="left-bar">
          <NewCampaignForm showNewForm={this.showNewForm.bind(this)}></NewCampaignForm>
          <button className="form-button" onClick={this.showNewForm.bind(this)}>Cancel</button>
        </div>
      );
    } else {
      return (
        <div className="left-bar">
          <h3>Select a Campaign:</h3>
          <div className="nav-link-container">
            {campaignNodes}
          </div>
          <button className="nav-link add-button" onClick={this.showNewForm.bind(this)}>Add New +</button>
        </div>
      );
    }
  }
}

export default User;
