<template>
  <div
    class="modal fade modal-lg"
    tabindex="-1"
    :class="{ show: localIsVisible }"
    :style="{ display: localIsVisible ? 'block' : 'none' }"
    @click.self="closeModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ $t("login") }}</h3>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <form
          class="needs-validation"
          novalidate
          @submit.prevent="validateForm"
        >
          <div class="modal-body">
            <div class="form-check">
              <label for="email" class="form-label required">{{
                $t("email")
              }}</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
                required
                @blur="validateField"
              />
              <div class="invalid-feedback">{{ $t("email_invalid") }}</div>
              <div class="valid-feedback">{{ email + $t("email_valid") }}</div>
            </div>

            <div class="form-check">
              <label for="password" class="form-label required">{{
                $t("password")
              }}</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                required
                @blur="validateField"
              />
              <div class="invalid-feedback">{{ $t("password_invalid") }}</div>
              <div class="valid-feedback">
                {{ maskedPassword + $t("password_valid") }}
              </div>
            </div>

            <div v-if="error" class="p-2 alert alert-danger" role="alert">
              {{ $t(error) }}
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="closeModal"
            >
              {{ $t("close") }}
            </button>
            <button type="submit" class="btn btn-primary">
              {{ $t("login") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
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
            localStorage.setItem("user_id", data.user._id);
            localStorage.setItem("expires_at", JSON.stringify(expiresAt));
            this.userService.setUsername(data.user.username);

            this.$emit("login-success", data.user.username);
            this.successMessage();
            this.closeModal();
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            this.error = "wrong_credentials";
          } else {
            this.error = "login_failed";
            throw new of(error);
          }
        });
    },

    successMessage() {
      this.$buefy.notification.open({
        duration: 5000,
        message: this.$t("login_success"),
        type: "is-success",
      });
    },
  },
};
</script>
