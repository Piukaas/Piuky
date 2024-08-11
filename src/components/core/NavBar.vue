```vue ```vue
<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/services">Services</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <button class="btn btn-warning language-switch" :class="{ 'nl-selected': currentLanguage === 'nl', 'en-selected': currentLanguage === 'en' }" @click="switchLanguage">
        <img :src="nlFlag" alt="NL Flag" :class="{ active: currentLanguage === 'nl' }" class="icon-size" />
        |
        <img :src="ukFlag" alt="UK Flag" :class="{ active: currentLanguage === 'en' }" class="icon-size" />
      </button>
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
      const newLanguage = this.currentLanguage === "nl" ? "en" : "nl";
      this.currentLanguage = newLanguage;
      this.$changeLanguage(newLanguage);
    },
  },
};
</script>

<style>
.language-switch img {
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.5s ease;
}

.btn {
  height: fit-content !important;
  border-radius: 100px !important;
  background-color: transparent !important; /* Override .btn-warning background */
  border: none !important;
}

.icon-size {
  width: 24px;
  height: 24px;
  margin: 0 10px;
}

.language-switch img.active {
  opacity: 1;
}

.nl-selected {
  background: linear-gradient(to right, #ffc107 50%, white 50%);
}

.en-selected {
  background: linear-gradient(to right, white 50%, #ffc107 50%);
}
</style>
