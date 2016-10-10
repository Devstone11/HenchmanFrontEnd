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
      npcs: []
    };
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
    if (this.state.obstacles.length > 0) {
      var obstacleNodes = this.state.obstacles.map(function(obstacle) {
        return <ObstacleCard details={obstacle}>{obstacle.name}</ObstacleCard>
        // return <div>{obstacle.name}</div>
      })
      return (
        <div>
          <Link to={encounterUrl}>Back to Encounter Page</Link>
          <h1>Scene Page!</h1>
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
          <h1>Scene Page!</h1>
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
          <h1>Scene Page!</h1>
          <button onClick={this.getObstacles.bind(this)}>Obstacles</button>
          <button onClick={this.getNPCs.bind(this)}>NPCs</button>
          <Link to={combatUrl}>To Combat Page</Link>
        </div>
      );
    }
  }
}


export default Scene;
