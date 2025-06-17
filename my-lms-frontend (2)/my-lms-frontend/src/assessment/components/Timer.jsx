import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Timer = ({ initialTime, onTimeUp, isActive = true }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            onTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2">
      <i className="fas fa-clock text-primary-text"></i>
      <span className={`text-lg font-medium ${timeLeft <= 30 ? 'text-red-500' : 'text-primary-text'}`}>
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

Timer.propTypes = {
  initialTime: PropTypes.number.isRequired,
  onTimeUp: PropTypes.func.isRequired,
  isActive: PropTypes.bool
};

export default Timer; 