import { useState, useEffect } from "react";
import axios from 'axios';

const useCharacters = url => {
  const [characters, setCharacters] = useState([]);
  const [nextPage, setNextPage] = useState('');

  useEffect( () => {
    const getData = async () => {
      const response = await axios(url, {
        'mode': 'cors',
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    });
      setNextPage(response.data.info.next);
      const newCharacters = [...characters, ...response.data.results];
      // console.log(newCharacters);
      setCharacters(newCharacters);
    }
    getData();
  }, [url]);

  return [characters, nextPage];
}

export default useCharacters;