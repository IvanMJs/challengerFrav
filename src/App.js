import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/navbar";
import Card from "./components/Card/card";
import { getPokemon, getAllPokemon } from "./services/get";
import "./App.sass";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialURL = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=200";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  return (
    <>
      <Navbar />
      <div>
        {loading ? (
          <h1 style={{ textAlign: "center" }}>Cargando...</h1>
        ) : (
          <>
            <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div class="container">
              <button onClick={prev} class="button type3">
                Anterior
              </button>
              <button onClick={next} class="button type1">
                Siguiente
              </button>
            </div>
          </>
        )}
        <div className="aut">
          <span>
            Made with React, this project can be found on my{" "}
            <a href="https://github.com/ivanmeyer91">Github</a>
          </span>
          <span>Iván Meyer</span>
        </div>
      </div>
    </>
  );
}

export default App;
