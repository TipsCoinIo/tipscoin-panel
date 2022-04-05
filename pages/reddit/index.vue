<template>
  <div v-if="!$auth.user.redditName">
    <v-btn
      color="deep-orange"
      dark
      depressed
      style="width: 300px; max-width: 100%"
      :loading="redditLoading"
      @click="redditLogin"
    >
      <v-icon class="mr-3">mdi-reddit</v-icon>
      LOG IN WITH REDDIT
    </v-btn>
  </div>
  <div v-else>
    <v-row class="mb-3">
      <v-col :cols="12" :md="7">
        <v-card>
          <v-card-title>Reddit Bot</v-card-title>
          <v-card-text>
            <p>
              Did you like a thread, post, graphic or comment on Reddit? Would you like to reward the author, or maybe you have too many Tips tokens and want to share your happiness with others? This module will allow you to quickly and easily send tips to users on Reddit.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col :cols="12" :md="5">
        <TelegramPromoCard />
      </v-col>
    </v-row>

    <div class="mb-3">
      <v-card>
        <v-card-title>
          <v-icon large left> mdi-account </v-icon>
          Send a tip through the panel</v-card-title
        >
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model.trim="tipsSend.value"
              label='Type a username or paste a link to a thread, comment, or profile'
              outlined
              flat
              :rules="[commonRules.notBlank({ name: 'Username or link' })]"
              :disabled="tipsSend.usernameLinkDisabled"
              :loading="tipsSend.usernameLinkLoading"
              @blur="checkUsernameOrLink(tipsSend.value)"
            ></v-text-field>
            <v-banner
              v-if="tipsSend.result"
              rounded
              color="blue-grey lighten-4
"
              class="my-3"
            >
              <div class="d-flex align-center">
                <v-img
                  :src="tipsSend.result.data.icon_img"
                  max-width="100"
                  max-height="100"
                  aspect-ratio="1"
                  contain
                />
                <div class="ml-2">
                  <h1 class="mb-3">
                    You're going to send Tips to
                    <a
                      target="_blank"
                      :href="
                        'https://reddit.com/user/' + tipsSend.result.data.name
                      "
                      >u/{{ tipsSend.result.data.name }}</a
                    >.
                  </h1>
                  <v-btn
                    depressed
                    small
                    dark
                    color="red"
                    @click="
                      tipsSend.result = null
                      tipsSend.usernameLinkDisabled = false
                    "
                  >
                    <v-icon>mdi-close</v-icon>
                    Clear selection
                  </v-btn>
                </div>
              </div>
            </v-banner>
            <v-text-field
              v-model.trim="tipsSend.amount"
              label="Amount"
              outlined
              flat
              :rules="[
                commonRules.notBlank({ name: 'Amount' }),
                commonRules.number({ name: 'Amount' }),
                commonRules.maxDecimals({
                  name: 'Amount',
                  value: $store.state.config.tips.decimals,
                }),
                commonRules.gte({ name: 'Amount', value: 500 }),
                commonRules.lte({
                  name: 'Amount',
                  value: $tips.formatTips($auth.user.balance),
                }),
              ]"
            ></v-text-field>
            <v-btn
              :disabled="!tipsSend.result"
              :loading="tipsSend.loading"
              @click="sendTips"
              >Send tips</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </div>

    <div class="mb-3">
      <v-card>
        <v-card-title>Send a tip using the command</v-card-title>
        <v-card-text>
          <TextGroup title="in response to a comment" class="mb-3">
            <p>
              <Cmd>u/tipscoinbot !tip 1000 Tips</Cmd>
              send 1000 Tips to the author of the entry or comment you reply to
            </p>
          </TextGroup>
          <TextGroup title="as a private message to bot">
            <p>
              <Cmd>!login</Cmd>
              sends authorization code to login
            </p>
            <p>
              <Cmd>!register</Cmd>
              registration
            </p>
            <p>
              <Cmd>!tip u/username 1000 Tips</Cmd>
              sends 1000 Tips to user with given username
            </p>
            <p>
              <Cmd>!addwallet [YOUR-WALLET-ADDRESS]</Cmd>
              add the specified wallet in order to deposit or withdraw tokens
            </p>
            <p>
              <Cmd>!deposit [YOUR-WALLET-ADDRESS]</Cmd>
              verifies the balance after ordering a deposit from the previously added portfolio
            </p>
            <p>
              <Cmd>!balance</Cmd>
              displays your account balance
            </p>
            <p>
              <Cmd>!withdraw</Cmd>
              orders the payment of all Tips tokens
            </p>
            <p>
              <Cmd>!withdraw 1000 tips</Cmd>
              orders the payment of a specified number of Tips tokens
            </p>
            <p>
              <Cmd>!help</Cmd>
              displays commands
            </p>
          </TextGroup>
        </v-card-text>
      </v-card>
    </div>

    <TransactionsHistory ref="transactionsHistory" provider="reddit" />
  </div>
</template>
<script>
import commonRules from '@/helpers/commonRules'

export default {
  name: 'RedditPage',
  data() {
    return {
      redditLoading: false,
      tipsSend: {
        value: '',
        amount: '500.0',
        usernameLinkDisabled: false,
        usernameLinkLoading: false,
        result: null,
        loading: false,
      },
    }
  },
  computed: {
    commonRules() {
      return commonRules
    },
  },
  methods: {
    redditLogin() {
      this.redditLoading = true
      this.$axios
        .$get('/api/reddit/auth/link')
        .then((res) => {
          window.location = res.link
        })
        .catch((e) => {
          this.redditLoading = false
        })
    },
    sendTips() {
      if (this.$refs.form.validate()) {
        this.tipsSend.loading = true
        this.$axios
          .$post('api/tips/send', {
            provider: 'reddit',
            user: this.tipsSend.result.data.name,
            amount: this.tipsSend.amount,
          })
          .then((res) => {
            this.$store.commit('openSnackbar', { text: res.message })
            this.$refs.transactionsHistory.getTransactions({})
            this.$auth.fetchUser()
          })
          .catch((reason) =>
            this.$store.commit('openSnackbar', {
              text: reason?.response?.data?.message || 'error',
              color: 'red',
            })
          )
          .finally(() => {
            this.tipsSend.loading = false
          })
      }
    },
    async checkUsernameOrLink(val) {
      this.tipsSend.usernameLinkLoading = true
      this.tipsSend.usernameLinkDisabled = true
      try {
        this.tipsSend.result = await this.getUsernameOrLink(val)
      } catch (e) {
        this.tipsSend.usernameLinkLoading = false
        this.tipsSend.usernameLinkDisabled = false
        return
      }
      this.tipsSend.usernameLinkLoading = false
    },
    async getUsernameOrLink(val) {
      const regexes = [
        {
          type: 'comment',
          arr: [/\/comments\/[A-Za-z0-9]{3,}\/comment\/([A-Za-z0-9]{3,})\//],
        },
        {
          type: 'link',
          arr: [/\/comments\/([A-Za-z0-9]{3,})\//],
        },
        {
          type: 'user',
          arr: [
            new RegExp('u/(' + this.commonRules.redditUsernameRegex + ')'),
            new RegExp('/user/(' + this.commonRules.redditUsernameRegex + ')/'),
            new RegExp('^(' + this.commonRules.redditUsernameRegex + ')$'),
          ],
        },
      ]
      const regex = regexes.find(
        (x) => x.arr.filter((r) => r.test(val)).length > 0
      )
      if (!regex) throw new Error('incorrect format')
      const v = val.match(regex.arr.find((r) => r.test(val)))[1]
      return {
        type: regex.type,
        data: await this.$axios.$get(
          '/api/reddit/' + regex.type + '/search/' + v
        ),
      }
    },
  },
}
</script>
