import React from 'react';
import NavBar from './NavBar';
import MovieList from './MovieList';
import './App.css';

// This is static hard-coded data, we shall later fetch it from our server

function App() {
  return (
    <div className="mvls-app">
      <header className="mvls-header">
        <NavBar />
      </header>
      <main className="mvls-main">
        <MovieList />
      </main>
    </div>
  );
}

export default App;
