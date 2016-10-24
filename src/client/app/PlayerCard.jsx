import React from 'react';
import urls from '../scripts/urls.js';

class PlayerCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      showForm: false,
      name: this.props.details.name,
      class: this.props.details.class,
      race: this.props.details.race,
      armor_class: this.props.details.armor_class,
      initiative: this.props.details.initiative,
      fortitude: this.props.details.fortitude,
      reflex: this.props.details.reflex,
      will: this.props.details.will,
      speed: this.props.details.speed,
      current_effects: this.props.details.current_effects,
      current_hit_points: this.props.details.current_hit_points,
      max_hit_points: this.props.details.max_hit_points,
      passive_insight: this.props.details.passive_insight,
      passive_perception: this.props.details.passive_perception,
      xp: this.props.details.xp,
      level: this.props.details.level,
      active: this.props.details.active
    };
  }

  showDetails () {
    this.setState({showForm: false, showDetails: !this.state.showDetails});
  }

  showForm () {
    this.setState({showForm: !this.state.showForm});
  }

  handleNameChange (e) {
    this.setState({name: e.target.value});
  }

  handleClassChange (e) {
    this.setState({class: e.target.value});
  }

  handleRaceChange (e) {
    this.setState({race: e.target.value});
  }

  handleArmorClassChange (e) {
    this.setState({armor_class: e.target.value});
  }

  handleInitiativeChange (e) {
    this.setState({initiative: e.target.value});
  }

  handleFortitudeChange (e) {
    this.setState({fortitude: e.target.value});
  }

  handleReflexChange (e) {
    this.setState({reflex: e.target.value});
  }

  handleWillChange (e) {
    this.setState({will: e.target.value});
  }

  handleSpeedChange (e) {
    this.setState({speed: e.target.value});
  }

  handleCurrentEffectsChange (e) {
    this.setState({current_effects: e.target.value});
  }

  handleCurrentHitPointsChange (e) {
    this.setState({current_hit_points: e.target.value});
  }

  handleMaxHitPointsChange (e) {
    this.setState({max_hit_points: e.target.value});
  }

  handlePassiveInsightChange (e) {
    this.setState({passive_insight: e.target.value});
  }

  handlePassivePerceptionChange (e) {
    this.setState({passive_perception: e.target.value});
  }

  handleXPChange (e) {
    this.setState({xp: e.target.value});
  }

  handleLevelChange (e) {
    this.setState({level: e.target.value});
  }

  handleActiveChange (e) {
    this.setState({active: !this.state.active});
  }

  handleSubmit() {
    $.ajax({
      url: urls.getPlayers + this.props.details.id,
      dataType: 'json',
      type: 'POST',
      data: this.state,
      success: function() {
        this.setState({showForm: false});
        this.props.refresh();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    if (this.state.showForm) {
      return (
        <div>
          <div className="nav-link highlight" onClick={this.showDetails.bind(this)}>{this.props.details.name} &#62;</div>
          <div className="show-details">
            <h2>Edit Player</h2>
            <form className="edit-form" onSubmit={this.handleSubmit.bind(this)}>
              <label htmlFor="name">Name: </label>
              <input className="player-input" type="text" id="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/><br />
              <label htmlFor="xp">XP: </label>
              <input className="player-input" type="number" id="xp" value={this.state.xp} onChange={this.handleXPChange.bind(this)}/><br />
              <label htmlFor="level">Level: </label>
              <input className="player-input" type="number" id="level" value={this.state.level} onChange={this.handleLevelChange.bind(this)}/><br />
              <label htmlFor="race">Race: </label>
              <input className="player-input" type="text" id="race" value={this.state.race} onChange={this.handleRaceChange.bind(this)}/><br />
              <label htmlFor="class">Class: </label>
              <input className="player-input" type="text" id="class" value={this.state.class} onChange={this.handleClassChange.bind(this)}/><br />
              <label htmlFor="current_hit_points">Current HP: </label>
              <input className="player-input" type="number" id="current_hit_points" value={this.state.current_hit_points} onChange={this.handleCurrentHitPointsChange.bind(this)}/><br />
              <label htmlFor="max_hit_points">Max HP: </label>
              <input className="player-input" type="number" id="max_hit_points" value={this.state.max_hit_points} onChange={this.handleMaxHitPointsChange.bind(this)}/><br />
              <label htmlFor="initiative">Initiative: </label>
              <input className="player-input" type="number" id="initiative" value={this.state.initiative} onChange={this.handleInitiativeChange.bind(this)}/><br />
              <label htmlFor="armor_class">AC: </label>
              <input className="player-input" type="number" id="armor_class" value={this.state.armor_class} onChange={this.handleArmorClassChange.bind(this)}/><br />
              <label htmlFor="fortitude">Fortitude: </label>
              <input className="player-input" type="number" id="fortitude" value={this.state.fortitude} onChange={this.handleFortitudeChange.bind(this)}/><br />
              <label htmlFor="reflex">Reflex: </label>
              <input className="player-input" type="number" id="reflex" value={this.state.reflex} onChange={this.handleReflexChange.bind(this)}/><br />
              <label htmlFor="will">Will: </label>
              <input className="player-input" type="number" id="will" value={this.state.will} onChange={this.handleWillChange.bind(this)}/><br />
              <label htmlFor="speed">Speed: </label>
              <input className="player-input" type="number" id="speed" value={this.state.speed} onChange={this.handleSpeedChange.bind(this)}/><br />
              <label htmlFor="passive_insight">Passive Insight: </label>
              <input className="player-input" type="number" id="passive_insight" value={this.state.passive_insight} onChange={this.handlePassiveInsightChange.bind(this)}/><br />
              <label htmlFor="passive_perception">Passive Perception: </label>
              <input className="player-input" type="number" id="passive_perception" value={this.state.passive_perception} onChange={this.handlePassivePerceptionChange.bind(this)}/><br />
              <label htmlFor="current_effects">Current Effects: </label>
              <input className="player-input" type="text" id="current_effects" value={this.state.current_effects} onChange={this.handleCurrentEffectsChange.bind(this)}/><br />
              <label htmlFor="active">Active: </label>
              <input className="player-input" type="checkbox" id="active" checked={this.state.active} onChange={this.handleActiveChange.bind(this)}/><br />
              <input className="form-button" type="submit" value="Save Changes" />
            </form>
            <button className="form-button" onClick={this.showForm.bind(this)}>Cancel</button>
          </div>
        </div>
      );
    } else if (this.state.showDetails) {
      return (
        <div>
          <div className="nav-link highlight" onClick={this.showDetails.bind(this)}>{this.props.details.name} &#62;</div>
          <div className="show-details">
            <button className="edit-button" onClick={this.showForm.bind(this)}></button>
            <p>Name: {this.props.details.name}</p>
            <p>XP: {this.props.details.xp_value}</p>
            <p>Race: {this.props.details.race}</p>
            <p>Class: Level {this.props.details.level} {this.props.details.class}</p>
            <p>HP: {this.props.details.current_hit_points} / {this.props.details.max_hit_points}</p>
            <p>Initiative: {this.props.details.initiative}</p>
            <p>AC: {this.props.details.armor_class}</p>
            <p>Fortitude: {this.props.details.fortitude}</p>
            <p>Reflex: {this.props.details.reflex}</p>
            <p>Will: {this.props.details.will}</p>
            <p>Speed: {this.props.details.speed}</p>
            <p>Passive Insight: {this.props.details.passive_insight}</p>
            <p>Passive Perception: {this.props.details.passive_perception}</p>
            <p>Current Effects: {this.props.details.current_effects}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="nav-link" onClick={this.showDetails.bind(this)}>{this.props.details.name} &#62;</div>
        </div>
      );
    }
  }
}


export default PlayerCard;
