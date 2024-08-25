<template>
  <div v-if="item">
    <button class="btn btn-primary mr-10" @click="showImages('logos')"><i class="fas fa-icons"></i> Logos</button>
    <button class="btn btn-primary" @click="showImages('posters')"><i class="fas fa-image"></i> Show Posters</button>
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
  </div>

  <image-modal :is-visible="isImageModalVisible" :images="modalImages" :type="modalType" @close="toggleImageModal" />
</template>

<script>
import axios from "axios";
import ImageModal from "@/components/pages/movies/ImageModal.vue";

export default {
  components: {
    ImageModal,
  },

  data() {
    return {
      item: null,
      isImageModalVisible: false,
      modalImages: [],
      modalType: "",
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
      return this.item?.videos?.results.find((video) => video.type === "Trailer")?.key;
    },
  },

  methods: {
    showImages(type) {
      if (type === "logos") {
        this.modalImages = this.item.images.logos;
        this.modalType = "logo";
      } else if (type === "posters") {
        this.modalImages = this.item.images.posters;
        this.modalType = "poster";
      }
      this.isImageModalVisible = true;
    },

    toggleImageModal() {
      this.isImageModalVisible = !this.isImageModalVisible;
    },

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
