import React, { useState, useReducer, useMemo, useRef, useCallback } from "react";


import './styles/character.css';
import Search from "./Search";

import useCharacters from "../hooks/useCharacter";

const initialState = {
  favorites: []
}

const API = 'https://rickandmortyapi.com/api/character';

const favoriteReducer = (state, action) => {
  switch(action.type){
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    default:
      return state;
  }
}

const Characters = () => {
  const [api, setApi] = useState(API);
  const [characters, nextPage] = useCharacters(api);

  const [{favorites}, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const handleClick = (favorite) => {
    const existe = favorites.filter( item => item.id === favorite.id);
    if(existe.length) return;
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite})
  }

  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // }

  // usamos useCallback
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, [])

  // const filterUsers = characters.filter( user => user.name.toLowerCase().includes(search.toLowerCase()));

  // usando UseMemo
  const filterUsers = useMemo( () => 
    characters.filter( user => user.name.toLowerCase().includes(search.toLowerCase())),
    [characters, search]
  );
  console.log(nextPage);
  return ( 
    <div className="container">
      {favorites.length > 0 && <h2 className="title-container">Favoritos</h2>}
      <div className="character-favoritos">
        {favorites.map(item => (
          <div className="fav" key={item.id}>
            <img src={item.image} alt="favorito" />
          </div>
        ))}
      </div>

      <Search search={search} searchInput={searchInput} handleSearch={handleSearch}/>

      <h2 className="title-container">Characters</h2>
      <div className="characters-container">
        {!filterUsers.length ? 
          <span className="no-characters">Characters not found</span>
        :
          <React.Fragment>
          {filterUsers.map(item => (
            <div key={item.id} className="character">
              <img 
                className="character_img" 
                src={item.image} alt="Character" 
              />
              <p className="character-name">Nombre: <b>{item.name}</b></p>
              <p>Genero: <b>{item.gender}</b></p>
              <p>Especie: <b>{item.species}</b></p>
              <p>Estatus: <b>{item.status}</b></p>
              <button 
                type="button" 
                onClick={() => handleClick(item)}
              >Agregar a favoritos</button>
            </div>
          ))}
            
          </React.Fragment>
        }
        </div>
        { (filterUsers.length && nextPage !== '') && 
        <button 
          className="btn-add-more" 
          onClick={() => setApi(nextPage)}
        >Más 
          <span className="material-icons">
            add
          </span>
        </button>}
    </div>
   );
}
 
export default Characters;