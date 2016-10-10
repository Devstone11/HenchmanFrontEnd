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
          <div onClick={this.showDetails.bind(this)}>{this.props.details.name}</div>
          <div className="show-details">
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>Obstacle Name:</td>
                  <td>{this.props.details.name}</td>
                </tr>
                <tr>
                  <td>Perception Check:</td>
                  <td>DC{this.props.details.perception_check}</td>
                </tr>
                <tr>
                  <td>Attack:</td>
                  <td>{this.props.details.attack_roll} vs. {this.props.details.attack_vs}</td>
                </tr>
                <tr>
                  <td>Damage:</td>
                  <td>{this.props.details.damage_roll}</td>
                </tr>
                <tr>
                  <td>Notes:</td>
                  <td>{this.props.details.obstacle_notes}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div onClick={this.showDetails.bind(this)}>{this.props.details.name}</div>
        </div>
      );
    }
  }
}


export default ObstacleCard;
