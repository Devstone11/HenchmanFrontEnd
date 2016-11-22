import React, {Component} from 'react'
import {render} from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Link } from 'react-router'
import User from './User.jsx';
import Campaign from './Campaign.jsx';
import Encounter from './Encounter.jsx';
import Scene from './Scene.jsx';
import Combat from './Combat.jsx';
import Container from './Container.jsx';
import Login from './Login.jsx';
import UnderConstruction from './UnderConstruction.jsx';

export default class App extends Component {
    render(){
      return (
        <Router history={hashHistory}>
          <Route path='/' component={Container}>
            <IndexRoute component={User} />
            <Route path='/login' component={Login} />
            <Route path='/campaign/:camp_id' component={Campaign} />
            <Route path='/campaign/:camp_id/encounter/:encounter_id' component={Encounter} />
            <Route path='/campaign/:camp_id/encounter/:encounter_id/scene/:scene_id' component={Scene} />
            <Route path='/campaign/:camp_id/encounter/:encounter_id/combat/:scene_id/:combat' component={Combat} />
          </Route>
        </Router>
      )
    }
}

render(<App/>, document.getElementById('app'));
