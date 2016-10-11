import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';

class Container extends React.Component {

  render() {
    var backgroundDiv;
    if (this.props.params.combat) {
      backgroundDiv = <div className="background-image burningtown"></div>;
    } else if (this.props.params.scene_id) {
      backgroundDiv = <div className="background-image ships"></div>;
    } else if (this.props.params.encounter_id) {
      backgroundDiv = <div className="background-image ruins"></div>;
    } else if (this.props.params.camp_id) {
      backgroundDiv = <div className="background-image book"></div>;
    } else {
      backgroundDiv = <div className="background-image vikings"></div>;
    }
    return (
      <div>
        {backgroundDiv}
        <header className="header">
          <h1>Henchman</h1>
          <span id="logout">Logout</span>
        </header>
        {this.props.children}
      </div>
    );
  }
}


export default Container;
