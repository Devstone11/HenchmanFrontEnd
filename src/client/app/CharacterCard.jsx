import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';
import NpcCard from './NpcCard.jsx';

class CharacterCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.details.npc_id) {
      return (
        <NpcCard details={this.props.details}>This is an NPC!</NpcCard>
      )
    } else {
      return (
        <div>This is a PC!</div>
      )
    }
  }
}


export default CharacterCard;
