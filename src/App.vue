<template>
  <NavBar />
  <h1>{{ $t("hello_world") }}</h1>
  <button type="button" class="btn btn-primary button-margin">Primary</button>
  <button type="button" class="btn btn-primary button-margin round-btn"><i class="fa fa-skull"></i></button>
  <button type="button" class="btn btn-outline-primary button-margin">Primary Outlined</button>
  <button type="button" class="btn btn-light-primary button-margin">Primary Light</button>

  <button type="button" class="btn btn-secondary button-margin">Secondary</button>
  <button type="button" class="btn btn-secondary button-margin round-btn"><i class="fa fa-skull"></i></button>
  <button type="button" class="btn btn-outline-secondary button-margin">Secondary Outlined</button>
  <button type="button" class="btn btn-light-secondary button-margin">Secondary Light</button>

  <button type="button" class="btn btn-blackwhite button-margin">Blackwhite</button>
  <button type="button" class="btn btn-blackwhite button-margin round-btn"><i class="fa fa-skull"></i></button>
  <button type="button" class="btn btn-outline-blackwhite button-margin">Blackwhite Outlined</button>
  <button type="button" class="btn btn-light-blackwhite button-margin">Blackwhite Light</button>

  <button type="button" class="btn btn-success button-margin">Success</button>
  <button type="button" class="btn btn-outline-success button-margin">Success Outlined</button>
  <button type="button" class="btn btn-light-success button-margin">Success Light</button>

  <button type="button" class="btn btn-danger button-margin">Danger</button>
  <button type="button" class="btn btn-outline-danger button-margin">Danger Outlined</button>
  <button type="button" class="btn btn-light-danger button-margin">Danger Light</button>

  <button type="button" class="btn btn-warning button-margin">Warning</button>
  <button type="button" class="btn btn-outline-warning button-margin">Warning Outlined</button>
  <button type="button" class="btn btn-light-warning button-margin">Warning Light</button>

  <button type="button" class="btn btn-info button-margin">Info</button>
  <button type="button" class="btn btn-outline-info button-margin">Info Outlined</button>
  <button type="button" class="btn btn-light-info button-margin">Info Light</button>

  <button type="button" class="btn btn-link button-margin">Link</button>
  <button type="button" class="btn btn-outline-link button-margin">Link Outlined</button>
  <button type="button" class="btn btn-light-link button-margin">Link Light</button><br />

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

<style>
.button-margin {
  margin: 10px;
}
</style>
