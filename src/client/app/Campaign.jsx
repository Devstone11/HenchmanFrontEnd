import React from 'react';
import { Link, hashHistory } from 'react-router';
import cookie from 'react-cookie';
import urls from '../scripts/urls.js';
import NewEncounterForm from './NewEncounterForm.jsx';

class Campaign extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      encounters: [],
      showForm: false,
      showNewForm: false,
      showConfirm: false,
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

  showConfirm () {
    this.setState({showConfirm: !this.state.showConfirm});
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

  submitDelete() {
    $.ajax({
      url: urls.deleteCampaign + this.props.params.camp_id,
      dataType: 'json',
      type: 'POST',
      data: {userId: cookie.load('userId')},
      success: function() {
        hashHistory.push("/");
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
      return <div key={encounter.id} className="nav-link"><Link to={url}>{encounter.name}  &#62;</Link></div>
    });

    if (this.state.showNewForm === true) {
      return (
        <div>
          <div className="page-name">
            <h2>{this.state.name}</h2>
          </div>
          <div className="left-bar">
            <NewEncounterForm showNewForm={this.showNewForm.bind(this)} campaignId={this.props.params.camp_id}></NewEncounterForm>
            <button className="form-button" onClick={this.showNewForm.bind(this)}>Cancel</button>
          </div>
        </div>
      );
    } else if (this.state.showForm === true) {
      return (
        <div className="left-bar">
          <div className="nav-back">
            <Link to='/'>&#60; Campaigns</Link>
          </div>
          <h3>Edit Campaign</h3>
          <form className="edit-form" onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="name">Name: </label>
            <input className="text-input" type="text" id="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>
            <br />
            <label htmlFor="active">Active: </label>
            <input type="checkbox" id="active" checked={this.state.active} onChange={this.handleActiveChange.bind(this)}/>
            <br />
            <input className="form-button" type="submit" value="Save Changes" />
          </form>
          <button className="form-button" onClick={this.showForm.bind(this)}>Cancel</button>
        </div>
      )
    } else if (this.state.showConfirm === true) {
      return (
        <div className="left-bar">
          <div className="nav-back">
            <Link to='/'>&#60; Campaigns</Link>
          </div>
          <h3>Delete this Campaign?</h3>
          <h4>(This will permanently delete all associated encounters, scenes, obstacles, NPCs, and PCs)</h4>
          <button className="form-button" onClick={this.submitDelete.bind(this)}>Confirm</button>
          <button className="form-button" onClick={this.showConfirm.bind(this)}>Cancel</button>
        </div>
      )
    } else {
      return (
        <div>
          <div className="page-name">
            <h2>{this.state.name}</h2>
            <div className="button-box">
              <button className="name-button edit" onClick={this.showForm.bind(this)}></button>
              <button className="name-button delete" onClick={this.showConfirm.bind(campaignThis)}></button>
            </div>
          </div>
          <div className="left-bar">
            <div className="nav-back">
              <Link to='/'>&#60; Campaigns</Link>
            </div>
            <h3>Select an Encounter:</h3>
            <div className="nav-link-container">
              {encounterNodes}
            </div>
            <button className="nav-link add-button" onClick={this.showNewForm.bind(this)}>Add New +</button>
          </div>
        </div>
      );
    }
  }
}

export default Campaign;
