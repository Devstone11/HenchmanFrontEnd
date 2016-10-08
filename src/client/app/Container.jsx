import React from 'react';
import { Link } from 'react-router';
import urls from '../ajax/urls.js';

class Container extends React.Component {

  render() {
    return (
      <div>
        <h1>Henchman</h1>
        {this.props.children}
      </div>
    );
  }
}


export default Container;
