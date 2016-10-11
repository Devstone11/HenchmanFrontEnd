import React from 'react';
import urls from '../ajax/urls.js';

class NewCampaignForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleNameChange (e) {
    this.setState({name: e.target.value});
  }

  handleSubmit() {
    $.ajax({
      url: urls.getEncounters,
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
          <label htmlFor="name">New Campaign Name: </label>
          <input type="text" id="name" onChange={this.handleNameChange.bind(this)}/>
          <input type="submit" value="Save Changes" />
        </form>
      </div>
    );
  }
}

export default NewCampaignForm;