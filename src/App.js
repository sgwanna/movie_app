import React, {Component} from 'react';
import './App.css';
import Movie from './Movie';
import InfiniteScroll from 'react-infinite-scroll-component';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './Header';

import YTS from './Yifi';
import KO from './Kobis';

class App extends Component {
  render() {
    return (<Router>
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={YTS}/>
          <Route path="/yts" component={YTS}/>
          <Route path="/boxOffice" component={KO}/>
        </Switch>
      </div>
    </Router>);
  }
}

export default App;
