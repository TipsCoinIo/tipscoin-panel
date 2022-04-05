<template>
  <v-sheet outlined rounded class="sheet pa-3">
    <small class="title">{{ $props.title }}</small>
    <slot />
  </v-sheet>
</template>

<script>
export default {
  name: 'TextGroup',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style scoped>
.sheet {
  position: relative;
}

.title {
  position: absolute;
  font-size: 10px !important;
  line-height: 12px;
  top: -6px;
  background: #fff;
  padding: 0 10px;
  font-weight: normal !important;
}
</style>
