import './App.css';
import GetBoardWidth from './components/GetBoardWidth';

function App() {
  return (
    <>
      <header className="app-header">
        <h2>Welcome</h2>
        <p>The Name Of This Game Is <em>'Save The Princess'</em></p>
      </header>
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
