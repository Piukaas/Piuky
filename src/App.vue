<template>
  <NavBar />
  <div class="row router-view-wrapper">
    <router-view class="col-lg-8 col-6 router-view-content" />
  </div>
</template>

<script>
import NavBar from "@/components/core/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.router-view-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.router-view-content {
  margin: 100px 0;
}

@media (max-width: 1000px) {
  .router-view-content {
    margin: 100px 0;
  }
}
</style>
