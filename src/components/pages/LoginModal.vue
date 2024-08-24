<template>
  <b-modal v-model="localIsVisible" class="modal-piuky" has-modal-card trap-focus :destroy-on-hide="false" aria-role="dialog" aria-label="Example Modal" close-button-aria-label="Close" aria-modal>
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Login</p>
          <button type="button" class="delete" @click="closeModal"></button>
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
          <b-button label="Close" @click="closeModal" />
          <b-button label="Login" type="is-primary" />
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
