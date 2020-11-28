import React, { Component } from "react";
import "../../src/App.css";
class Voice extends Component {
  state = {};

  //confirmatio

  listenSpeak() {
    //set speeches to read out by the api
    const speechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new speechRecognition();
    recognition.start();

    recognition.onstart = () => {
      const speech = new SpeechSynthesisUtterance();

      speech.text = " welcome to the app you can speak to micro phone"; //the real speech
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 3;
      //listen to the command and talk back

      window.speechSynthesis.speak(speech);
    };

    //the event here holds the string we talked jus now !!
    recognition.onresult = function(event) {
      //getting the result index
      const currentcommand = event.resultIndex;
      //accessing the voice string from the window
      const transcript = event.results[currentcommand][0].transcript;
      readOut(transcript);
    };

    //function to synthasis the command and talk back

    function readOut(command) {
      //initiating the synthesis
      const speech = new SpeechSynthesisUtterance();

      speech.text = "you said" + command; //the real speech
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 3;

      //listen to the command and talk back

      window.speechSynthesis.speak(speech);

      //
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="wrapper mb-0 ">
          <button
            onClick={this.listenSpeak}
            className=" btn btn-small btn-radial btn-small btn-outline-info "
          >
            <i className="fas fa-microphone" />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Voice;
