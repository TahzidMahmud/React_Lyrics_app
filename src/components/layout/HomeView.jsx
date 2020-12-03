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
    speech.rate = 1;
    speech.pitch = 2;
    //listen to the command and talk back

    window.speechSynthesis.speak(speech);
  }
  render() {
    return (
      <div className="wrap ">
        <img className="image" src={homeimage} alt="home" />
        <div className="the-para">
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
        <div className="thesearch">
          <h4>
            Search <i className="fas fa-music bounce" />
          </h4>

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
    );
  }
}

export default HomeView;
