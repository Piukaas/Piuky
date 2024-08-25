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
}

.router-view-content {
  padding-left: 220px;
  padding-right: 220px;
}
</style>
