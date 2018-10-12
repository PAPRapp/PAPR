import React from 'react'
import YouTube from 'react-youtube'

export default class LiveTV extends React.Component {
  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }
    return (
      <div id="tv">
        <YouTube
          videoId="Mc038uSZHJY"
          //FdtQ2ZgLbEs al jazeera
          opts={opts}
          onReady={this._onReady}
        />
      </div>
    )
  }
}
