<template>
  <menu-button />
  <router-link to="/fortnite">
    <img :src="Logo" alt="logo" class="logo" />
  </router-link>
</template>

<script>
import Logo from "@/assets/logo.png";
import MenuButton from "@/components/items/MenuButton.vue";

export default {
  components: {
    MenuButton,
  },

  data() {
    return {
      Logo,
    };
  },
};
</script>

<style scoped>
.logo {
  position: fixed;
  z-index: 2;
  width: 15%;
}
</style>
