<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/services">Services</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <b-button rounded class="is-primary language-switch" @click="switchLanguage">
        <div class="flag-container">
          <img :src="nlFlag" alt="NL Flag" :class="{ active: currentLanguage === 'nl' }" class="icon-size" />
          <div class="separator"></div>
          <img :src="ukFlag" alt="UK Flag" :class="{ active: currentLanguage === 'en' }" class="icon-size" />
        </div>
        <div class="overlay" :class="{ 'nl-selected': currentLanguage === 'nl', 'en-selected': currentLanguage === 'en' }"></div>
      </b-button>
    </ul>
  </nav>
</template>

<script>
import nlFlag from "@/assets/svg/nl-flag.svg";
import ukFlag from "@/assets/svg/uk-flag.svg";

export default {
  name: "NavBar",
  data() {
    return {
      currentLanguage: localStorage.getItem("locale") || "nl",
      nlFlag,
      ukFlag,
    };
  },
  methods: {
    switchLanguage() {
      this.currentLanguage = this.currentLanguage === "nl" ? "en" : "nl";
      this.$changeLanguage(this.currentLanguage);
    },
  },
};
</script>

<style>
.language-switch {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
}

.flag-container {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.language-switch img {
  opacity: 0.5;
  transition: opacity 0.5s ease;
}

.is-primary {
  background-color: transparent !important;
  border: 2px solid black !important;
  color: black !important;
}

.is-primary:focus {
  outline: none !important;
}

.icon-size {
  width: 24px;
  height: 24px;
}

.language-switch img.active {
  opacity: 1;
}

.separator {
  width: 2px;
  height: 24px;
  background-color: black;
  margin: 0 10px;
}

.overlay {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  background-color: #ffc107;
  transition: all 0.5s ease;
  z-index: 0;
}

@media (min-width: 900px) {
  .language-switch:hover .overlay.nl-selected {
    left: 0;
    width: 100%;
  }

  .language-switch:hover .overlay.en-selected {
    right: 0;
    width: 100%;
  }
}

.nl-selected {
  left: 0;
  width: 50%;
}

@media (max-width: 900px) {
  .en-selected {
    left: 50%;
  }
}

.en-selected {
  right: 0;
  width: 50%;
}
</style>
