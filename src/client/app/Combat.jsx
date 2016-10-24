import React from 'react';
import { Link } from 'react-router';
import urls from '../scripts/urls.js';
import CharacterCard from './CharacterCard.jsx';

class Combat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      players: [],
      npcs: [],
    };
  }

  componentWillMount () {
    $.ajax({
      url: urls.getPlayers + this.props.params.camp_id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({players: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

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
    });
  }

  refresh() {
    $.ajax({
      url: urls.getPlayers + this.props.params.camp_id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({players: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

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
    });
  }

  render() {
    var sceneUrl = '/campaign/' + this.props.params.camp_id + '/encounter/' + this.props.params.encounter_id + '/scene/' + this.props.params.scene_id;
    var sortedList = [];
    var combatThis = this;
    this.state.npcs.forEach(function(npc) {
      sortedList.push(npc);
    });
    this.state.players.forEach(function(player) {
      sortedList.push(player);
    });
    sortedList.sort(function(a, b) {
      return b.initiative - a.initiative;
    })
    var characterNodes = sortedList.map(function(character, i) {
      return <CharacterCard key={i} details={character} refresh={combatThis.refresh.bind(combatThis)}></CharacterCard>
    })
    return (
      <div>

        <div className="middle-section">
          <div className="nav-back nav-back-scene">
            <Link to={sceneUrl}>&#60; Scene</Link>
          </div>
          {characterNodes}
        </div>

      </div>

    );
  }
}


export default Combat;
