<template>
  <v-container fill-height justify-center>
    <div style="width: 700px; max-width: 100%">
      <div class="d-flex align-center justify-space-between mb-5">
        <img src="/img/logo.svg" class="img-responsive" style="width: 200px" />
      </div>
      <v-card rounded>
        <v-card-text>
          <v-alert
            v-if="!trans"
            class="mb-0"
            outlined
            type="error"
            prominent
            border="left"
          >
            <strong>ERROR</strong> - transaction not found!
            <br />
            <small> Wrong Transaction ID (Probably a Troll) </small>
          </v-alert>
          <v-alert
            v-else
            class="mb-0"
            outlined
            :type="trans.type"
            prominent
            border="left"
          >
            <div v-if="trans.status === 'created'">
              <strong>TRANSACTION FOUND</strong> - but we need a moment to
              process it
              <br />
              <small>Please try again later.</small>
            </div>
            <div v-if="trans.status === 'no_funds'">
              <strong>ERROR</strong> - insufficient funds
            </div>
            <div v-if="trans.status === 'sent'">
              <strong>Congratulations! </strong>
            </div>
            <div v-if="trans.status === 'claimed'">
              <strong>Success </strong> - this tip has already been claimed!
            </div>
            <div v-if="['sent', 'claimed', 'no_funds'].includes(trans.status)">
              @{{ trans.sender }} sent
              {{ $tips.formatTipsLocale(trans.amount) }} Tips via Twitter to @{{
                trans.target
              }}.
            </div>
            <div v-if="trans.status === 'sent'">
              <small>
                If you are @{{ trans.target }}, please
                <a href="/login">login</a> via twitter to claim it.
              </small>
            </div>
            <small>ID: {{ $route.params.hash }}</small>
          </v-alert>
          <div class="text-center mt-4">
            <v-btn color="accent" to="/login">Login</v-btn>
          </div>
        </v-card-text>
      </v-card>
      <TestMode class="mt-5" />
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'TwitterHash',
  layout: 'login',
  auth: false,
  async asyncData({ route, $axios }) {
    const ret = {
      trans: null,
    }
    try {
      ret.trans = (
        await $axios.get('/api/twitter-transaction/' + route.params.hash)
      ).data
    } catch (e) {
      ret.trans = null
    }
    return ret
  },
}
</script>

<style scoped></style>
