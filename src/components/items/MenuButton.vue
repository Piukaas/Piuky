<template>
  <div>
    <!-- Morphing button -->
    <button type="button" v-if="!isMenuOpen && !isMorphingBack" rounded class="btn btn-switch menu-button" @click="toggleMenu" :class="{ morphing: isMorphing }">
      <i class="fa fa-hamburger"></i>
    </button>

    <!-- Menu with overlay -->
    <div v-else class="overlay" @click="toggleMenu">
      <div class="menu" :class="{ morphingBack: isMorphingBack }" @click.stop>
        <!-- Menu Content -->
        <i class="fa fa-x close" @click="toggleMenu"></i>
        <ul class="menu-items">
          <li v-for="(item, index) in menuItems" :key="index">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      isMorphing: false,
      isMorphingBack: false,
      menuItems: ["Item 1", "Item 2", "Item 3", "Item 4"],
    };
  },
  methods: {
    toggleMenu() {
      if (!this.isMenuOpen) {
        this.isMorphing = true;
        setTimeout(() => {
          this.isMenuOpen = true;
          this.isMorphing = false;
        }, 300); // Adjust the timeout to match animation duration
      } else {
        this.isMorphingBack = true;
        setTimeout(() => {
          this.isMenuOpen = false;
          this.isMorphingBack = false;
        }, 300); // Adjust the timeout to match reverse animation duration
      }
    },
  },
};
</script>

<style scoped>
.menu-button {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  background-color: black;
  color: white;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.menu-button:hover {
  background-color: black !important;
  color: white !important;
  width: 200px;
  transition: all 0.3s ease;
}

.menu-button.morphing {
  animation: morphToMenu 0.3s forwards;
}

@keyframes morphToMenu {
  0% {
    width: 200px;
    height: 40px;
    border-radius: 25px;
  }
  100% {
    width: 200px;
    height: 200px;
    border-radius: 25px;
  }
}

.menu-button .fa {
  font-size: 24px;
  transition: opacity 0.3s ease;
}

.menu-button.morphing .fa {
  opacity: 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
  z-index: 1000;
}

.menu {
  width: 200px;
  height: auto;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px;
  border-radius: 25px;
  animation: none;
  transition: all 0.3s ease;
}

.menu.morphingBack {
  animation: morphBackToButton 0.3s forwards;
}

@keyframes morphBackToButton {
  0% {
    width: 200px;
    height: 200px;
    color: transparent;
    opacity: 1;
  }
  100% {
    width: 40px;
    height: 40px;
    opacity: 0;
    color: transparent;
  }
}

.menu-items {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.menu-items li {
  width: 100%;
  padding: 10px 0;
  text-align: left;
}

.close {
  cursor: pointer;
}
</style>
