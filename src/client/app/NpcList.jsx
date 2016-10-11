import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';
import NpcCard from './NpcCard.jsx';
import NewNpcForm from './NewNpcForm.jsx';

class NpcList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      npcs: [],
      showForm: false,
    };
  }

  componentWillMount () {
    this.getNpcs();
  }

  getNpcs () {
    $.ajax({
      url: urls.getNPCs + this.props.sceneId,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({npcs: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }

  showForm () {
    this.setState({showForm: !this.state.showForm});
    this.getNpcs();
  }

  render() {
    var listThis = this;
    if (this.state.showForm === true ) {
      return (
        <div>
          <h2>New NPC</h2>
          <NewNpcForm sceneId={this.props.sceneId} refresh={this.showForm.bind(this)}></NewNpcForm>
          <button onClick={this.showForm.bind(this)}>Cancel</button>
        </div>
      );
    } else {
      var npcNodes = this.state.npcs.map(function(npc) {
        return <NpcCard details={npc} refresh={listThis.getNpcs.bind(listThis)}></NpcCard>
      })
      return (
        <div className="middle-link-container">
          {npcNodes}
          <button className="nav-link scene-add-button" onClick={this.showForm.bind(this)}>Add New +</button>
        </div>
      );
    }
  }
}


export default NpcList;
