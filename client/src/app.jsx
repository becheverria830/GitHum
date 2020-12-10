import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import LandingPage from "./components/Landing/landing";
import SignUpPage from "./components/SignUp/signup";
import LogInPage from "./components/LogIn/login";
import PasswordResetPage from "./components/PasswordReset/passwordreset";
import PasswordResetFormPage from "./components/PasswordResetForm/passwordresetform";
import FeedPage from "./components/Feed/feed";
import ValleyPage from "./components/Valley/valley";
import ForestPage from "./components/Forest/forest";
import SearchPage from "./components/Search/search";
import PrivateRoute from "./components/PrivateRoute/privateRoute";

var play = ({
  spotify_uri,
  playerInstance: {
    _options: { getOAuthToken, id },
  },
}) => {
  getOAuthToken((access_token) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  });
};

class SpotifyPlayer {
  constructor() {
    this.player = null;
    this.isPlaying = false;
    this.nowPlaying = null;
    this.queue = {
      song_list: [],
      index: -1,
      current_forest_id: null,
    };
  }

  getCurrentQueue(user_id) {
    const url = "http://localhost:9000/user/queue/" + user_id;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.updateQueue(res.queue);
      });
  }

  setPlayer(player) {
    this.player = player;
  }

  playSong(song) {
    play({
      playerInstance: this.player,
      spotify_uri: song.spotify_uri,
    });
    if(this.nowPlaying != null) {
      this.nowPlaying.setState({"song":song});
    }
  }

  updateQueue(queue) {
    this.queue = queue;
    if(this.queue.song_list.length == 1) {
      this.playCurrentSong();
    }
  }

  playCurrentSong() {
    if(this.queue.index != -1 && this.queue.song_list.length != 0) {
      this.playSong(this.queue.song_list[this.queue.index]);
    }
  }

  togglePlay() {
    this.player.togglePlay();
    this.isPlaying = !this.isPlaying;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  setNowPlaying(nowPlaying) {
    this.nowPlaying = nowPlaying;
  }

}

export default function App() {

  const [mounted, setMounted] = useState(false)

  if(!mounted){
    window.MyVars = {
      player: new SpotifyPlayer()
    };

    window.playerCheckInterval = setInterval(() => {
      const token = "BQBhKUlfVru2_EAC6PuODZEk7UjTvCoTPmhB2VdFGLr4nmSewL1dnet8ClS3GJIAHUVA5jaTSYpsXl2-BtShbV0Stz-yK5u3r6r5PhWEgNCyqvH92EccyEFqdQNQDKlXhIkYbeGXAbGGr65Rztj_hRMKn94bY08rpVc";

      // If the Spotify SDK has loaded
      if (window.Spotify !== undefined) {
        // Cancel the periodic checking and make a new player
        clearInterval(window.playerCheckInterval);

        const player = new window.Spotify.Player({
          name: "GitHum",
          getOAuthToken: (cb) => {
            cb(token);
          },
        });

        //Adding event handlers
        player.on("initialization_error", (e) => {
          //If there was a problem setting up the player
          console.error(e);
        });

        player.on("authentication_error", (e) => {
          //If there was a problem authenticating the user(Token was invalid / expired)
          console.error(e);
        });

        player.on("account_error", (e) => {
          //??
          console.error(e);
        });

        player.on("playback_error", (e) => {
          //If playing a track failed for some reason
          console.error(e);
        });

        player.on("player_state_changed", (state) => {
          //If there are any changes to the player state
          // console.log(state);
          // if (
          //     this.state
          //     && state.track_window.previous_tracks.find(x => x.id === state.track_window.current_track.id)
          //     && !this.state.paused
          //     && state.paused
          //     ) {
          //     this.onNextClick();
          //   }
          // this.state = state;
        });

        player.on("ready", async (data) => {
          //Making the player
          // let { device_id } = data;
          // await this.setState({ deviceId: device_id });
          //
          // const { deviceId, token } = this.state;
          //
          //   fetch("https://api.spotify.com/v1/me/player", {
          //     method: "PUT",
          //     headers: {
          //       authorization: `Bearer ${token}`,
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       device_ids: [deviceId],
          //       play: false,
          //     }),
          //   });
          // }

          console.log("ready");
          console.log("ready");
          console.log("ready");
            console.log("ready");
        });


        player.connect();
        if(window.CurrentUserID != null) {
          window.MyVars.player.getCurrentQueue(window.CurrentUserID);
        }
        window.MyVars.player.setPlayer(player);
      }
    }, 1000);
  }

  useEffect(() =>{
    setMounted(true)
  },[])

  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/signup">
        <SignUpPage />
      </Route>
      <Route path="/login">
        <LogInPage />
      </Route>
      <Route path="/resetpassword">
        <PasswordResetPage />
      </Route>
      <Route path="/passwordreset/:id/:token">
        <PasswordResetFormPage />
      </Route>
      <PrivateRoute exact path="/feed" component={FeedPage} />
      <PrivateRoute exact path="/valley/:userid" component={ValleyPage} />
      <PrivateRoute exact path="/forests/:forestid" component={ForestPage} />
      <PrivateRoute exact path="/search/:query" component={SearchPage} />
      <PrivateRoute exact path="/search/" component={SearchPage} />
    </Switch>
  );
}
