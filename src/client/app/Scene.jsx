import React from 'react';
import { Link } from 'react-router';
import urls from '../scripts/urls.js';
import NpcList from './NpcList.jsx';
import ObstacleList from './ObstacleList.jsx';

class Scene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showNpcs: false,
      showObstacles: false,
      name: '',
      setting_description: '',
      misc_loot: '',
      scene_id: '',
      active: false
    };
  }

  componentWillMount () {
    $.ajax({
      url: urls.getOneScene + this.props.params.scene_id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          name: data.name,
          setting_description: data.setting_description,
          misc_loot: data.misc_loot,
          scene_id: data.id,
          active: data.active
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

  showNpcs () {
    this.setState({showNpcs: !this.state.showNpcs, showObstacles: false});
  }

  showObstacles () {
    this.setState({showNpcs: false, showObstacles: !this.state.showObstacles});
  }

  handleNameChange (e) {
    this.setState({name: e.target.value});
  }

  handleDescriptionChange (e) {
    this.setState({setting_description: e.target.value});
  }

  handleLootChange (e) {
    this.setState({misc_loot: e.target.value});
  }

  handleActiveChange (e) {
    this.setState({active: !this.state.active});
  }

  handleSubmit() {
    $.ajax({
      url: urls.getOneScene + this.state.scene_id,
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
    var sceneThis = this;
    var encounterUrl = '/campaign/' + this.props.params.camp_id + '/encounter/' + this.props.params.encounter_id;
    var combatUrl = encounterUrl + '/combat/' + this.props.params.scene_id + '/' + 1;
    var leftBar = (
      <div className="left-bar">
        <div className="nav-back">
          <Link to={encounterUrl}>&#60; Scenes</Link>
        </div>
        <div className="list-section">
          <h3>{this.state.name}</h3>
          <div className="nav-link scene-nav"><a onClick={this.showObstacles.bind(this)}>Obstacles &#62;</a></div>
          <div className="nav-link scene-nav"><a onClick={this.showNpcs.bind(this)}>NPCs &#62;</a></div>
          <div className="combat-link">
            <Link to={combatUrl}>Combat &#62;</Link>
          </div>
        </div>
      </div>
    )
    if (this.state.showForm === true ) {
      return (
        <div>
          <div className="left-bar">
            <div className="nav-back">
              <Link to={encounterUrl}>&#60; Scenes</Link>
            </div>
            <div className="list-section">
              <h3>{this.state.name}</h3>
              <div className="nav-link scene-nav"><a onClick={this.showObstacles.bind(this)}>Obstacles &#62;</a></div>
              <div className="nav-link scene-nav"><a onClick={this.showNpcs.bind(this)}>NPCs &#62;</a></div>
              <div className="combat-link">
                <Link to={combatUrl}>Combat &#62;</Link>
              </div>
            </div>
          </div>
          <div className="page-name scene-main">
            <h2>Edit Scene</h2>
            <form className="edit-form" onSubmit={this.handleSubmit.bind(this)}>
              <label className="scene-form-label" htmlFor="name">Name: </label>
              <br />
              <input className="text-input" type="text" id="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
              <br />
              <label className="scene-form-label" htmlFor="description">Description: </label>
              <textarea className="textarea-input" rows="4" cols="50" id="description" value={this.state.setting_description} onChange={this.handleDescriptionChange.bind(this)}/>
              <br />
              <label className="scene-form-label" htmlFor="loot">Misc Loot: </label>
              <br />
              <textarea className="textarea-input" rows="4" cols="50" id="loot" value={this.state.misc_loot} onChange={this.handleLootChange.bind(this)}/>
              <br />
              <label className="scene-form-label" htmlFor="active">Active: </label>
              <input type="checkbox" id="active" checked={this.state.active} onChange={this.handleActiveChange.bind(this)}/>
              <br />
              <input className="form-button" type="submit" value="Save Changes" />
            </form>
            <button className="form-button" onClick={this.showForm.bind(this)}>Cancel</button>
          </div>
        </div>
      );
    } else if (this.state.showObstacles === true) {
      return (
        <div>
          <div className="left-bar">
            <div className="nav-back">
              <Link to={encounterUrl}>&#60; Scenes</Link>
            </div>
            <div className="list-section">
              <h3>{this.state.name}</h3>
              <div className="nav-link scene-nav highlight"><a onClick={this.showObstacles.bind(this)}>Obstacles &#62;</a></div>
              <div className="nav-link scene-nav"><a onClick={this.showNpcs.bind(this)}>NPCs &#62;</a></div>
              <div className="combat-link">
                <Link to={combatUrl}>Combat &#62;</Link>
              </div>
            </div>
          </div>
          <div className="middle-section">
            <ObstacleList sceneId={this.props.params.scene_id}></ObstacleList>
          </div>
        </div>
      );
    } else if (this.state.showNpcs === true){
      return (
        <div>
          <div className="left-bar">
            <div className="nav-back">
              <Link to={encounterUrl}>&#60; Scenes</Link>
            </div>
            <div className="list-section">
              <h3>{this.state.name}</h3>
              <div className="nav-link scene-nav"><a onClick={this.showObstacles.bind(this)}>Obstacles &#62;</a></div>
              <div className="nav-link scene-nav highlight"><a onClick={this.showNpcs.bind(this)}>NPCs &#62;</a></div>
              <div className="combat-link">
                <Link to={combatUrl}>Combat &#62;</Link>
              </div>
            </div>
          </div>
          <div className="middle-section">
            <NpcList sceneId={this.props.params.scene_id}></NpcList>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {leftBar}
          <div className="page-name scene-main">
            <h2>{this.state.name}</h2>
            <button className="edit-button" onClick={this.showForm.bind(this)}></button>
            <h3>Description</h3>
            <div className="scene-details">
              {this.state.setting_description}
            </div>
            <h3>Misc Loot</h3>
            <div className="scene-details">
              {this.state.misc_loot}
            </div>
          </div>
        </div>
      );
    }
  }
}


export default Scene;
