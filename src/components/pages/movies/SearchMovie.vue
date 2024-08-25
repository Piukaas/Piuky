<template>
  <div>
    <div class="header-container">
      <h1>{{ $t("add_new", { item: $t(searchType) }) }}</h1>
      <select v-model="searchType" class="form-select w-auto" aria-label="Default select example" @change="search">
        <option value="movie">{{ $t("movies") }}</option>
        <option value="tv">{{ $t("tv-shows") }}</option>
      </select>
    </div>

    <div class="input-container">
      <input class="form-control w-auto" type="text" v-model="searchQuery" :placeholder="$t('search_tmdb')" @keyup.enter="search" />
      <button class="btn btn-primary btn-round" @click="search">
        <i class="fas fa-magnifying-glass"></i>
      </button>
    </div>

    <div class="row">
      <!-- Loading Skeletons -->
      <template v-if="loading">
        <div v-for="i in 8" :key="i" class="card-container col-lg-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <b-skeleton height="300px" class="skeleton-poster" />
            </div>
          </div>
          <h3><b-skeleton width="150px" /></h3>
        </div>
      </template>

      <!-- Results -->
      <template v-else-if="results.length">
        <h2>{{ $t("search_results") }}</h2>
        <div v-for="result in results" :key="result.id" class="card-container col-lg-3 col-md-6" @click="goToCreate(result.id)">
          <div class="card">
            <div class="card-body">
              <img :src="result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}` : 'https://i.imgur.com/42uQxSx.png'" class="movie-img" :alt="result.title || result.name" />
            </div>
          </div>
          <h3>{{ result.title || result.name }}</h3>
        </div>
      </template>

      <!-- No Results -->
      <template v-else-if="searchInitiated">
        <h2>{{ $t("no_results") }}</h2>
      </template>
    </div>

    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchType: "movie",
      searchQuery: "",
      results: [],
      loading: false,
      searchInitiated: false,
    };
  },
  methods: {
    search() {
      if (!this.searchQuery.trim()) return;
      this.results = [];
      this.loading = true;
      this.searchInitiated = true;

      axios
        .get(`${process.env.VUE_APP_API_URL}/movies/tmdb?title=${this.searchQuery}&searchType=${this.searchType}`)
        .then((response) => {
          this.results = response.data.results;
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    goToCreate(id) {
      this.$router.push(`/movies/create/${id}?searchType=${this.searchType}`);
      this.results = [];
      this.searchInitiated = false;
    },
  },
};
</script>

<style scoped>
.input-container {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
}

.header-container {
  display: flex;
  align-items: center;
  gap: 15px;
}
</style>
