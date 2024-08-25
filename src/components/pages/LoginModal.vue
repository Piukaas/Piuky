<template>
  <b-modal v-model="localIsVisible" has-modal-card trap-focus :destroy-on-hide="false" aria-role="dialog" aria-label="Login Modal" close-button-aria-label="Close" aria-modal>
    <form class="needs-validation" novalidate @submit.prevent="validateForm">
      <div class="modal-card">
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

          <div v-if="error" class="alert alert-danger" role="alert">{{ $t(error) }}</div>
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
import UserService from "@/assets/utils/user-service";
import axios from "axios";
import { of } from "rxjs";

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
      error: "",
      email: "",
      password: "",
      userService: new UserService(),
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

  // LoginModal.vue
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
      this.onLogin();
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

    onLogin() {
      const { email, password } = this;
      axios
        .post(`${process.env.VUE_APP_API_URL}/users/login`, {
          email,
          password,
        })
        .then((response) => {
          const data = response.data;
          if (data !== null) {
            const expiresAt = data.expiresIn * 1000 + Date.now();
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.user.username);
            localStorage.setItem("expires_at", JSON.stringify(expiresAt));
            this.userService.setUsername(data.user.username);

            this.$emit("login-success", data.user.username); // Emit event with username

            this.closeModal();
          }
        })
        .catch((error) => {
          if (error.status === 400) {
            this.error = "wrong_login_information";
          } else {
            throw of(error);
          }
        });
    },
  },
};
</script>
