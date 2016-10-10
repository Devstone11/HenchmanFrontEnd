import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';

class Campaign extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      encounters: [],
    };
  }

  componentWillMount () {
    $.ajax({
      url: urls.getEncounters + this.props.params.camp_id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({encounters: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }

  render() {
    var campaignThis = this;
    var encounterNodes = this.state.encounters.map(function(encounter) {
      var url = '/campaign/' + campaignThis.props.params.camp_id + '/encounter/' + encounter.id;
      return <div><Link to={url}>{encounter.name}</Link></div>
    });

    return (
      <div>
        <Link to='/'>Back to Campaigns</Link>
        <h2>Campaign Page!</h2>
        <h3>Select an Encounter:</h3>
        {encounterNodes}
      </div>
    );
  }
}

export default Campaign;
