<template>
  <div class="logo-container" @click="moveVan">
    <img :src="clouds" class="logo" />
    <img :src="van" class="logo van" :class="{ 'move-left': isVanMoved }" />
  </div>

  <div v-if="isMenuVisible" class="overlay" @click="toggleMenu">
    <div class="menu" :class="{ 'fade-out': isMenuClosing }" @click.stop @animationend="handleAnimationEnd">
      <!-- Menu Content -->
      <i class="fa fa-x close" @click="toggleMenu"></i>
      <ul class="menu-items">
        <li><i class="fa-solid fa-user-astronaut"></i> {{ $t("account") }}</li>
        <hr />
        <li v-for="(item, index) in menuItems" :key="index">{{ item }}</li>
        <hr />
        <li>
          <switch-button colorClass="warning" :left-value="nlFlag" :right-value="ukFlag" type="svg" :default-selection="currentLanguage === 'nl' ? 'left' : 'right'" @click="switchLanguage" />
        </li>
        <li>
          <switch-button
            left-value="fas fa-sun"
            left-color="yellow"
            right-value="fas fa-moon"
            right-color="darkblue"
            right-txt-color="yellow"
            type="icon"
            :default-selection="currentTheme === 'light' ? 'left' : 'right'"
            @click="switchTheme"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import nlFlag from "@/assets/svg/nl-flag.svg";
import ukFlag from "@/assets/svg/uk-flag.svg";
import SwitchButton from "@/components/items/SwitchButton.vue";
import clouds from "@/assets/clouds.png";
import van from "@/assets/van.png";

export default {
  components: {
    SwitchButton,
  },

  data() {
    return {
      nlFlag,
      ukFlag,
      clouds,
      van,
      isVanMoved: false,
      isMenuOpen: false,
      isMenuVisible: false,
      isMenuClosing: false,
      menuItems: ["Item 1", "Item 2", "Item 3", "Item 4"],
      currentLanguage: localStorage.getItem("locale") || "nl",
      currentTheme: localStorage.getItem("theme") || "light",
    };
  },
  methods: {
    moveVan() {
      this.isVanMoved = true;
      setTimeout(() => {
        this.toggleMenu();
      }, 750);
      setTimeout(() => {
        this.isVanMoved = false;
      }, 1500);
    },

    toggleMenu() {
      if (this.isMenuOpen) {
        this.isMenuClosing = true;
      } else {
        this.isMenuVisible = true;
        this.isMenuOpen = true;
      }
    },

    handleAnimationEnd() {
      if (this.isMenuClosing) {
        this.isMenuOpen = false;
        this.isMenuVisible = false;
        this.isMenuClosing = false;
      }
    },

    switchLanguage() {
      this.currentLanguage = this.currentLanguage === "nl" ? "en" : "nl";
      this.$changeLanguage(this.currentLanguage);
    },

    switchTheme() {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
      this.$changeTheme(this.currentTheme);
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

@media (max-width: 900px) {
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
  position: absolute;
  top: 20px;
  left: 20px;
  width: 200px;
  height: 350px;
  border: 3px solid #05384b !important;
  background-color: #f6f0e0 !important;
  color: #05384b !important;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 20px;
  border-radius: 25px;
  animation: fadeIn 0.5s ease forwards;
  transition: all 0.3s ease;
}

.fade-out {
  animation: fadeOut 0.5s ease forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
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
