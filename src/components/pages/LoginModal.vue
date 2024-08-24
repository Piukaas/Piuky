<template>
  <b-modal v-model="localIsVisible" has-modal-card trap-focus :destroy-on-hide="false" aria-role="dialog" aria-label="Example Modal" close-button-aria-label="Close" aria-modal class="custom-modal">
    <form class="needs-validation" novalidate @submit.prevent="validateForm">
      <div class="modal-card" style="margin: 20px">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ $t("login") }}</p>
          <i class="fas fa-xmark close" @click="closeModal"></i>
        </header>
        <section class="modal-card-body">
          <div class="form-check">
            <label for="email" class="form-label required">{{ $t("email") }}</label>
            <input type="email" class="form-control" id="email" v-model="email" required @blur="validateField" />
            <div class="invalid-feedback">{{ $t("email_invalid") }}</div>
            <div class="valid-feedback">{{ email + $t("email_valid") }}</div>
          </div>

          <div class="form-check">
            <label for="password" class="form-label required">{{ $t("password") }}</label>
            <input type="password" class="form-control" id="password" v-model="password" required @blur="validateField" />
            <div class="invalid-feedback">{{ $t("password_invalid") }}</div>
            <div class="valid-feedback">{{ maskedPassword + $t("password_valid") }}</div>
          </div>
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

  computed: {
    maskedPassword() {
      return "*".repeat(this.password.length);
    },
  },

  methods: {
    closeModal() {
      this.localIsVisible = false;
    },

    validateForm() {
      const form = this.$el.querySelector(".needs-validation");
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      this.submitForm();
    },

    validateField(event) {
      const field = event.target;
      if (field && field.checkValidity) {
        if (!field.checkValidity()) {
          field.classList.add("is-invalid");
          field.classList.remove("is-valid");
        } else {
          field.classList.add("is-valid");
          field.classList.remove("is-invalid");
        }
      }
    },

    submitForm() {
      console.log("Form submitted with:", this.email, this.password);
      this.closeModal();
    },
  },
};
</script>
