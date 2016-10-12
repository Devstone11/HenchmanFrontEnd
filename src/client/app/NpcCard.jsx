import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';

class NpcCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      showForm: false,
      raceAbilities: [],
      items: [],
      npc_name: this.props.details.npc_name,
      npc_notes: this.props.details.npc_notes,
      current_effects: this.props.details.current_effects,
      current_hit_points: this.props.details.current_hit_points,
      initiative: this.props.details.initiative,
      loot: this.props.details.loot,
      npc_active: this.props.details.npc_active
    };
  }

  handleNameChange (e) {
    this.setState({npc_name: e.target.value});
  }

  handleNotesChange (e) {
    this.setState({npc_notes: e.target.value});
  }

  handleCurrentEffectsChange (e) {
    this.setState({current_effects: e.target.value});
  }

  handleCurrentHitPointsChange (e) {
    this.setState({current_hit_points: e.target.value});
  }

  handleInitiativeChange (e) {
    this.setState({initiative: e.target.value});
  }

  handleLootChange (e) {
    this.setState({loot: e.target.value});
  }

  handleActiveChange (e) {
    this.setState({npc_active: !this.state.npc_active});
  }

  componentWillMount () {
    $.ajax({
      url: urls.getRaceAbilities + this.props.details.race_id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({raceAbilities: data.rows});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });

    $.ajax({
      url: urls.getItems + this.props.details.npc_id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({items: data.rows});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
    console.log(this.state.current_hit_points);
  }

  handleSubmit () {
    $.ajax({
      url: urls.getNPCs + this.props.details.npc_id,
      dataType: 'json',
      type: 'POST',
      data: this.state,
      success: function() {
        this.setState({showForm: false});
        this.props.refresh();
        console.log('post succeeded!');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  showDetails () {
    this.setState({showForm: false, showDetails: !this.state.showDetails});
  }

  showForm () {
    this.setState({showForm: !this.state.showForm});
  }

  render() {
    if (this.state.showForm === true) {
      return (
        <div>
          <div>
            <div className="nav-link" onClick={this.showDetails.bind(this)}>{this.props.details.npc_name} &#62;</div>
          </div>
          <div className="show-details">
            <h2>Edit NPC</h2>
            <form className="edit-form" onSubmit={this.handleSubmit.bind(this)}>
              <label className="scene-form-label" htmlFor="name">Name: </label>
              <br />
              <input className="text-input" type="text" id="name" value={this.state.npc_name} onChange={this.handleNameChange.bind(this)}/>
              <br />
              <label className="scene-form-label" htmlFor="notes">Notes: </label>
              <br />
              <textarea className="textarea-input" id="notes" value={this.state.npc_notes} onChange={this.handleNotesChange.bind(this)}/>
              <br />
              <label className="scene-form-label" htmlFor="current_hit_points">Current HP: </label>
              <br />
              <input className="text-input" type="number" id="current_hit_points" value={this.state.current_hit_points} onChange={this.handleCurrentHitPointsChange.bind(this)}/>
              <br />
              <label className="scene-form-label" htmlFor="initiative">Initiative: </label>
              <br />
              <input className="text-input" type="number" id="initiative" value={this.state.initiative} onChange={this.handleInitiativeChange.bind(this)}/>
              <br />
              <label className="scene-form-label" htmlFor="current_effects">Current Effects: </label>
              <br />
              <textarea className="textarea-input" id="current_effects" value={this.state.current_effects} onChange={this.handleCurrentEffectsChange.bind(this)}/>
              <br />
              <label className="scene-form-label" htmlFor="loot">Loot: </label>
              <br />
              <textarea className="textarea-input" id="loot" value={this.state.loot} onChange={this.handleLootChange.bind(this)}/>
              <br />
              <label className="scene-form-label" htmlFor="npc_active">Active: </label>
              <br />
              <input type="checkbox" id="npc_active" checked={this.state.npc_active} onChange={this.handleActiveChange.bind(this)}/>
              <br />
              <input className="form-button" type="submit" value="Save Changes" />
            </form>
            <button className="form-button" onClick={this.showForm.bind(this)}>Cancel</button>
          </div>
        </div>
      );
    } else if (this.state.showDetails === true) {
      var raceAbilityNodes = this.state.raceAbilities.map(function(race_ability) {
        return (
          <div className="sub-details">
            <p>Ability: {race_ability.ability_name}</p>
            <p>Notes: {race_ability.ability_notes}</p>
            <p>Range: {race_ability.ability_range}</p>
            <p>Type: {race_ability.ability_type}</p>
            <p>Attack: {race_ability.attack_roll}</p>
            <p>Type: {race_ability.damage_roll}</p>
          </div>
        )
      });
      var itemNodes = this.state.items.map(function(item) {
        return (
          <div className="sub-details">
            <p>Item: {item.item_name}</p>
            <p>Item Notes: {item.item_notes}</p>
            <p>Enhancement: {item.enhancement_amount} to {item.enhancement_target}</p>
            <p>Item Ability: {item.ability_name}: {item.ability_notes}</p>
            <p>Ability Type: {item.type}</p>
            <p>Attack: {item.attack_roll}</p>
            <p>Damage: {item.damage_roll}</p>
            <p>Range: {item.range}</p>
          </div>
        );
      })
      return (
        <div>
          <div className="nav-link" onClick={this.showDetails.bind(this)}>{this.props.details.npc_name} &#62;</div>
          <div className="show-details">
            <button className="edit-button scene-edit-button" onClick={this.showForm.bind(this)}></button>
            <p>NPC Name: {this.props.details.npc_name}</p>
            <p>NPC Notes: {this.props.details.npc_notes}</p>
            <p>Race: {this.props.details.race_name}</p>
            <p>Race Notes: {this.props.details.race_notes}</p>
            <p>Current Effects: {this.props.details.current_effects}</p>
            <p>HP: {this.props.details.current_hit_points} / {this.props.details.max_hit_points}</p>
            <p>Initiative: {this.props.details.initiative}</p>
            <p>AC: {this.props.details.armor_class}</p>
            <p>Fortitude: {this.props.details.fortitude}</p>
            <p>Reflex: {this.props.details.reflex}</p>
            <p>Will: {this.props.details.will}</p>
            <p>Speed: {this.props.details.speed}</p>
            {raceAbilityNodes}
            {itemNodes}
            <p>Loot: {this.props.details.loot}</p>
            <p>XP: {this.props.details.xp_value}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="nav-link" onClick={this.showDetails.bind(this)}>{this.props.details.npc_name} &#62;</div>
        </div>
      );
    }
  }
}


export default NpcCard;
