<template>
  <div v-if="!$auth.user.twitterName">
    <v-btn
      color="light-blue"
      dark
      depressed
      style="width: 300px; max-width: 100%"
      :loading="twitterLoading"
      @click="twitterLogin"
    >
      <v-icon class="mr-3">mdi-twitter</v-icon>
      LOG IN WITH TWITTER
    </v-btn>
  </div>
  <div v-else>
    <v-row class="mb-3">
      <v-col :cols="12" :md="7">
        <v-card>
          <v-card-title>Twitter Bot</v-card-title>
          <v-card-text>
            <p>
              Did you like a tweet or a comment? Would you like to reward the
              author, or maybe you have too many Tips tokens and want to share
              your happiness with others? This module allows you to send tips to
              Twitter users quickly and easily.
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
            <v-row>
              <v-col :cols="12" :md="6">
                <v-text-field
                  v-model.trim="tipsSend.value"
                  label="Enter a username or link to their tweet or comment"
                  outlined
                  flat
                  :rules="[
                    commonRules.notBlank({ name: 'Username or link' }),
                    usernameLinkCheck,
                  ]"
                ></v-text-field>
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
                      value: $auth.user.balance,
                    }),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col :cols="12" :md="6">
                <v-textarea
                  v-model="tipsSend.message"
                  label="Please enter message"
                  outlined
                  :rules="[
                    (v) =>
                      computedMessage.text.length <= 280 || 'Message to long',
                  ]"
                  flat
                ></v-textarea>
              </v-col>
            </v-row>
            <div v-if="tipsSend.value" class="text-center">
              <v-btn @click="generateTweet()">
                <v-icon>mdi-twitter</v-icon>
                Generate Tweet
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </div>

    <div class="mb-3">
      <v-card>
        <v-card-title>Commands available:</v-card-title>
        <v-card-text>
          <TextGroup title="as a private message to the bot">
            <p>
              <Cmd>!login</Cmd>
              sends authorization code to login
            </p>
          </TextGroup>
        </v-card-text>
      </v-card>
    </div>

    <TransactionsHistory ref="transactionsHistory" provider="twitter" />
  </div>
</template>

<script>
import commonRules from '@/helpers/commonRules'

export default {
  name: 'TwitterPage',
  data() {
    return {
      twitterLoading: false,
      tipsSend: {
        value: '',
        amount: '500.0',
        message:
          "Thanks for your content. I'm sending you Tips as a thank you.",
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
    computedMessage() {
      const ret = {
        text: '',
      }

      const mess = this.tipsSend.message.trim()
      if (mess.length > 0) {
        ret.text += mess + '\n'
      }

      ret.text += '@tipscoinbot !tip '

      const m = this.tipsSend.value.match(/\/status\/(\d+)/)
      if (m) {
        ret.in_reply_to = m[1]
      } else {
        const login = this.tipsSend.value.replace(/^@/, '')
        ret.text += '@' + login + ' '
        ret.login = login
      }

      ret.text +=
        this.$tips.formatTips(this.tipsSend.amount) +
        ' Tips. To claim your tokens, login to bot.tipscoin.io/[hash---]'

      ret.text += '\n#tipscoin #tips #bsc #crypto #[hash---]'

      return ret
    },
  },
  methods: {
    async generateTweet() {
      if (this.$refs.form.validate()) {
        const c = JSON.parse(JSON.stringify(this.computedMessage))
        const hash = (
          await this.$axios.post('/api/twitter/txHash', {
            sender: this.$auth.user.twitterName,
            target: c.login,
            amount: this.tipsSend.amount,
          })
        ).data

        delete c.login

        c.text = c.text.replace(/\[hash-*\]/gi, 't' + hash)

        window.open(
          'https://twitter.com/intent/tweet?' +
            new URLSearchParams(c).toString(),
          '_blank'
        )
      } else {
        this.$store.commit('openSnackbar', {
          text: 'Form has errors',
          color: 'red',
          dark: true,
        })
      }
    },
    twitterLogin() {
      this.twitterLoading = true
      this.$axios
        .$get('/api/twitter/auth/link')
        .then((res) => {
          window.location = res.link
        })
        .catch((e) => {
          this.twitterLoading = false
        })
    },
    usernameLinkCheck(v) {
      if (/\/status\/(\d+)/.test(v)) return true

      const m = v.match(
        new RegExp('twitter.com/(' + commonRules.twitterUsernameRegex + ')')
      )
      if (m !== null) {
        this.tipsSend.value = m[1]
        return true
      }

      if (
        v.match(new RegExp('^' + commonRules.twitterUsernameRegex + '$')) !==
        null
      )
        return true

      return 'incorrect username or link'
    },
  },
}
</script>
