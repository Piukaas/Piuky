<template>
  <NavBar />
  <div class="router-view-wrapper">
    <router-view class="router-view-content"></router-view>
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
  max-width: 100vw;
}

.router-view-content {
  margin-left: 220px;
  margin-right: 220px;
}

@media (max-width: 600px) {
  .router-view-content {
    margin-top: 150px;
    margin-left: 75px;
    margin-right: 75px;
  }
}
</style>
