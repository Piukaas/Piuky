<template>
  <b-modal v-model="localIsVisible" has-modal-card trap-focus :destroy-on-hide="false" aria-role="dialog" aria-label="Image Modal" close-button-aria-label="Close" aria-modal>
    <form class="needs-validation" novalidate @submit.prevent="validateForm">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ $t(type === "logo" ? "choose_logo" : "choose_poster") }}</p>
          <i class="fas fa-xmark close" @click="closeModal"></i>
        </header>
        <section class="modal-card-body">
          <div class="row">
            <div v-for="image in images" :key="image.file_path" class="card-container col-lg-4 col-6">
              <div class="card">
                <div class="card-body">
                  <img :src="image.file_path ? `https://image.tmdb.org/t/p/w500${image.file_path}` : 'https://i.imgur.com/42uQxSx.png'" class="logo-img" />
                </div>
              </div>
            </div>

            <div v-if="!images?.length" class="alert alert-danger" role="alert">{{ $t("no_results") }}</div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button type="button" class="btn btn-outline-danger" @click="closeModal">{{ $t("close") }}</button>
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
    images: {
      type: Array,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: "poster",
      validator: (value) => ["poster", "logo"].includes(value),
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
  },
};
</script>
