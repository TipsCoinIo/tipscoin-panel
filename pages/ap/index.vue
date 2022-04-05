<template>
  <v-container fill-height justify-center>
    <div style="width: 700px; max-width: 100%">
      <div class="d-flex align-center justify-space-between mb-5">
        <img src="/img/logo.svg" class="img-responsive" style="width: 200px" />
        <div class="text-overline">REFERRAL PROGRAM</div>
      </div>
      <v-card rounded class="mb-5">
        <v-card-text>
          <div v-html="$store.state.apConfig.text_homepage" />
        </v-card-text>
      </v-card>
      <v-row class="buttons">
        <v-col :cols="12" :md="4">
          <a class="btn" href="https://tipscoin.io">
            <img src="/img/logo.svg" style="padding: 0px 1%" />
            <span class="name">website</span>
          </a>
        </v-col>
        <v-col :cols="12" :md="4">
          <a class="btn" href="https://bot.tipscoin.io">
            <img src="/img/logo.svg" style="padding: 0px 1%" />
            <span class="name">bot</span>
          </a>
        </v-col>
        <v-col :cols="12" :md="4">
          <a class="btn" href="https://stream.ad">
            <img src="/img/streamad-dot.svg" />
            <span class="name">project</span>
          </a>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

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

<script>
export default {
  name: 'AffiliateProgramPage',
  auth: false,
  layout: 'ap',
}
</script>
