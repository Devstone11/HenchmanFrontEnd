import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';

class Encounter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scenes: [],
      showForm: false,
      name: '',
      active: ''
    };
  }

  componentWillMount () {
    $.ajax({
      url: urls.getScenes + this.props.params.encounter_id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          scenes: data.scenes,
          name: data.encounter.name,
          active: data.encounter.active
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }

  showForm () {
    this.setState({showForm: !this.state.showForm});
  }

  handleNameChange (e) {
    this.setState({name: e.target.value});
  }

  handleActiveChange (e) {
    this.setState({active: !this.state.active});
  }

  handleSubmit() {
    $.ajax({
      url: urls.getScenes + this.props.params.encounter_id,
      dataType: 'json',
      type: 'POST',
      data: this.state,
      success: function() {
        this.setState({showForm: false});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    var encounterThis = this;
    var campaignUrl = '/campaign/' + this.props.params.camp_id;
    var sceneNodes = this.state.scenes.map(function(scene) {
      var sceneUrl = campaignUrl + '/encounter/' + encounterThis.props.params.encounter_id + '/scene/' + scene.id;
      return <div><Link to={sceneUrl}>{scene.name}</Link></div>
    });

    if (this.state.showForm === true) {
      return (
        <div>
          <Link to={campaignUrl}>Back to Encounters</Link>
          <form className="edit-form" onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
            <label htmlFor="active">Active: </label>
            <input type="checkbox" id="active" checked={this.state.active} onChange={this.handleActiveChange.bind(this)}/>
            <input type="submit" value="Save Changes" />
          </form>
          <button onClick={this.showForm.bind(this)}>Cancel</button>
        </div>
      )
    } else {
      return (
        <div>
          <Link to={campaignUrl}>Back to Encounters</Link>
          <h2>{this.state.name}</h2>
          <button onClick={this.showForm.bind(this)}>Edit</button>
          <h3>Select a Scene:</h3>
          {sceneNodes}
        </div>
      );
    }
  }
}


export default Encounter;
