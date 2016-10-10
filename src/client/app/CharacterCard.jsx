import React from 'react';
import NpcCard from './NpcCard.jsx';
import PlayerCard from './PlayerCard.jsx';

class CharacterCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  refresh() {
    this.props.refresh();
    console.log('refreshed in charCard');
  }

  render() {
    if (this.props.details.npc_id) {
      return (
        <NpcCard details={this.props.details}></NpcCard>
      )
    } else {
      return (
        <PlayerCard details={this.props.details} refresh={this.refresh.bind(this)}></PlayerCard>
      )
    }
  }
}


export default CharacterCard;
