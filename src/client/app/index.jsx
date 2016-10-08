
import React from 'react';
import {render} from 'react-dom';
import UserContainer from './UserContainer.jsx';
import urls from '../ajax/urls.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'Parent Component',
    };
  }

  render () {
    return (
      <div>
        <p onClick={this.state.onClick}> This is the: {this.state.name}!</p>
        <UserContainer name='Child Component Prop' url={urls.getUsers}/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
