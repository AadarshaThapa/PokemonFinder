import React, { useState, useEffect } from 'react';
import Search from './components/search';
import PokemonList from './components/pokemon';
import "./App.css"


const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then((results) => {
      const pokemon = results.map((result) => ({
        name: result.name,
        image: result.sprites['front_default'],
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id,
      }));
      setPokemonData(pokemon);
    });
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Search onSearchChange={handleSearchChange} />
      <PokemonList pokemonData={pokemonData} searchQuery={searchQuery} />
    </div>
  );
};

export default App;