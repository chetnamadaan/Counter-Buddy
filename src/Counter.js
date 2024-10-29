import React, { useState } from 'react';
import './Counter.css';
import { FaPlus, FaMinus, FaSyncAlt, FaSun, FaMoon, FaInfoCircle, FaHistory, FaShareAlt } from 'react-icons/fa'; 

const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [upperLimit, setUpperLimit] = useState(10);
  const [lowerLimit, setLowerLimit] = useState(0);
  const [allowNegative, setAllowNegative] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [history, setHistory] = useState([]); 

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleIncrement = () => {
    if (count + step <= upperLimit) {
      setCount(count + step);
      setHistory((prev) => [...prev, `Incremented by ${step}`]); 
    }
  };

  const handleDecrement = () => {
    if (allowNegative || count - step >= lowerLimit) {
      setCount(count - step);
      setHistory((prev) => [...prev, `Decremented by ${step}`]); 
    }
  };

  const handleReset = () => {
    setCount(0);
    setHistory((prev) => [...prev, 'Reset']); 
  };

  const showInfo = () => {
    alert('This is a counter application. You can increment, decrement, and reset the count. Use the buttons to interact with it!');
  };

  const showHistory = () => {
    alert(`Count History:\n${history.join('\n') || 'No history available.'}`);
  };

  const shareCount = () => {
    alert(`Current Count: ${count}. Share this value!`);
  };

  const getCounterClass = () => {
    if (count === 0) return 'counter reset';
    if (count >= upperLimit * 0.7) return 'counter high';
    if (count < 0 && !allowNegative) return 'counter low';
    return 'counter';
  };

  return (
    <div className={`container ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="header">
        <h2>Counter Buddy</h2>
        <p>Count your way! Use the buttons below to increment, decrement, or reset the counter.</p>
        <div className="controls">
          <button className="toggle-theme" onClick={toggleDarkMode} title="Toggle Dark Mode">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={showInfo} title="Info">
            <FaInfoCircle /> Info
          </button>
          <button onClick={showHistory} title="History">
            <FaHistory /> History
          </button>
          <button onClick={shareCount} title="Share Count">
            <FaShareAlt /> Share Count
          </button>
        </div>
      </header>

      {/* Counter */}
      <div className={getCounterClass()}>
        <h1>{count}</h1>

        <div className="controls">
          <button onClick={handleIncrement} disabled={count >= upperLimit}>
            <FaPlus /> Increment
          </button>
          <button onClick={handleDecrement} disabled={!allowNegative && count <= lowerLimit}>
            <FaMinus /> Decrement
          </button>
          <button onClick={handleReset}>
            <FaSyncAlt /> Reset
          </button>
        </div>

        {/* Settings */}
        <div className="settings">
          <label>
            Step Size:
            <input
              type="number"
              value={step}
              onChange={(e) => setStep(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </label>
          <label>
            Upper Limit:
            <input
              type="number"
              value={upperLimit}
              onChange={(e) => setUpperLimit(Math.max(lowerLimit, parseInt(e.target.value) || 0))}
            />
          </label>
          <label>
            Lower Limit:
            <input
              type="number"
              value={lowerLimit}
              onChange={(e) => setLowerLimit(Math.min(upperLimit, parseInt(e.target.value) || 0))}
            />
          </label>
          <label>
            Allow Negative:
            <input
              type="checkbox"
              checked={allowNegative}
              onChange={() => setAllowNegative((prev) => !prev)}
            />
          </label>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Made by Chetna Madaan. Enjoy counting!</p>
        <p>This allows you to track a count with customizable settings including step size and limits.</p>
      </footer>
    </div>
  );
};

export default Counter;
