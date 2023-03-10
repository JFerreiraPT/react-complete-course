import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //use usingEffect to load data right on component load

  const fetchMovieHandler = useCallback(async () => {

    setIsLoading(true);

    //to catch errors instead of then and catch we can use try catch blocks with async and await
    try {
      const response = await fetch("https://react-http-75b93-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }

      const data = await response.json();

      const loadedMovies = [];
      for(const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  //in case function changes, we need to use it as dependency for its own call
  //in this case the function is not changed by exterior, so no need to add it, but for the sake of example
  //we will use it
  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  let content = <p>Found no movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (isLoading) {
    content = <p>Loading...</p>;
  }



  function addMovieHandler(movie) {
    fetch("https://react-http-75b93-default-rtdb.firebaseio.com/movies.json", {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'content-type' : 'application/json'
      }
    }).then((response) => {
      response.json().then((response) => {
        console.log(response);        
      })
      
    }).catch(() => {})
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
