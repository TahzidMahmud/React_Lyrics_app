import React, { Component } from "react";
import "../../src/App.css";
import axios from "axios";
import { Consumer } from "../Context";
class Search extends Component {
  constructor() {
    super();
    this.state = {
      trackTitle: "",
      count: "true",
    };
  }

  findTrack = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list,
        });
        this.setState({ trackTitle: "" }); //clear the field
      })

      .catch((err) => console.log(err));
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  counter = () => {
    this.listenSpeak();
  };
  //voice part//

  listenSpeak = (e) => {
    //set speeches to read out by the api
    const bash = window.bash;

    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new speechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    if (this.state.count === "true") {
      recognition.start();
      recognition.onstart = () => {
        const speech = new SpeechSynthesisUtterance();

        speech.text = "listening"; //the real speech
        speech.lang = "en-IN";
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 0.9;
        //listen to the command and talk back

        window.speechSynthesis.speak(speech);

        this.setState({ count: "false" });
      };
    } else if (this.state.count === "false") {
      recognition.start();
      recognition.onstart = () => {
        const speech = new SpeechSynthesisUtterance();

        speech.text = "searching"; //the real speech
        speech.lang = "en-IN";
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 0.9;
        //listen to the command and talk back

        window.speechSynthesis.speak(speech);
        recognition.stop();
      };
      this.setState({ count: "true" });
      //this.setState({ trackTitle: "" });
    }

    //the event here holds the string we talked jus now !!
    recognition.onresult = function (event) {
      //getting the result index
      const currentcommand = event.resultIndex;
      //accessing the voice string from the window
      const transcript = event.results[currentcommand][0].transcript;
      recognition.stop();

      document.getElementById("input").value = transcript;
      window.bash = transcript;

      readOut(transcript);
    };
    this.setState({ trackTitle: bash });

    //function to synthasis the command and talk back

    function readOut(command) {
      //initiating the synthesis
      const speech = new SpeechSynthesisUtterance();
      speech.lang = "en-IN";
      speech.text =
        "you said" + command + "click again on the mic icon for search"; //the real speech
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 0.9;

      //listen to the command and talk back

      window.speechSynthesis.speak(speech);

      //
    }
  };

  ////voice part finshedd//
  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <React.Fragment>
              <div className="row">
                <div className="wrapper ">
                  <form onSubmit={this.findTrack.bind(this, dispatch)}>
                    <input
                      className="form-control-lg col-8 "
                      placeholder="Enter Title To search"
                      name="trackTitle"
                      id="input"
                      value={this.state.trackTitle}
                      onChange={this.onChange}
                    />

                    <button
                      onClick={this.findTrack.bind(this, dispatch)}
                      className=" btn ml-3 mr-1  btn-small btn-radial btn-small btn-outline-info"
                    >
                      <i className="fas fa-search" />
                    </button>
                    <button
                      onClick={this.counter.bind(this)}
                      className=" btn m-1 btn-small btn-radial btn-small btn-outline-info "
                    >
                      <i className="fas fa-microphone" />
                    </button>
                  </form>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}
export default Search;
