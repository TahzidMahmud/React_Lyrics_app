import React, { Component } from "react";
import axios from "axios";
import Spinner from "../components/layout/Spinner";
import { Link } from "react-router-dom";
import "../App.css";

class Lyrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: {},
      Lyrics: {},
      count: 0,
    };

    // This binding is necessary to make `this` work in the callback
    this.read_lyrics = this.read_lyrics.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        this.setState({ Lyrics: res.data.message.body.lyrics });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then((res) => {
        this.setState({ track: res.data.message.body.track });
        this.speak();
      })
      .catch((err) => console.log(err));
  }

  speak() {
    let speech = new SpeechSynthesisUtterance();

    speech.text =
      " Do you want me to read the lyrics for you ? ..then press the speaker icon "; //the real speech
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 0.9;
    //listen to the command and talk back

    window.speechSynthesis.speak(speech);
  }
  read_lyrics(e) {
    let speech = new SpeechSynthesisUtterance();

    speech.text = this.state.Lyrics.lyrics_body; //the real speech
    speech.volume = 1;
    speech.rate = 0.7;
    speech.pitch = 0.9;
    //listen to the command and talk back

    window.speechSynthesis.speak(speech);
  }
  render() {
    const { track, Lyrics } = this.state;
    console.log(track);
    if (
      track === undefined ||
      Lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(Lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <nav className="navbar navbar-dark bg-dark mb-3">
            <span className="navbar-brand mb-0 ml-0 mr-0 h1 mx-auto">
              <h3>Result Lyrics</h3>
            </span>
          </nav>
          <div className="lyrics">
            <Link
              to="/search"
              className=" btn mb-1 btn-small btn-radial btn-small btn-outline-info "
            >
              <i className="fas fa-chevron-left" />
            </Link>
            <div className="card">
              <h5 className="card-header">
                {track.track_name} by{" "}
                <span className="text-secondary">{track.artist_name}</span>
              </h5>
              <div className="card-body">
                <p className="card-text">{Lyrics.lyrics_body}</p>
              </div>
            </div>
            <ul className="list-group mt-3">
              <li className="list-group-item">
                <strong>Album Name</strong>: {track.album_name}
              </li>
              <li className="list-group-item">
                <strong>Explicit Words</strong>:{" "}
                {track.explicit === 0 ? "No" : "Yes"}
              </li>
              <li className="list-group-item">
                <strong>Artist Name</strong>: {track.artist_name}
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center ">
            <div
              onClick={this.read_lyrics}
              className=" btn btn-lg btn-small btn-radial btn-small btn-outline-info m-4"
            >
              <i className="fas fa-volume-up"></i>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}
export default Lyrics;
