import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';

class Encounter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scenes: [],
      showCampaign: 0
    };
  }

  componentWillMount () {
    $.ajax({
      url: urls.getScenes + this.props.params.encounter_id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({scenes: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }

  render() {
    var encounterThis = this;
    var campaignUrl = '/campaign/' + this.props.params.camp_id;
    var sceneNodes = this.state.scenes.map(function(scene) {
      var sceneUrl = campaignUrl + '/encounter/' + encounterThis.props.params.encounter_id + '/scene/' + scene.id;
      return <div><Link to={sceneUrl}>{scene.name}</Link></div>
    });

    return (
      <div>
        <Link to={campaignUrl}>Back to Encounters</Link>
        <h2>Encounter Page!</h2>
        <h3>Select a Scene:</h3>
        {sceneNodes}
      </div>
    );
  }
}


export default Encounter;
