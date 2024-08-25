<template>
  <div v-if="item">
    <h1>{{ item.title || item.name }}</h1>
    <p>{{ item.tagline }} - {{ item.first_air_date }} t/m {{ item.last_air_date }}</p>
    <!-- <p>{{ item.runtime || item.last_episode_to_air ? item.last_episode_to_air.runtime : "" }} minuten per aflevering</p> -->
    <p>{{ $t(item.status ? item.status.toLowerCase().replace(/ /g, "_") : "") }}</p>
    <b-rate v-model="item.vote_average" :show-score="true" icon="fas fa-skull" :max="10" icon-pack="fas" :spaced="true" disabled></b-rate>
    <a :href="`https://www.youtube.com/watch?v=${trailer}`" target="_blank">Trailer</a>
    <p>{{ item.overview }}</p>
    <p v-for="genre in item.genres" :key="genre.id">{{ genre.name }}</p>
    <div v-for="season in item.seasons" :key="season._id">
      <h3>{{ season.name }}</h3>
      <p>{{ season.overview }}</p>
      <p>{{ season.air_date }}</p>
      <b-rate v-model="season.vote_average" :show-score="true" icon="fas fa-skull" :max="10" icon-pack="fas" :spaced="true" disabled></b-rate>
      <ul>
        <li v-for="episode in season.episode_count" :key="episode">Episode {{ episode }}</li>
      </ul>
    </div>

    <div class="row">
      <div class="col-6">
        <div v-for="image in item.images.posters" :key="image.file_path" class="card-container">
          <div class="card">
            <div class="card-body">
              <img :src="image.file_path ? `https://image.tmdb.org/t/p/w500${image.file_path}` : 'https://i.imgur.com/42uQxSx.png'" class="movie-img" :alt="item.title || item.name" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div v-for="image in item.images.logos" :key="image.file_path" class="card-container">
          <div class="card">
            <div class="card-body">
              <img :src="image.file_path ? `https://image.tmdb.org/t/p/w500${image.file_path}` : 'https://i.imgur.com/42uQxSx.png'" class="logo-img" :alt="item.title || item.name" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      item: null,
    };
  },

  created() {
    this.fetchItemDetails();
  },

  watch: {
    "$route.params.id": "fetchItemDetails",
  },

  computed: {
    trailer() {
      return this.item.videos.results.find((video) => video.type === "Trailer")?.key;
    },
  },

  methods: {
    fetchItemDetails() {
      const id = this.$route.params.id;
      const searchType = this.$route.query.searchType || "movie"; // Default to 'movie' if not specified

      axios
        .get(`${process.env.VUE_APP_API_URL}/movies/tmdb/${id}?searchType=${searchType}`)
        .then((response) => {
          this.item = response.data;
        })
        .catch((error) => {
          console.error("Error fetching item details:", error);
        });
    },
  },
};
</script>
