import logo from './logo.svg';
import './App.css';
import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
          click me </button>
        <button className="btn-blue">Blue button</button>
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div style={{ width: "30px", height: "30px" }}>Image here</div>
          </div>
          <div>
            <div className="text-xl font-medium text-red-50">ChitChat</div>
            <p className="text-gray-400">You havse a new message!</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
