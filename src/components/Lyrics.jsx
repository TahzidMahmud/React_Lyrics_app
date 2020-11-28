import React, { Component } from "react";
import axios from "axios";
import Spinner from "../components/layout/Spinner";
import { Link } from "react-router-dom";
import "../App.css";
import Moment from "react-moment";

class Lyrics extends Component {
  state = {
    track: {},
    Lyrics: {}
  };
  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        this.setState({ Lyrics: res.data.message.body.lyrics });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
        this.setState({ track: res.data.message.body.track });
      })
      .catch(err => console.log(err));
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
              className=" btn mb-3 btn-small btn-radial btn-small btn-outline-info "
            >
              <i className="fas fa-chevron-left" />
              ..Back..
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
        </React.Fragment>
      );
    }
  }
}
export default Lyrics;
