import React from 'react';
import urls from '../ajax/urls.js';

class NewNpcForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      races: [],
      npc_name: '',
      npc_notes: '',
      race_id: '',
      current_effects: '',
      initiative: '',
      loot: '',
    };
  }

  componentWillMount () {
    $.ajax({
      url: urls.getRaces,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('got the data!');
        this.setState({races: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
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
          <label htmlFor="name">Name: </label>
          <br />
          <input className="text-input" type="text" id="name" value={this.state.npc_name} onChange={this.handleNameChange.bind(this)}/>
          <br />
          <label htmlFor="race">Race: </label>
          <br />
          <select className="text-input" id="race" onChange={this.handleRaceChange.bind(this)}>
            {optionNodes}
            <option>Add New</option>
          </select>
          <br />
          <label htmlFor="notes">Notes: </label>
          <br />
          <textarea className="textarea-input" id="notes" value={this.state.npc_notes} onChange={this.handleNotesChange.bind(this)} />
          <br />
          <label htmlFor="initiative">Initiative: </label>
          <br />
          <input className="text-input" type="number" id="initiative" value={this.state.initiative} onChange={this.handleInitiativeChange.bind(this)}/>
          <br />
          <label htmlFor="current_effects">Current Effects: </label>
          <br />
          <textarea className="textarea-input" id="current_effects" value={this.state.current_effects} onChange={this.handleCurrentEffectsChange.bind(this)}/>
          <br />
          <label htmlFor="loot">Loot: </label>
          <br />
          <textarea className="textarea-input" id="loot" value={this.state.loot} onChange={this.handleLootChange.bind(this)}/>
          <input className="form-button" type="submit" value="Save Changes" />
        </form>
      </div>
    );
  }
}

export default NewNpcForm;
