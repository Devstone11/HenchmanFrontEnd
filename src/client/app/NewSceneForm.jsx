import React from 'react';
import urls from '../scripts/urls.js';

class NewSceneForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      setting_description: '',
      misc_loot: '',
    };
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

  handleSubmit() {
    $.ajax({
      url: urls.newScene + this.props.encounterId,
      dataType: 'json',
      type: 'POST',
      data: this.state,
      success: function() {
        this.props.showNewForm();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <form className="edit-form" onSubmit={this.handleSubmit.bind(this)}>
          <h3>New Scene</h3>
          <label htmlFor="name">Name: </label>
          <br />
          <input className="text-input" type="text" id="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
          <br />
          <label htmlFor="description">Setting Description: </label>
          <textarea className="textarea-input" rows="3" cols="50" id="description" value={this.state.setting_description} onChange={this.handleDescriptionChange.bind(this)}/>
          <br />
          <label htmlFor="loot">Misc Loot: </label>
          <br />
          <textarea className="textarea-input" rows="2" cols="50" id="loot" value={this.state.misc_loot} onChange={this.handleLootChange.bind(this)}/>
          <input className="form-button" type="submit" value="Save Changes" />
        </form>
      </div>
    );
  }
}

export default NewSceneForm;
