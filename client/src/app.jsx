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
  position,
}) => {
  getOAuthToken((access_token) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: "PUT",
      body: JSON.stringify({
        uris: [spotify_uri],
        position_ms: position,
      }),
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
      position: -1,
      playing: 0,
      current_forest: {
        forest_id: -1,
        forest_name: "",
      },
    };
  }

  getCurrentQueue(user_id) {
    const url = "http://localhost:9000/user/queue/" + user_id;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setQueue(res.queue);
        if(res.queue.playing != null && res.queue.playing == 1) {
          this.togglePlay();
        } else {
          if(this.queue.index != -1 && this.queue.song_list.length != 0) {
            if(this.nowPlaying != null) {
              this.nowPlaying.setSongState({"song":this.queue.song_list[this.queue.index % this.queue.song_list.length]});
            }
          }
        }
      });
  }

  setPlayer(player) {
    this.player = player;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  setIsPlaying(isPlaying) {
    this.isPlaying = isPlaying;
    if(window.CurrentUserID != null) {
      const url = "http://localhost:9000/user/queue/set_is_playing";
      const options = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: window.CurrentUserID,
          playing: isPlaying ? 1 : 0,
        }),
      };
      fetch(url, options);
    }

    if(this.nowPlaying != null) {
      this.nowPlaying.setPlayingState({"isPlaying":this.isPlaying});
    }
  }

  setNowPlaying(nowPlaying) {
    console.log("nowPlaying");
    console.log(nowPlaying);
    console.log(this.queue.song_list[this.queue.index % this.queue.song_list.length]);
    this.nowPlaying = nowPlaying;
    if(this.queue.index != -1 && this.queue.song_list.length != 0) {
      this.nowPlaying.setSongState({"song":this.queue.song_list[this.queue.index % this.queue.song_list.length]});
    }
  }

  setQueue(queue) {
    this.queue = queue;
  }

  getCurrentState() {
    return this.player.getCurrentState()
  }

  playSong(song, position) {
    play({
      playerInstance: this.player,
      spotify_uri: song.spotify_uri,
      position,
    });
    if(this.nowPlaying != null) {
      this.nowPlaying.setSongState({"song":song});
    }
    this.player.resume();
    this.setIsPlaying(true);
  }

  playCurrentSong() {
    if(this.queue.index != -1 && this.queue.song_list.length != 0) {
      this.playSong(this.queue.song_list[this.queue.index % this.queue.song_list.length], this.queue.position);
    } else {
      if(this.nowPlaying != null) {
        this.nowPlaying.setSongState({"song":null});
      }
      this.player.pause();
      this.setIsPlaying(false);
    }
  }

  getCurrentSong() {
    if(this.queue.index != -1 && this.queue.song_list.length != 0) {
      return this.queue.song_list[this.queue.index % this.queue.song_list.length];
    }
    return null;
  }

  songFinished() {
    if(window.CurrentUserID != null) {
      const url = "http://localhost:9000/user/queue/skip";
      const options = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: window.CurrentUserID,
        }),
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          this.setQueue(res.queue);
          this.playCurrentSong();
        });
    }
  }

  updatePosition(position) {
    if(window.CurrentUserID != null) {
      this.queue.position = position;
      const url = "http://localhost:9000/user/queue/update_position";
      const options = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: window.CurrentUserID,
          position: position,
        }),
      };
      fetch(url, options);
    }
  }

  togglePlay() {
    if(this.isPlaying) {
      this.player.pause();
      this.setIsPlaying(false);
    } else {
      if(this.queue.index != -1 && this.queue.song_list.length != 0) {
        this.playCurrentSong();
        this.setIsPlaying(true);
      }
    }
  }

}

export default function App() {

  const [mounted, setMounted] = useState(false)
  var songFinishedTime = 0;
  var first_time = true;

  if(!mounted){
    //Once the page loads, create a spotify player and store it globally.
    window.SpotifyPlayerVar = {
      player: new SpotifyPlayer()
    };

    //When the spotify API is loaded, go ahead and make the player.
     window.onSpotifyWebPlaybackSDKReady  = async () => {
      //Get the token here: https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
      var token = "";
      console.log("before");
      await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ZjA1MmQ5ODYxM2U0NGRkMWJjZmY1ZGE0ZmExYjJjMGE6M2YwNzlkMWNlZGU4NDQ0YTg4NjI3ZTRkZmEyYWIxNjE='
        },
      body:  'grant_type=refresh_token&refresh_token=AQC_By2gr1OZg4DOIukBgZ3_2h71d2AOrYXo7QnLkw9AzmtRuuenvjmj2Qq2ubqiFQygQQVW6vKteqbndDoxBUvBO_pkSXmsQBuYSVyCRSQM0Sl4mIWdWQM7xlZ_Y8Q53tA'
      })
      .then((res) => res.json())
      .then((res) => {
        console.log("DO I GET TO THE RES PLZ");
        token = res.access_token;
        console.log(token);
      });

      /*
      //let token = "";
      const url = "https://accounts.spotify.com/api/token";
      const options = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        enctype: "Application/x-www-form-urlencoded",
        headers: {
          Authorization: "Basic ZjA1MmQ5ODYxM2U0NGRkMWJjZmY1ZGE0ZmExYjJjMGE6M2YwNzlkMWNlZGU4NDQ0YTg4NjI3ZTRkZmEyYWIxNjE="
        },
        body: {
          grant_type: "refresh_token",
          refresh_token: "AQC_By2gr1OZg4DOIukBgZ3_2h71d2AOrYXo7QnLkw9AzmtRuuenvjmj2Qq2ubqiFQygQQVW6vKteqbndDoxBUvBO_pkSXmsQBuYSVyCRSQM0Sl4mIWdWQM7xlZ_Y8Q53tA"
        },
      };
      
      console.log(token);

      fetch(url, options)
        .then((res) => res.json())
        .then((res) => {
          console.log("DO I GET TO THE RES PLZ");
          console.log(res);
          token = res.access_token;
        });


        console.log(token);
        */
      
      
      const player = new window.Spotify.Player({
        name: "GitHum",
        getOAuthToken: (cb) => { cb(token); },
      });


      console.log("later");
      console.log(token);

      //Exception handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Playback status updates
      player.addListener('player_state_changed', state => {
        if(first_time) {
          first_time = false;
          if(window.CurrentUserID != null) {
            window.SpotifyPlayerVar.player.getCurrentQueue(window.CurrentUserID);
          }
        }
        if(state != null){
          if(state.paused == true && state.position == 0 && state.restrictions.disallow_resuming_reasons && state.restrictions.disallow_resuming_reasons[0] === "not_paused") {
            if(state.timestamp - songFinishedTime > 5000) {
              var current_song = window.SpotifyPlayerVar.player.getCurrentSong();
              if(current_song != null && current_song.spotify_uri == state.track_window.current_track.uri){
                songFinishedTime = state.timestamp;
                window.SpotifyPlayerVar.player.songFinished();
              }
            }
          } else if(state.paused == true) {
            var current_song = window.SpotifyPlayerVar.player.getCurrentSong();
            if(current_song != null && current_song.spotify_uri == state.track_window.current_track.uri){
              window.SpotifyPlayerVar.player.updatePosition(state.position);
            }
          }
        }
      });

      console.log("more later");
      console.log(token);

      // Ready
      player.addListener('ready', ({ device_id }) => {
        fetch("https://api.spotify.com/v1/me/player", {
          method: "PUT",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            device_ids: [device_id],
            play: false,
          }),
        });

      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();

      window.SpotifyPlayerVar.player.setPlayer(player);
    };
  }

  useEffect(() =>{
    setMounted(true)
    window.addEventListener("beforeunload", async (ev) =>
    {
      // ev.preventDefault();
      let state = await window.SpotifyPlayerVar.player.getCurrentState();
      if (state == null) {
        // Playback isn't on this device yet
      } else {
        window.SpotifyPlayerVar.player.updatePosition(state.position);
      }
      return ev.returnValue = 'Are you sure you want to close?';
    });
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
