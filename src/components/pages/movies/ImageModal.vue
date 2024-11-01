<template>
  <div
    class="modal fade modal-lg"
    tabindex="-1"
    :class="{ show: isVisible }"
    :style="{ display: isVisible ? 'block' : 'none' }"
    @click.self="closeModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">
            {{ $t(type === "logo" ? "choose_logo" : "choose_poster") }}
          </h3>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <div
            v-if="!images?.length"
            class="p-2 alert alert-danger"
            role="alert"
          >
            {{ $t("no_results") }}
          </div>
          <div class="row">
            <div
              v-for="image in images"
              :key="image.file_path"
              class="card-container col-lg-3 col-sm-4 col-6"
            >
              <div class="card">
                <div class="card-body">
                  <img
                    :src="
                      image.file_path
                        ? `https://image.tmdb.org/t/p/w500${image.file_path}`
                        : 'https://i.imgur.com/42uQxSx.png'
                    "
                    :class="`${type}-img`"
                    @click="emitImagePath(image.file_path)"
                  />
                </div>
              </div>
            </div>
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
        </div>
      </div>
    </div>
  </div>
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

  methods: {
    closeModal() {
      this.$emit("update:isVisible", false);
    },

    emitImagePath(filePath) {
      this.$emit("image-clicked", filePath);
      this.closeModal();
    },
  },
};
</script>
