import React from 'react';
import Encounter from './Encounter.jsx';
import urls from '../ajax/urls.js';


class Campaign extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      showEncounter: 0
    };
  }

  pickEncounter(encounterId) {
    this.setState({showEncounter: encounterId});
  }

  getEncounters () {
    this.props.pickCampaign(this.props.campaignInfo.id);
    $.ajax({
      url: this.props.url + this.props.campaignInfo.id,
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
    var campaignThis = this;
    var encounterNodes;
    var url = urls.getScenes;
    if (this.state.data.length > 0) {
      if (this.state.showEncounter === 0) {
        encounterNodes = this.state.data.map(function(encounter) {
          return <Encounter key={encounter.id} encounterInfo={encounter} url={url} pickEncounter={campaignThis.pickEncounter.bind(campaignThis)} />
        });
      } else {
        this.state.data.forEach(function(encounter) {
          if (encounter.id === campaignThis.state.showEncounter) {
            encounterNodes = <Encounter key={encounter.id} encounterInfo={encounter} url={url}/>;
          }
        })
      }
      return (
        <div>
          <button>Back to Campaigns</button>
          {encounterNodes}
        </div>
      )
    } else {
        return (
          <div>
            <p>Campaign id: {campaignThis.props.campaignInfo.id}</p>
            <p>Campaign name: {this.props.campaignInfo.name}</p>
            <button onClick={this.getEncounters.bind(this)}>Get Encounters</button>
          </div>
        )
    }
  }
}

export default Campaign;
