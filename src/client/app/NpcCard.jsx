import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';

class NpcCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      raceAbilities: [],
      items: []
    };
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
  }

  showDetails () {
    this.setState({showDetails: !this.state.showDetails});
  }

  render() {
    if (this.state.showDetails === true) {
      var raceAbilityNodes = this.state.raceAbilities.map(function(race_ability) {
        return (
          <div>
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
          <div>
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
          <div onClick={this.showDetails.bind(this)}>{this.props.details.npc_name}</div>
          <div className="show-details">
            <div>
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
        </div>
      );
    } else {
      return (
        <div>
          <div onClick={this.showDetails.bind(this)}>{this.props.details.npc_name}</div>
        </div>
      );
    }
  }
}


export default NpcCard;
