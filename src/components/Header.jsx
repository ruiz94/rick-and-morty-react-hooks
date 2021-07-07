
import './styles/header.css'

import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const Header = ({darkMode, handleOnClick}) => {
  const color = useContext(ThemeContext);

  return ( 
    <div className="header">
      <h1 style={{color}}>ReactHooks</h1>
      <button 
        type="button" 
        onClick={handleOnClick}
        className={ darkMode ? 'darkMode' : 'lightMode'}>
        { darkMode ? 'DarkMode' : 'LightMode'}
      </button>
    </div>
   );
}
 
export default Header;