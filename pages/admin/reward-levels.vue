<template>
  <v-container>
    Reward Levels
    <RewardLevelsForm :levels="levels" />
  </v-container>
</template>

<script>
export default {
  name: 'RewardLevels',
  layout: 'admin',
  async asyncData({ $axios }) {
    return {
      levels: await $axios.$get('api/admin/reward-levels'),
    }
  },
  head() {
    return {
      title: 'reward levels',
    }
  },
}
</script>
