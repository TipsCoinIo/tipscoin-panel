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
  name: 'LoginLayout',
  head() {
    return {
      title: 'Login',
      meta: socialMeta(),
    }
  },
}
</script>
