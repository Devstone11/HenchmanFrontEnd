import React from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import urls from '../scripts/urls.js';
import NewSceneForm from './NewSceneForm.jsx';

class Encounter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scenes: [],
      showForm: false,
      showNewForm: false,
      name: '',
      active: ''
    };
  }

  componentWillMount () {
    console.log(cookie.load('userId'));
    this.getScenes();
  }

  getScenes () {
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

  showNewForm () {
    this.setState({showNewForm: !this.state.showNewForm});
    this.getScenes();
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
      return <div key={scene.id} className="nav-link"><Link to={sceneUrl}>{scene.name}  &#62;</Link></div>
    });

    if (this.state.showNewForm === true) {
      return (
        <div className="left-bar">
          <NewSceneForm showNewForm={this.showNewForm.bind(this)} encounterId={this.props.params.encounter_id}></NewSceneForm>
          <button className="form-button" onClick={this.showNewForm.bind(this)}>Cancel</button>
        </div>
      )
    } else if (this.state.showForm === true) {
      return (
        <div className="left-bar">
          <div className="nav-back">
            <Link to={campaignUrl}>&#60; Encounters</Link>
          </div>
          <h3>Edit Encounter</h3>
          <form className="edit-form" onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="name">Name: </label>
            <input className="text-input" type="text" id="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
            <br />
            <label htmlFor="active">Active: </label>
            <input type="checkbox" id="active" checked={this.state.active} onChange={this.handleActiveChange.bind(this)}/>
            <br />
            <input className="form-button" type="submit" value="Save Changes" />
          </form>
          <button className="form-button" onClick={this.showForm.bind(this)}>Cancel</button>
        </div>
      )
    } else {
      return (
        <div>
          <div className="page-name">
            <h2>{this.state.name}</h2>
            <button className="edit-button" onClick={this.showForm.bind(this)}></button>
          </div>
          <div className="left-bar">
            <div className="nav-back">
              <Link to={campaignUrl}>&#60; Encounters</Link>
            </div>
            <h3>Select a Scene:</h3>
            <div className="nav-link-container">
              {sceneNodes}
            </div>
            <button className="nav-link add-button" onClick={this.showNewForm.bind(this)}>Add New +</button>
          </div>
        </div>
      );
    }
  }
}


export default Encounter;
