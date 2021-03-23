import { useState, useEffect } from 'react';
import './App.css';
import GetBoardWidth from './components/GetBoardWidth';

function App() {
  const [rules, setRules] = useState('');

  useEffect(() => {
    if(window.screen.width < 500 ||
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPod/i)) {
        setRules('Use Keys 2(UP), 8(DOWN), 4(LEFT) and 6(RIGHT) To Move The Player');
      } else {
        setRules('Use Arrow Keys To Move The Player');
      }
  }, []);

  return (
    <>
      <header className="app-header">
        <h2>Welcome</h2>
        <p>The Name Of This Game Is <em>'Save The Princess'</em></p>
      </header>
      <h5 className="rules">{rules}</h5>
      <main className="app-main">
        {/* Component to get the size of board from user */}
        <GetBoardWidth />
      </main>
      <footer className="app-footer">
        <p>Developed by Odinaka Joy</p>
      </footer>
    </>
  );
}

export default App;
