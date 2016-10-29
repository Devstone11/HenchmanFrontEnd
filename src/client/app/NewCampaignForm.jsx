import React from 'react';
import cookie from 'react-cookie';
import urls from '../scripts/urls.js';

class NewCampaignForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      userId: cookie.load("userId")
    };
  }

  handleNameChange (e) {
    this.setState({name: e.target.value});
  }

  handleSubmit() {
    $.ajax({
      url: urls.getEncounters + 'new/userId',
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
          <h3>New Campaign Name: </h3>
          <input className="text-input" type="text" id="name" onChange={this.handleNameChange.bind(this)}/>
          <input className="form-button" type="submit" value="Save Changes" />
        </form>
      </div>
    );
  }
}

export default NewCampaignForm;
