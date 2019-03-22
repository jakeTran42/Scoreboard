import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../styles/App.css';
import { Switch, Route } from 'react-router-dom';

// Components Imports
import GameSearcher from './Games/GameSearcher';
import ReviewList from './Reviews/ReviewList';
import CreateReview from './Reviews/CreateReview';
import Header from './Headers/Header';
import Login from './AUTH/Login';
import Review from './Reviews/Review/Review';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1">
          <Switch>
            <Route exact path="/game/search" component={GameSearcher} />
            <Route exact path="/reviews" component={ReviewList} />
            <Route exact path="/create" component={CreateReview} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/review/:reviewId" render={(props) => <Review review={props.location.state.data.postReview}/>}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
