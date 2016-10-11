import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';
import NewEncounterForm from './NewEncounterForm.jsx';

class Campaign extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      encounters: [],
      showForm: false,
      showNewForm: false,
      name: '',
      active: ''
    };
  }

  getEncounters () {
    $.ajax({
      url: urls.getEncounters + this.props.params.camp_id,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          encounters: data.encounters,
          name: data.campaign.name,
          active: data.campaign.active
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }

  componentWillMount () {
    this.getEncounters();
  }

  showForm () {
    this.setState({showForm: !this.state.showForm});
  }

  showNewForm () {
    this.setState({showNewForm: !this.state.showNewForm});
    this.getEncounters();
  }

  handleNameChange (e) {
    this.setState({name: e.target.value});
  }

  handleActiveChange (e) {
    this.setState({active: !this.state.active});
  }

  handleSubmit() {
    $.ajax({
      url: urls.getEncounters + this.props.params.camp_id,
      dataType: 'json',
      type: 'POST',
      data: this.state,
      success: function() {
        this.setState({showForm: false});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    var campaignThis = this;
    var encounterNodes = this.state.encounters.map(function(encounter) {
      var url = '/campaign/' + campaignThis.props.params.camp_id + '/encounter/' + encounter.id;
      return <div><Link to={url}>{encounter.name}</Link></div>
    });

    if (this.state.showNewForm === true) {
      return (
        <div>
          <NewEncounterForm showNewForm={this.showNewForm.bind(this)} campaignId={this.props.params.camp_id}></NewEncounterForm>
          <button onClick={this.showNewForm.bind(this)}>Cancel</button>
        </div>
      );
    } else if (this.state.showForm === true) {
      return (
        <div>
          <Link to='/'>Back to Campaigns</Link>
          <form className="edit-form" onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
            <label htmlFor="active">Active: </label>
            <input type="checkbox" id="active" checked={this.state.active} onChange={this.handleActiveChange.bind(this)}/>
            <input type="submit" value="Save Changes" />
          </form>
          <button onClick={this.showForm.bind(this)}>Cancel</button>
        </div>
      )
    } else {
      return (
        <div>
          <Link to='/'>Back to Campaigns</Link>
          <h2>{this.state.name}</h2>
          <button onClick={this.showForm.bind(this)}>Edit</button>
          <h3>Select an Encounter:</h3>
          {encounterNodes}
          <button onClick={this.showNewForm.bind(this)}>Add New +</button>
        </div>
      );
    }
  }
}

export default Campaign;
