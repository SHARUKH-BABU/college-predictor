import React from 'react';

const PageNotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>Oops! The page you're looking for doesn't exist.</p>
      <button style={styles.button} onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f8f8',
    color: '#333',
  },
  heading: {
    fontSize: '6rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#ff6b6b',
  },
  text: {
    fontSize: '1.5rem',
    margin: '1rem 0',
    color: '#555',
  },
  button: {
    padding: '0.5rem 1.5rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#ff6b6b',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default PageNotFound;
