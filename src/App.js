import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Search from "./components/Search";

import Lyrics from "./components/Lyrics";
import Navbar from "./components/layout/Navbar";
import HomeView from "./components/layout/HomeView";

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
              <div className="container">
                <Route exact path="/search" component={Navbar} />
                <Route exact path="/search" component={Search} />
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
