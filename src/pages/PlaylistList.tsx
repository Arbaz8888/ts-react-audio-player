import { Link } from 'react-router-dom';
import playlistData from '../data/playlists.json';
import deepHouseImg from '../assets/images/DeepHouse.jpeg';
import neitherAndBothImg from '../assets/images/Neither and Both.jpeg';

function PlaylistList() {
  const imageMap: { [key: string]: string } = {
    'Deep House': deepHouseImg,
    'Neither and Both': neitherAndBothImg,
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎧 Pick Your Vibe</h1>
      <div style={styles.grid as React.CSSProperties}>
        {playlistData.playlists.map((playlist, index) => (
          <Link to={`/playlist/${index}`} key={index} style={styles.card}>
            <img
              src={imageMap[playlist.name]}
              alt={`${playlist.name} cover`}
              style={styles.image}
            />
            <div>
              <h2 style={styles.title}>{playlist.name}</h2>
              <p style={styles.meta}>
                {playlist['artist:']} • {playlist.year}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    padding: '50px 24px',
    fontFamily: 'Inter, sans-serif',
    color: '#111',
    maxWidth: '900px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.4rem',
    fontWeight: 700,
    marginBottom: '40px',
    textAlign: 'center' as const,
    color: '#1f2937',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '18px 22px',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    textDecoration: 'none',
    color: '#111',
    transition: 'transform 0.15s ease-in-out, box-shadow 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    cursor: 'pointer',
  },
  image: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    objectFit: 'cover' as React.CSSProperties['objectFit'],
    marginRight: '10px',
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 600,
    margin: 0,
    color: '#111',
  },
  meta: {
    fontSize: '1rem',
    color: '#6b7280',
    margin: 0,
  },
};

export default PlaylistList;
