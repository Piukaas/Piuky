<template>
  <div class="logo-container" @click="moveVan">
    <img :src="clouds" class="logo" />
    <img :src="van" class="logo van" :class="{ 'move-left': isVanMoved }" />
  </div>

  <div v-if="isMenuVisible" class="overlay" @click="toggleMenu">
    <div class="menu" :class="{ 'fade-out': isMenuClosing }" @click.stop @animationend="handleAnimationEnd">
      <i class="fas fa-xmark close" @click="toggleMenu"></i>
      <ul class="menu-items">
        <li>
          <div v-if="isLoggedIn" class="nav-link-container">
            <router-link to="/account" class="nav-link"> <i class="fa-solid fa-user-astronaut"></i> {{ $t("account") }} </router-link>
            <b-tooltip :label="$t('logout')" :type="currentTheme === Themes.LIGHT ? 'is-dark' : 'is-light'" position="is-right">
              <button @click="logout" class="btn btn-outline-danger btn-round btn-sm">
                <i class="fa fa-power-off"></i>
              </button>
            </b-tooltip>
          </div>
          <router-link to="/login" v-else class="nav-link">{{ $t("login") }}</router-link>
        </li>
        <hr />
        <li>
          <router-link to="/movies" class="nav-link">{{ $t("movies") }}</router-link>
        </li>
        <li>
          <router-link to="/games" class="nav-link">{{ $t("games") }}</router-link>
        </li>
        <li>
          <router-link to="/maths" class="nav-link">{{ $t("maths") }}</router-link>
        </li>
        <li>
          <router-link to="/drawings" class="nav-link">{{ $t("drawings") }}</router-link>
        </li>
        <li>
          <router-link to="/cars" class="nav-link">{{ $t("cars") }}</router-link>
        </li>
        <hr />
        <li>
          <switch-button
            :colorClass="ColorClasses.WARNING"
            :left-value="nlFlag"
            :right-value="ukFlag"
            :type="SwitchTypes.SVG"
            :default-selection="currentLanguage === Languages.NL ? Directions.LEFT : Directions.RIGHT"
            @click="switchLanguage"
          />
        </li>
        <li>
          <switch-button
            left-value="fas fa-sun"
            left-color="yellow"
            right-value="fas fa-moon"
            right-color="darkblue"
            right-txt-color="yellow"
            :type="SwitchTypes.ICON"
            :default-selection="currentTheme === Themes.LIGHT ? Directions.LEFT : Directions.RIGHT"
            @click="switchTheme"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import clouds from "@/assets/clouds.png";
import ColorClasses from "@/assets/enums/color-classes";
import Directions from "@/assets/enums/directions";
import Languages from "@/assets/enums/languages";
import SwitchTypes from "@/assets/enums/switch-types";
import Themes from "@/assets/enums/themes";
import nlFlag from "@/assets/svg/nl-flag.svg";
import ukFlag from "@/assets/svg/uk-flag.svg";
import van from "@/assets/van.png";
import SwitchButton from "@/components/items/SwitchButton.vue";

export default {
  components: {
    SwitchButton,
  },

  data() {
    return {
      // Assets
      nlFlag,
      ukFlag,
      clouds,
      van,

      // States
      isMenuClosing: false,
      isMenuOpen: false,
      isMenuVisible: false,
      isVanMoved: false,

      // Settings
      currentLanguage: localStorage.getItem("locale") || Languages.NL,
      currentTheme: localStorage.getItem("theme") || Themes.LIGHT,

      // Constants
      Themes,
      Directions,
      ColorClasses,
      SwitchTypes,
      Languages,
    };
  },

  computed: {
    isLoggedIn() {
      return localStorage.getItem("user") !== null;
    },
  },

  methods: {
    moveVan() {
      this.isVanMoved = true;
      setTimeout(() => {
        this.toggleMenu();
      }, 750);
      setTimeout(() => {
        this.isVanMoved = false;
      }, 2500);
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
      this.currentLanguage = this.currentLanguage === Languages.NL ? Languages.EN : Languages.NL;
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
  animation: hop 0.5s ease-in-out, move-left 1s ease-in-out 0.5s, move-right 1s ease-in-out 1.5s;
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

@keyframes move-right {
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(0);
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
  width: 220px;
  height: fit-content;
  border: 3px solid var(--text) !important;
  background-color: var(--background) !important;
  color: var(--text) !important;
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
    transform: scale(0.5);
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
    transform: scale(0.5);
  }
}

.menu-items {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.menu-items li {
  font-size: 20px;
  width: 100%;
  padding: 5px 0;
  text-align: left;
}

.nav-link-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-link {
  color: var(--text);
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

.nav-link:hover {
  color: var(--text);
  transform: translateX(10px);
}

.nav-link::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--text);
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
  display: inline-block;
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.close {
  color: var(--text);
  cursor: pointer;
  transition: all 0.75s ease-in-out;
}

.close:hover {
  scale: 1.5;
}
</style>
