<template>
  <v-container>
    <v-textarea v-model="texts.text_homepage" label="Homepage text" outlined />
    <v-textarea
      v-model="texts.text_userpage"
      label="User statistics text"
      outlined
    />
    <v-textarea v-model="texts.text_info" label="Info text" outlined />
    <v-btn @click="save">Save texts</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'SettingsPage',
  layout: 'admin',
  async asyncData({ $axios }) {
    return {
      texts: await $axios.$get('api/ap/config'),
    }
  },
  methods: {
    save() {
      this.$nuxt.$loading.start()
      this.$axios.$post('api/admin/apConfig', this.texts).finally(() => {
        this.$nuxt.$loading.finish()
      })
    },
  },
  head() {
    return {
      title: 'settings',
    }
  },
}
</script>
