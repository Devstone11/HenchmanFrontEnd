import React from 'react';
import { browserHistory } from 'react-router';

class UnderConstruction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h1>This site is currently under construction. Come back soon!</h1>
      </div>
    );
  }
}

export default UnderConstruction;
