import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';
import ObstacleCard from './ObstacleCard.jsx';
import NpcCard from './NpcCard.jsx';

class Scene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      obstacles: [],
      npcs: [],
      showForm: false,
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

  getObstacles () {
    if (this.state.obstacles.length > 0) {
      this.setState({obstacles: []});
    } else {
      this.setState({npcs: []});
      $.ajax({
        url: urls.getObstacles + this.props.params.scene_id,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({obstacles: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      })
    }
  }

  getNPCs () {
    if (this.state.npcs.length > 0) {
      this.setState({npcs: []});
    } else {
      this.setState({obstacles: []});
      $.ajax({
        url: urls.getNPCs + this.props.params.scene_id,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({npcs: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      })
    }
  }

  render() {
    var sceneThis = this;
    var encounterUrl = '/campaign/' + this.props.params.camp_id + '/encounter/' + this.props.params.encounter_id;
    var combatUrl = encounterUrl + '/combat/' + this.props.params.scene_id;
    if (this.state.showForm === true ) {
      return (
        <div>
          <Link to={encounterUrl}>Back to Encounter Page</Link>
          <h2>Edit Scene</h2>
          <form className="edit-form" onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
            <label htmlFor="description">Description: </label>
            <textarea rows="4" cols="50" id="description" value={this.state.setting_description} onChange={this.handleDescriptionChange.bind(this)}/>
            <label htmlFor="loot">Misc Loot: </label>
            <textarea rows="4" cols="50" id="loot" value={this.state.misc_loot} onChange={this.handleLootChange.bind(this)}/>
            <label htmlFor="active">Active: </label>
            <input type="checkbox" id="active" checked={this.state.active} onChange={this.handleActiveChange.bind(this)}/>
            <input type="submit" value="Save Changes" />
          </form>
          <button onClick={this.showForm.bind(this)}>Cancel</button>
        </div>
      );
    } else if (this.state.obstacles.length > 0) {
      var obstacleNodes = this.state.obstacles.map(function(obstacle) {
        return <ObstacleCard details={obstacle}>{obstacle.name}</ObstacleCard>
      })
      return (
        <div>
          <Link to={encounterUrl}>Back to Encounter Page</Link>
          <h1>{this.state.name}</h1>
          <button onClick={sceneThis.getObstacles.bind(sceneThis)}>Obstacles</button>
          <button onClick={sceneThis.getNPCs.bind(sceneThis)}>NPCs</button>
          <div className="list-section">
            {obstacleNodes}
          </div>
          <Link to={combatUrl}>To Combat Page</Link>
        </div>
      );
    } else if (this.state.npcs.length > 0){
      var npcNodes = this.state.npcs.map(function(npc) {
        return <NpcCard details={npc}>{npc.npc_name}</NpcCard>
      })
      return (
        <div>
          <Link to={encounterUrl}>Back to Encounter Page</Link>
          <h1>{this.state.name}</h1>
          <button onClick={this.getObstacles.bind(this)}>Obstacles</button>
          <button onClick={this.getNPCs.bind(this)}>NPCs</button>
          <div className="list-section">
            {npcNodes}
          </div>
          <Link to={combatUrl}>To Combat Page</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={encounterUrl}>Back to Encounter Page</Link>
          <h1>{this.state.name}</h1>
          <button onClick={this.showForm.bind(this)}>Edit</button>
          <div className="list-section">
            <h2>Description</h2>
            {this.state.setting_description}
            <h2>Misc Loot</h2>
            {this.state.misc_loot}
          </div>
          <button onClick={this.getObstacles.bind(this)}>Obstacles</button>
          <button onClick={this.getNPCs.bind(this)}>NPCs</button>
          <Link to={combatUrl}>To Combat Page</Link>
        </div>
      );
    }
  }
}


export default Scene;
