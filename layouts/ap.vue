<template>
  <v-app>
    <v-main class="blue-grey lighten-4">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import socialMeta from '@/helpers/socialMeta'

export default {
  name: 'ApLayout',
  middleware: 'ap',
  head() {
    return {
      titleTemplate: '%s - Tips Coin',
      title: 'Affiliate program',
      meta: socialMeta('ap'),
    }
  },
}
</script>

<style>
.v-card__text {
  color: rgba(0, 0, 0, 0.8) !important;
}
</style>
