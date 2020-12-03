import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Search from "./components/Search";

import Lyrics from "./components/Lyrics";
import Navbar from "./components/layout/Navbar";
import HomeView from "./components/layout/HomeView";
import { Link } from "react-router-dom";
import Ind from "./components/layout/ind";
import { Provider } from "./Context";

function App() {
  return (
    <Provider>
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={HomeView} />

            <Route exact path="/lyrics/track/:id" component={Lyrics} />
            <div>
              <div className="row m-2">
                <Link
                  to="/"
                  className=" btn mb-3 btn-small btn-radial btn-small btn-outline-info "
                >
                  <i className="fas fa-chevron-left" />
                  ..Back..
                </Link>
              </div>
              <div className=" row">
                <div className="col-md-10 col-sm-12 offset-1">
                  <Route exact path="/search" component={Navbar} />
                  <Route exact path="/search" component={Search} />
                </div>
              </div>
              <Route exact path="/search" component={Ind} />
            </div>
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
