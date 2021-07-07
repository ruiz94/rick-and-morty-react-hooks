import { useState } from "react";

import './App.css';
import Header from './components/Header';
import Characters from './components/Characters';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const handleOnClick = () => {
    setDarkMode(!darkMode);
  }
  return (
    <div className={`App ${darkMode ? 'darkMode' : 'lightMode'}`}>
      <Header darkMode={darkMode} handleOnClick={handleOnClick}/>
      <Characters/>
    </div>
  );
}

export default App;
