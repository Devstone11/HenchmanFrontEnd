import React from 'react';
import Campaign from './Campaign.jsx';
import urls from '../ajax/urls.js';

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      showCampaign: 0
    };
  }

  pickCampaign(campaignId) {
    this.setState({showCampaign: campaignId});
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
    var userThis = this;
    var campaignNodes;
    var url = urls.getEncounters;
    if (this.state.data.length > 0) {
      if (this.state.showCampaign === 0) {
        campaignNodes = this.state.data.map(function(campaign) {
          return <Campaign key={campaign.id} campaignInfo={campaign} url={url} pickCampaign={userThis.pickCampaign.bind(userThis)} />
        })
      } else {
        this.state.data.forEach(function(campaign) {
          if (campaign.id === userThis.state.showCampaign) {
            campaignNodes = <Campaign key={campaign.id} campaignInfo={campaign} url={url}/>;
          }
        })
      }
      return (
        <div>
          {campaignNodes}
        </div>
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
