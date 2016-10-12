import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';

class ObstacleCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    };
  }

  showDetails () {
    this.setState({showDetails: !this.state.showDetails});
  }

  render() {
    if (this.state.showDetails === true) {
      return (
        <div>
          <div className="nav-link" onClick={this.showDetails.bind(this)}>{this.props.details.name} &#62;</div>
          <div className="show-details">
            <p>Obstacle Name: {this.props.details.name}</p>
            <p>Perception Check: >DC{this.props.details.perception_check}</p>
            <p>Attack: {this.props.details.attack_roll} vs. {this.props.details.attack_vs}</p>
            <p>Damage: {this.props.details.damage_roll}</p>
            <p>Notes: {this.props.details.obstacle_notes}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="nav-link" onClick={this.showDetails.bind(this)}>{this.props.details.name} &#62;</div>
        </div>
      );
    }
  }
}


export default ObstacleCard;
