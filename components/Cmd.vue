<template>
  <span class="cmd" @click="copy"><slot /></span>
</template>

<script>
export default {
  name: 'CmdComp',
  methods: {
    copy() {
      navigator.clipboard.writeText(this.$el.textContent.trim())
      this.$store.commit('openSnackbar', {
        text: 'Command copied to clipboard!',
      })
    },
  },
}
</script>

<style scoped>
.cmd {
  background: #000;
  color: #fff;
  font-family: monospace;
  padding: 3px 9px;
  border-radius: 3px;
  box-shadow: 0px 0px 6px #818181;
  font-size: 0.9em;
  cursor: pointer;
  user-select: none;
}
</style>
