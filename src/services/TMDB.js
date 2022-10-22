import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const tmdbAPIKey = process.env.REACT_APP_TMDB_KEY;

//https://api.themoviedb.org/3

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    //Get Genres

    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbAPIKey}`,
    }),

    //Get Movies By -Type-

    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //Get Movies By Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbAPIKey}`;
        }
        //getMoviesByCategory
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbAPIKey}`;
        }

        //get movies by genres
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbAPIKey}`;
        }

        //get popularmovies
        return `movie/popular?=${page}&api_key=${tmdbAPIKey}`;
      },
    }),
  }),
});

export const { useGetGenresQuery, useGetMoviesQuery } = tmdbApi;
