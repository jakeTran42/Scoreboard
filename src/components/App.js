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
import NotFound from './RouteConfig/404'
import ErrorPage from './RouteConfig/ErrorPage'
// import Medium from './Medium'

class App extends Component {
  render() {
    return (
      <div className="appContainer">
        <Header />
        <div className="appWrapper">
          <Switch>
            <Route exact path="/" />
            <Route exact path="/game/search" component={GameSearcher} />
            <Route exact path="/reviews" component={ReviewList} />
            <Route exact path="/create" render={(props) => <CreateReview game={props.location.state}/>} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/review/:reviewId" component={Review}/>
            <Route exact path="/error" component={ErrorPage} />
            {/* <Route exact path="/medium" component={Medium} /> */}
            <Route path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
