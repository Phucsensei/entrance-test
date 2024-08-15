import React, { useState, useEffect } from 'react';
import './CircleGame.css';

const CircleGame = () => {
  const [points, setPoints] = useState(0);
  const [circles, setCircles] = useState([]);
  const [time, setTime] = useState(0);
  const [allCleared, setAllCleared] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); 

  useEffect(() => {
    let timer;
    if (circles.length > 0 && !gameOver) {
      timer = setInterval(() => setTime(prevTime => prevTime + 0.1), 100);
    }
    return () => clearInterval(timer);
  }, [circles, gameOver]);

  const handlePointChange = (e) => {
    setPoints(Number(e.target.value));
  };

  const handleRestart = () => {
    if (!gameStarted) {
      setGameStarted(true); 
    }
    setTime(0);
    setAllCleared(false);
    setGameOver(false);
    setNextId(1);
    const newCircles = Array.from({ length: points }, (_, i) => ({
      id: i + 1,
      clicked: false,
      top: Math.random() * 375,
      left: Math.random() * 375
    }));
    setCircles(newCircles);
  };

  const handleCircleClick = (id) => {
    if (id === nextId) {
      setNextId(prevId => prevId + 1);
      setCircles(prevCircles =>
        prevCircles.map(circle =>
          circle.id === id ? { ...circle, clicked: true } : circle
        )
      );

      setTimeout(() => {
        setCircles(prevCircles => prevCircles.filter(circle => circle.id !== id));
      }, 1500);
    } else {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (circles.length > 0 && circles.every(circle => circle.clicked) && points > 0 && !gameOver) {
      setAllCleared(true);
    }
  }, [circles, points, gameOver]);

  return (
    <div className="game">
      <div className="CircleGame">
        <h2
          style={{
            color: gameOver ? 'red' : allCleared ? 'green' : 'black'
          }}
        >
          {gameOver ? 'GAME OVER' : allCleared ? 'ALL CLEARED' : "LET'S PLAY"}
        </h2>
        <div className='info'>
          <label>Points:</label>
          <input type="text" value={points} onChange={handlePointChange} />
        </div>
        <div className='info'>
          <label>Time: </label>
          <span className='time'>{time.toFixed(1)}s</span>
        </div>
        <button onClick={handleRestart} className='text-blue-700'>
          {gameStarted ? 'Restart' : 'Play'}
        </button>
      </div>

      <div className="circle-container">
        {circles.map(circle => (
          <div
            key={circle.id}
            onClick={() => handleCircleClick(circle.id)}
            className={`circle ${circle.clicked ? 'clicked' : ''}`}
            style={{
              top: `${circle.top}px`,
              left: `${circle.left}px`,
              zIndex: points - circle.id + 1  
            }}>
            {circle.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircleGame;
