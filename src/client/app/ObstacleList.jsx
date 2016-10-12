import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';
import ObstacleCard from './ObstacleCard.jsx';

class ObstacleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      obstacles: [],
      showForm: false,
    };
  }

  componentWillMount () {
    $.ajax({
      url: urls.getObstacles + this.props.sceneId,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({obstacles: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    })
  }

  showForm () {
    this.setState({showForm: !this.state.showForm});
  }

  render() {
    if (this.state.showForm === true ) {
      return (
        <div>
          <h2>New Obstacle</h2>
          <button onClick={this.showForm.bind(this)}>Cancel</button>
        </div>
      );
    } else {
      var obstacleNodes = this.state.obstacles.map(function(obstacle) {
        return <ObstacleCard details={obstacle}>{obstacle.name}</ObstacleCard>
      })
      return (
        <div className="middle-link-container">
          {obstacleNodes}
        </div>
      );
    }
  }
}


export default ObstacleList;
