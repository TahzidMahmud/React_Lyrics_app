import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../src/App.css";
import homeimage from "../../images/p.JPG";

class HomeView extends Component {
  state = {};
  speak() {
    const speech = new SpeechSynthesisUtterance();

    speech.text =
      " welcome to the app there is a voice typing  & search feature in the app you might wanna try "; //the real speech
    speech.volume = 1;
    speech.rate = 0.9;
    speech.pitch = 0.9;
    //listen to the command and talk back

    window.speechSynthesis.speak(speech);
  }
  render() {
    return (
      // eslint-disable-next-line react/style-prop-object
      <div className="container-fluid view">
        <div className="row">
          <img
            className="image col-md-12 col-sm-12"
            src={homeimage}
            alt="home"
          />
        </div>
        <div className="row">
          <div className="the-para    ">
            <h6>
              <p>
                "One Good Thing About Music,When It Hits You, You Feel No Pain"
                <br />
                <br />
                And
                <br />
                <br />
                "Lyrics Can Emancipate Yourselves From Mental Slavery.None But
                Ourselves Can Free Our Minds"
              </p>
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="thesearch col-md-12 col-sm-12 ">
            <h4 classNmae="">Search</h4>
            <i className="fas fa-music bounce" />
            <Link to="/search">
              <button
                onClick={this.speak}
                className=" btn ml-3 mr-1  btn-small btn-radial  btn-small btn-outline-info"
              >
                <i className="fas fa-angle-double-right" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
