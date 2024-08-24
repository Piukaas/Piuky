<template>
  <b-modal v-model="localIsVisible" has-modal-card trap-focus :destroy-on-hide="false" aria-role="dialog" aria-label="Example Modal" close-button-aria-label="Close" aria-modal class="custom-modal">
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Login</p>
          <i class="fas fa-xmark close" @click="closeModal"></i>
        </header>
        <section class="modal-card-body">
          <b-field label="Email">
            <b-input type="email" v-model="email" placeholder="Your email" required></b-input>
          </b-field>

          <b-field label="Password">
            <b-input type="password" v-model="password" password-reveal placeholder="Your password" required></b-input>
          </b-field>

          <b-checkbox>Remember me</b-checkbox>
        </section>
        <footer class="modal-card-foot">
          <button type="button" class="btn btn-outline-danger" @click="closeModal">{{ $t("close") }}</button>
          <button type="submit" class="btn btn-primary">{{ $t("login") }}</button>
        </footer>
      </div>
    </form>
  </b-modal>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      localIsVisible: this.isVisible,
      email: "",
      password: "",
    };
  },

  watch: {
    isVisible(newVal) {
      this.localIsVisible = newVal;
    },

    localIsVisible(newVal) {
      this.$emit("update:isVisible", newVal);
    },
  },

  methods: {
    closeModal() {
      this.localIsVisible = false;
    },
  },
};
</script>
