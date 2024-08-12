<template>
  <nav class="navbar">
    <menu-button />
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/services">Services</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <switch-button :left-value="nlFlag" :right-value="ukFlag" type="svg" :default-selection="currentLanguage === 'nl' ? 'left' : 'right'" @click="switchLanguage" />
      <switch-button left-value="fas fa-sun" left-color="yellow" right-value="fas fa-moon" right-color="darkblue" right-txt-color="yellow" type="icon" />
      <switch-button left-value="Hoi" left-color="yellow" right-value="Doei" right-color="black" right-txt-color="white" type="txt" />
    </ul>
  </nav>
</template>

<script>
import nlFlag from "@/assets/svg/nl-flag.svg";
import ukFlag from "@/assets/svg/uk-flag.svg";
import SwitchButton from "@/components/items/SwitchButton.vue";
import MenuButton from "@/components/items/MenuButton.vue";

export default {
  components: {
    SwitchButton,
    MenuButton,
  },

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
