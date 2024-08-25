<template>
  <div>
    <input class="form-control" type="text" v-model="searchQuery" placeholder="Enter search query" />
    <button class="btn btn-primary" @click="searchMovies">Search</button>

    <div v-if="movieResults.length" class="row">
      <h3>Search Results:</h3>
      <div v-for="movie in movieResults" :key="movie.id" class="card-container col-lg-3 col-md-6">
        <div class="card">
          <div class="card-body row">
            <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="movie-img" :alt="movie.title" />
            <img v-else :src="fallbackImage" class="movie-img" alt="Default Poster" />
          </div>
        </div>
        <h3>{{ movie.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import fallbackImage from "@/assets/default-poster.png";

export default {
  data() {
    return {
      searchQuery: "",
      movieResults: [],
      fallbackImage,
    };
  },
  methods: {
    searchMovies() {
      this.movieResults = [];
      const apiUrl = process.env.VUE_APP_API_URL;
      axios
        .get(`${apiUrl}/movies/tmdb?title=${this.searchQuery}`)
        .then((response) => {
          this.movieResults = response.data.results;
        })
        .catch((error) => {
          throw new Error("Error: " + error);
        });
    },
  },
};
</script>
