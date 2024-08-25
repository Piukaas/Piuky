<template>
  <div>
    <h1>{{ $t("add_new_movie") }}</h1>

    <div class="input-group">
      <input class="form-control" type="text" v-model="searchQuery" :placeholder="$t('search_movie_tmdb')" @keyup.enter="searchMovies" />
      <button class="btn btn-primary btn-round" @click="searchMovies">
        <i class="fas fa-magnifying-glass"></i>
      </button>
    </div>

    <div class="row">
      <!-- Loading Skeletons -->
      <template v-if="loadingMovies">
        <div v-for="number in 8" :key="number" class="card-container col-lg-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <b-skeleton height="300px" class="skeleton-poster" />
            </div>
          </div>
          <h3><b-skeleton width="150px" /></h3>
        </div>
      </template>

      <!-- Movie Results -->
      <template v-else-if="movieResults.length">
        <h2>{{ $t("search_results") }}</h2>
        <div v-for="movie in movieResults" :key="movie.id" class="card-container col-lg-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <img :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://i.imgur.com/42uQxSx.png'" class="movie-img" :alt="movie.title" />
            </div>
          </div>
          <h3>{{ movie.title }}</h3>
        </div>
      </template>

      <!-- No Results -->
      <template v-else-if="searchInitiated">
        <h2>{{ $t("no_results") }}</h2>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchQuery: "",
      movieResults: [],
      loadingMovies: false,
      searchInitiated: false,
    };
  },
  methods: {
    searchMovies() {
      if (!this.searchQuery.trim()) return;
      this.movieResults = [];
      this.loadingMovies = true;
      this.searchInitiated = true;

      axios
        .get(`${process.env.VUE_APP_API_URL}/movies/tmdb?title=${this.searchQuery}`)
        .then((response) => {
          this.movieResults = response.data.results;
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          this.loadingMovies = false;
        });
    },
  },
};
</script>

<style scoped>
.input-group {
  margin-bottom: 20px;
  gap: 5px;
}
</style>
