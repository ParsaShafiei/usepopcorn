import { useEffect, useState } from "react";

const key = "3eb3badb";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Somthing went Wrong");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie Not Found");

          setMovies(data.Search);
          console.log(data.Search);
          setIsLoading(false);
          setError("");
        } catch (err) {
          console.error(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length <= 2) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return {movies, isLoading, error}
}
