<template>
  <v-container>
    <v-card rounded class="mb-5">
      <v-card-text v-html="$store.state.apConfig.text_info"> </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'AffiliateProgramPage',
  auth: false,
  layout: 'aphash',
}
</script>
