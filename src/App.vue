<template>
  <NavBar />
  <h1>{{ $t("hello_world") }}</h1>
  <b-button rounded class="button-margin" type="is-primary">Primary</b-button>
  <b-button rounded icon-pack="fa" icon-left="skull" class="button-margin is-round" type="is-primary"></b-button>
  <b-button rounded class="button-margin" type="is-primary" outlined>Primary Outlined</b-button>
  <b-button rounded class="button-margin" type="is-primary is-light">Primary Light</b-button>

  <b-button rounded class="button-margin" type="is-secondary">Secondary</b-button>
  <b-button rounded icon-pack="fa" icon-left="skull" class="button-margin is-round" type="is-secondary"></b-button>
  <b-button rounded class="button-margin" type="is-secondary" outlined>Secondary Outlined</b-button>
  <b-button rounded class="button-margin" type="is-secondary is-light">Secondary Light</b-button>

  <b-button rounded class="button-margin" type="is-blackwhite">Blackwhite</b-button>
  <b-button rounded icon-pack="fa" icon-left="skull" class="button-margin is-round" type="is-blackwhite"></b-button>
  <b-button rounded class="button-margin" type="is-blackwhite" outlined>Blackwhite Outlined</b-button>
  <b-button rounded class="button-margin" type="is-blackwhite is-light">Blackwhite Light</b-button>

  <b-button rounded class="button-margin" type="is-success">Success</b-button>
  <b-button rounded class="button-margin" type="is-success" outlined>Success Outlined</b-button>
  <b-button rounded class="button-margin" type="is-success is-light">Success Light</b-button>

  <b-button rounded class="button-margin" type="is-danger">Danger</b-button>
  <b-button rounded class="button-margin" type="is-danger" outlined>Danger Outlined</b-button>
  <b-button rounded class="button-margin" type="is-danger is-light">Danger Light</b-button>

  <b-button rounded class="button-margin" type="is-warning">Warning</b-button>
  <b-button rounded class="button-margin" type="is-warning" outlined>Warning Outlined</b-button>
  <b-button rounded class="button-margin" type="is-warning is-light">Warning Light</b-button>

  <b-button rounded class="button-margin" type="is-info">Info</b-button>
  <b-button rounded class="button-margin" type="is-info" outlined>Info Outlined</b-button>
  <b-button rounded class="button-margin" type="is-info is-light">Info Light</b-button>

  <b-button rounded class="button-margin" type="is-link">Link</b-button>
  <b-button rounded class="button-margin" type="is-link" outlined>Link Outlined</b-button>
  <b-button rounded class="button-margin" type="is-link is-light">Link Light</b-button><br />

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
