<template>
  <div class="logo-container" @click="moveVan">
    <img :src="Clouds" class="logo" />
    <img :src="Van" class="logo van" :class="{ 'move-left': isVanMoved }" />
  </div>
  <menu-button />
</template>

<script>
import MenuButton from "@/components/items/MenuButton.vue";
import Clouds from "@/assets/clouds.png";
import Van from "@/assets/van.png";

export default {
  components: {
    MenuButton,
  },

  data() {
    return {
      Clouds,
      Van,
      isVanMoved: false,
    };
  },
  methods: {
    moveVan() {
      this.isVanMoved = !this.isVanMoved;
    },
  },
};
</script>

<style scoped>
.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 2;
  width: 15%;
  cursor: pointer;
}

@media (max-width: 768px) {
  .logo-container {
    width: 40%;
  }
}

.logo {
  width: 100%;
}

.van {
  transition: transform 1.5s ease-in-out;
}

.move-left {
  animation: hop 0.5s ease-in-out, move-left 1s ease-in-out 0.5s;
}

@keyframes hop {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes move-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100vw);
  }
}
</style>
