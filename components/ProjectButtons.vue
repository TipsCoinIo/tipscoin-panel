<template>
  <v-row class="buttons">
    <v-col :cols="4" :md="4">
      <a class="btn" href="https://tipscoin.io" target="_blank">
        <img src="/img/logo.svg" style="padding: 0px 1%" />
        <span class="name">website</span>
      </a>
    </v-col>
    <v-col :cols="4" :md="4">
      <a
        class="btn"
        :href="
          $props.site === 'ap'
            ? 'https://bot.tipscoin.io'
            : 'https://ap.tipscoin.io'
        "
        target="_blank"
      >
        <img src="/img/logo.svg" style="padding: 0px 1%" />
        <span class="name">{{
          $props.site === 'ap' ? 'bot' : 'affiliate program'
        }}</span>
      </a>
    </v-col>
    <v-col :cols="4" :md="4">
      <a class="btn" href="https://stream.ad" target="_blank">
        <img src="/img/streamad-dot.svg" />
        <span class="name">project</span>
      </a>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ProjectButtons',
  props: {
    site: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: enigmatic;
  src: url('~/assets/enigmatic.ttf');
}

.buttons {
  .btn {
    display: block;
    width: 100%;
    text-align: center;
    text-decoration: none;
    background: #f2f2f2;
    border: 1px solid #a3a3a3;
    border-radius: 4px;
    line-height: 12px;
    padding: 10px 0px;

    img {
      width: 80%;
    }
    .name {
      display: block;
      color: #272822;
      font-family: enigmatic;
    }
  }
}
</style>
