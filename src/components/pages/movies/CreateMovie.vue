<template>
  <div v-if="item">
    <button class="btn btn-primary mr-10" @click="togglePosterModal"><i class="fas fa-image"></i> {{ $t("choose_poster") }}</button>
    <button class="btn btn-primary" @click="toggleLogoModal"><i class="fas fa-icons"></i> {{ $t("choose_logo") }}</button>
    <h1>{{ item.title || item.name }}</h1>
    <p>{{ item.tagline }} - {{ item.release_date || item.first_air_date }} t/m {{ item.last_air_date }}</p>
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

  <image-modal :is-visible="isPosterModalVisible" :images="item?.images?.posters" type="poster" @close="togglePosterModal" />
  <image-modal :is-visible="isLogoModalVisible" :images="item?.images?.logos" type="logo" @close="toggleLogoModal" />
</template>

<script>
import UserService from "@/assets/utils/user-service";
import ImageModal from "@/components/pages/movies/ImageModal.vue";
import axios from "axios";

export default {
  components: {
    ImageModal,
  },

  data() {
    return {
      item: null,
      isPosterModalVisible: false,
      isLogoModalVisible: false,
      modalImages: [],
      modalType: "",
      userService: new UserService(),
    };
  },

  created() {
    if (!this.userService.isAuthenticated()) {
      this.$router.push("/?login=true");
    }

    this.fetchDetails();
  },

  watch: {
    "$route.params.id": "fetchDetails",
  },

  computed: {
    trailer() {
      return this.item?.videos?.results.find((video) => video.type === "Trailer")?.key;
    },
  },

  methods: {
    showImages(type) {
      if (type === "logo") {
        this.modalImages = this.item.images.logos;
      } else if (type === "poster") {
        this.modalImages = this.item.images.posters;
      }
      this.modalType = type;

      this.isImageModalVisible = true;
    },

    togglePosterModal() {
      this.isPosterModalVisible = !this.isPosterModalVisible;
    },

    toggleLogoModal() {
      this.isLogoModalVisible = !this.isLogoModalVisible;
    },

    fetchDetails() {
      const id = this.$route.params.id;
      const searchType = this.$route.query.searchType || "movie";

      const headers = {
        Authorization: `Bearer ${this.userService.getToken()}`,
      };

      axios
        .get(`${process.env.VUE_APP_API_URL}/movies/tmdb/${id}`, {
          params: {
            searchType,
          },
          headers,
        })
        .then((response) => {
          this.item = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
