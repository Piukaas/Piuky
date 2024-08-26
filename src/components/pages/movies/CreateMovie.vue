<template>
  <div v-if="item">
    <button class="btn btn-primary mr-10" @click="togglePosterModal"><i class="fas fa-image"></i> {{ $t("choose_poster") }}</button>
    <button class="btn btn-primary" @click="toggleLogoModal"><i class="fas fa-icons"></i> {{ $t("choose_logo") }}</button>
    <b-tooltip :label="activeButtons.includes('wishlist') ? $t('remove_from_wishlist') : $t('add_to_wishlist')" :type="currentTheme === Themes.LIGHT ? 'is-dark' : 'is-light'" position="is-top">
      <button class="btn btn-outline-danger btn-round" :class="{ active: activeButtons.includes('wishlist') }" @click="toggleActiveButton('wishlist')">
        <i class="fas fa-heart"></i>
      </button>
    </b-tooltip>

    <button class="btn btn-outline-disc disc-size" :class="{ active: activeButtons.includes('disc4k') }" @click="toggleActiveButton('disc4k')">
      <img :src="disc4k" />
    </button>
    <button class="btn btn-outline-disc disc-size" :class="{ active: activeButtons.includes('bluray') }" @click="toggleActiveButton('bluray')">
      <img :src="bluray" />
    </button>
    <button class="btn btn-outline-disc disc-size" :class="{ active: activeButtons.includes('dvd') }" @click="toggleActiveButton('dvd')">
      <img :src="dvd" />
    </button>

    <h1>{{ item.title || item.name }}</h1>
    <img v-if="posterPath" :src="`https://image.tmdb.org/t/p/w500${posterPath}`" class="poster-img" :alt="item.title || item.name" />
    <img v-if="logoPath" :src="`https://image.tmdb.org/t/p/w500${logoPath}`" class="logo-img" :alt="item.title || item.name" />
    <p>{{ item.tagline }}</p>
    <p v-if="searchType === 'movie'">{{ dateUtils.formatDate(item.release_date) }}</p>
    <p v-else>{{ dateUtils.formatDate(item.first_air_date) }} t/m {{ dateUtils.formatDate(item.last_air_date) }}</p>
    <p>{{ runtimeText }}</p>
    <p>{{ $t(item.status ? item.status.toLowerCase().replace(/ /g, "_") : "") }}</p>
    <b-rate v-model="item.vote_average" :show-score="true" icon="fas fa-bone" :max="10" icon-pack="fas" :spaced="true" disabled></b-rate>
    <a :href="`https://www.youtube.com/watch?v=${trailer}`" target="_blank">Trailer</a>
    <p>{{ item.overview }}</p>
    <p v-for="genre in item.genres" :key="genre.id">{{ genre.name }}</p>
    <div v-for="season in item.seasons" :key="season._id">
      <h3>{{ season.name }}</h3>
      <p>{{ season.overview }}</p>
      <p>{{ dateUtils.formatDate(season.air_date) }}</p>
      <b-rate v-model="item.vote_average" :show-score="true" icon="fas fa-bone" :max="10" icon-pack="fas" :spaced="true" disabled></b-rate>
      <ul>
        <li v-for="episode in season.episode_count" :key="episode">Aflevering {{ episode }}</li>
      </ul>
    </div>
  </div>

  <image-modal :is-visible="isPosterModalVisible" :images="item?.images?.posters" type="poster" @update:isVisible="isPosterModalVisible = $event" @image-clicked="setPosterValue" />
  <image-modal :is-visible="isLogoModalVisible" :images="item?.images?.logos" type="logo" @update:isVisible="isLogoModalVisible = $event" @image-clicked="setLogoValue" />
</template>

<script>
import Themes from "@/assets/enums/themes";
import bluray from "@/assets/svg/blu-ray.svg";
import disc4k from "@/assets/svg/disc-4k.svg";
import dvd from "@/assets/svg/dvd.svg";
import UserService from "@/assets/utils/user-service";
import ImageModal from "@/components/pages/movies/ImageModal.vue";
import axios from "axios";
import DateUtils from "@/assets/utils/date-utils";

export default {
  components: {
    ImageModal,
  },

  data() {
    return {
      Themes,
      disc4k,
      bluray,
      dvd,
      item: null,
      isPosterModalVisible: false,
      isLogoModalVisible: false,
      userService: new UserService(),
      activeButtons: [],
      posterPath: "",
      logoPath: "",
      searchType: "",
      dateUtils: new DateUtils(),
    };
  },

  created() {
    if (!this.userService.isAuthenticated()) {
      this.$router.push("/?login=true");
    }

    this.searchType = this.$route.query.searchType || "movie";
    this.fetchDetails();
  },

  watch: {
    "$route.params.id": "fetchDetails",
  },

  computed: {
    trailer() {
      return this.item?.videos?.results.find((video) => video.type === "Trailer")?.key;
    },

    runtimeText() {
      if (this.searchType === "movie") {
        return `${this.item.runtime} ${this.$t("minutes")}`;
      } else {
        const runtime = this.item.last_episode_to_air ? this.item.last_episode_to_air.runtime : "";
        return `${this.$t("around")} ${runtime} ${this.$t("minutes_per_episode")}`;
      }
    },
  },

  methods: {
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

    setPosterValue(filePath) {
      this.posterPath = filePath;
      this.togglePosterModal();
    },

    setLogoValue(filePath) {
      this.logoPath = filePath;
      this.toggleLogoModal();
    },

    togglePosterModal() {
      this.isPosterModalVisible = !this.isPosterModalVisible;
    },

    toggleLogoModal() {
      this.isLogoModalVisible = !this.isLogoModalVisible;
    },

    toggleActiveButton(button) {
      const index = this.activeButtons.indexOf(button);
      if (index === -1) {
        this.activeButtons.push(button);
      } else {
        this.activeButtons.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.disc-size {
  width: 80px;
  height: 40px;
}
</style>
