<template>
  <nav class="navbar">
    <menu-button />
    <router-link to="/fortnite" class="logo-container">
      <img :src="Logo" alt="logo" class="logo" />
    </router-link>
  </nav>
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
.navbar {
  position: fixed;
  background-color: transparent !important;
  width: 100%;
}

.logo-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.logo {
  width: 15%;
}
</style>
