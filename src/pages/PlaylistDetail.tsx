import { useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import playlistDataRaw from '../data/playlists.json';
import './PlaylistDetail.css';

type Track = {
  name: string;
  url: string;
  duration: number;
  image?: string;
};

type Playlist = {
  name: string;
  'artist:': string;
  year: number;
  tracks: Track[];
};

const playlistData: { playlists: Playlist[] } = playlistDataRaw;

function PlaylistDetail() {
  const { index } = useParams();
  const playlistIndex = Number(index);
  const playlist = playlistData.playlists[playlistIndex];
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = playlist.tracks[currentTrackIndex];

  const playTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }, 0);
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextTrack = () => {
    if (currentTrackIndex < playlist.tracks.length - 1) {
      playTrack(currentTrackIndex + 1);
    }
  };

  const playPreviousTrack = () => {
    if (currentTrackIndex > 0) {
      playTrack(currentTrackIndex - 1);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div className="container">
      <button onClick={() => window.history.back()} className="backButton">← Back</button>

      <div className="playerBox">
        <img
          src={currentTrack.image}
          alt={currentTrack.name}
          className={`albumArt ${isPlaying ? 'spin' : ''}`}
        />

        {isPlaying && (
          <div className="equalizer">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}

        <p className="trackTitle">{currentTrack.name}</p>
        <p className="trackArtist">{playlist['artist:']}</p>

        <input
          type="range"
          min={0}
          max={currentTrack.duration}
          value={currentTime}
          onChange={handleSeek}
          className="progressBar"
        />

        <div className="timeLabels">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(currentTrack.duration)}</span>
        </div>

        <div className="controls">
          <button onClick={playPreviousTrack} className="sideControl">⏮</button>
          <button onClick={pauseTrack} className="playButton">
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button onClick={playNextTrack} className="sideControl">⏭</button>
        </div>

        <audio
          ref={audioRef}
          onEnded={playNextTrack}
          onTimeUpdate={handleTimeUpdate}
          key={currentTrack.url}
        >
          <source src={currentTrack.url} type="audio/mpeg" />
        </audio>

        <ul className="trackList">
          {playlist.tracks.map((track, index) => (
            <li
              key={index}
              onClick={() => playTrack(index)}
              className={`trackItem ${index === currentTrackIndex ? 'active' : ''}`}
            >
              <span className="trackText">
                {(index + 1).toString().padStart(2, '0')}. {track.name}
              </span>
              <span className="trackTime">
                {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlaylistDetail;
