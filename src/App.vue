<template>
  <NavBar />
  <h1>{{ $t("hello_world") }}</h1>
  <b-button type="is-danger">Primary</b-button>
  <b-rate icon-pack="fas" @change="danger"></b-rate>
  <img alt="Vue logo" src="./assets/logo.png" />
  <i class="fas fa-user-secret"></i>
  <router-view></router-view>
</template>

<script>
import NavBar from "@/components/core/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
