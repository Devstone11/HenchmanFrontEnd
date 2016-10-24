import React from 'react';
import urls from '../scripts/urls.js';

class NewObstacleForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      perception_check: '',
      attack_roll: '',
      attack_vs: '',
      damage_roll: '',
      obstacle_notes: ''
    };
  }

  handleNameChange (e) {
    this.setState({npc_name: e.target.value});
  }

  handleRaceChange (e) {
    this.setState({race_id: e.target.value});
  }

  handleNotesChange (e) {
    this.setState({npc_notes: e.target.value});
  }

  handleCurrentEffectsChange (e) {
    this.setState({current_effects: e.target.value});
  }

  handleInitiativeChange (e) {
    this.setState({initiative: e.target.value});
  }

  handleLootChange (e) {
    this.setState({loot: e.target.value});
  }

  handleSubmit () {
    $.ajax({
      url: urls.newNpc + this.props.sceneId,
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

  render() {
    var formThis = this;
    this.state.races;
    var optionNodes = this.state.races.map(function(race) {
      return <option value={race.id}>{race.name}</option>
    })
    return (
      <div>
        <form className="edit-form" onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="name">NPC Name: </label>
          <input type="text" id="name" value={this.state.npc_name} onChange={this.handleNameChange.bind(this)}/>
          <label htmlFor="race">Race: </label>
          <select id="race" onChange={this.handleRaceChange.bind(this)}>
            {optionNodes}
            <option>Add New</option>
          </select>
          <label htmlFor="notes">Notes: </label>
          <textarea id="notes" value={this.state.npc_notes} onChange={this.handleNotesChange.bind(this)} />
          <label htmlFor="initiative">Initiative: </label>
          <input type="number" id="initiative" value={this.state.initiative} onChange={this.handleInitiativeChange.bind(this)}/>
          <label htmlFor="current_effects">Current Effects: </label>
          <textarea id="current_effects" value={this.state.current_effects} onChange={this.handleCurrentEffectsChange.bind(this)}/>
          <label htmlFor="loot">Loot: </label>
          <textarea id="loot" value={this.state.loot} onChange={this.handleLootChange.bind(this)}/>
          <input type="submit" value="Save Changes" />
        </form>
      </div>
    );
  }
}

export default NewObstacleForm;
