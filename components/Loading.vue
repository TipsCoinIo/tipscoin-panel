<template>
  <div
    v-if="loading"
    class="loading-page"
    style="display: flex; align-items: center; justify-content: center"
  >
    <img class="anim" src="/img/tips.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style scoped lang="scss">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.anim {
  width: 200px;
  height: 200px;
  animation: animate 2s linear infinite;
}
@keyframes animate {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>
