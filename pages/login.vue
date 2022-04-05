<template>
  <v-container fill-height justify-center>
    <div style="width: 700px; max-width: 100%">
      <TestMode class="mb-5" />
      <div class="d-flex align-center justify-space-between mb-5">
        <NuxtLink to="/">
          <img
            src="/img/logo.svg"
            class="img-responsive"
            style="width: 200px"
          />
        </NuxtLink>
        <div class="text-overline">BOT DASHBOARD</div>
      </div>
      <v-card v-if="!isHelp" rounded>
        <v-card-text>
          <v-row class="align-center">
            <v-col :cols="12" :md="6">
              <v-sheet rounded class="pa-5">
                <h2 class="mb-2 black--text">Login by code</h2>
                <v-form
                  ref="authCodeForm"
                  @submit.prevent="loginBy('authCode')"
                >
                  <div class="d-flex align-center mt-5">
                    <v-text-field
                      v-model.trim="authCode.code"
                      hide-details
                      outlined
                      label="Enter authorization code"
                      dense
                      :rules="[commonRules.notBlank({ name: 'Code' })]"
                      :disabled="authCode.loading"
                    />
                    <v-btn
                      type="submit"
                      depressed
                      class="ml-1"
                      color="accent"
                      :loading="authCode.loading"
                      >Login</v-btn
                    >
                  </div>
                  <div class="red--text">{{ authCode.error }}</div>
                </v-form>
              </v-sheet>
            </v-col>
            <v-col :cols="12" :md="6">
              <div class="d-flex align-center">
                <v-divider></v-divider>
                <small class="ma-5" style="font-size: 1.3em">OR</small>
                <v-divider></v-divider>
              </div>
              <div class="text-center mb-2">
                <v-btn
                  color="deep-orange"
                  dark
                  depressed
                  style="width: 300px; max-width: 100%"
                  :loading="redditLoading"
                  @click="loginBy('reddit')"
                >
                  <v-icon class="mr-3">mdi-reddit</v-icon>
                  LOGIN BY REDDIT
                </v-btn>
              </div>
              <div class="text-center mb-2">
                <v-btn
                  color="light-blue"
                  dark
                  depressed
                  style="width: 300px; max-width: 100%"
                  :loading="twitterLoading"
                  @click="loginBy('twitter')"
                >
                  <v-icon class="mr-3">mdi-twitter</v-icon>
                  LOGIN BY TWITTER
                </v-btn>
              </div>
              <div class="text-center">
                <v-btn
                  color="light-blue"
                  dark
                  depressed
                  style="width: 300px; max-width: 100%"
                  :loading="telegramLoading"
                  @click="loginBy('telegram')"
                >
                  <v-img
                    src="img/telegram.svg"
                    max-width="24"
                    max-height="24"
                    contain
                    class="mr-3"
                  />
                  LOGIN BY TELEGRAM
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-expansion-panels v-model="activePanel" class="mt-5">
        <v-expansion-panel v-if="!isHelp">
          <v-expansion-panel-header>
            How to get authorization code?
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-tabs grow>
              <v-tab>
                <v-icon>mdi-reddit</v-icon>
                Reddit
              </v-tab>
              <v-tab-item class="my-3 pa-5">
                <p class="mb-0">
                  If you want to generate an authorization code for Reddit, send
                  a private message to
                  <a
                    :href="'https://www.reddit.com/message/compose/?to=tipscoinbot'"
                    target="_blank"
                    >u/tipscoinbot</a
                  >
                  with the "<strong>!login</strong>" command.
                </p>
                <div class="text-center pt-5">
                  <img src="img/reddit-pm.png" class="img-responsive" />
                </div>
              </v-tab-item>
              <v-tab>
                <v-icon>mdi-twitter</v-icon>
                Twitter
              </v-tab>
              <v-tab-item>
                <p class="mb-0">
                  If you want to generate an authorization code for Twitter,
                  send a private message to
                  <a :href="'https://twitter.com/tipscoinbot'" target="_blank"
                    >@tipscoinbot</a
                  >
                  with "<strong>!login</strong>" command.
                </p>
                <div class="text-center pt-5">
                  <img src="img/twitter-pm.png" class="img-responsive" />
                </div>
              </v-tab-item>
              <v-tab>
                <v-img
                  src="img/telegram-grey.svg"
                  max-width="24"
                  height="24"
                  contain
                  class="mr-2"
                />
                Telegram
              </v-tab>
              <v-tab-item>
                <p class="mb-0 py-5">
                  An authorization code for tips sent via Telegram is not
                  required. Launch the communicator and send a private message
                  "/tip" to @tipscoinbot.
                </p>
              </v-tab-item>
            </v-tabs>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <template v-if="isHelp">
          <AboutPanel />
          <CommandsPanel />
        </template>
        <template v-else>
          <CommandsPanel />
          <AboutPanel />
        </template>
      </v-expansion-panels>

      <hr />

      <div class="text-center mt-5 text-body-2">
        Remember! We will never ask you for your private keys or the seed
        phrase. We don't, and we will never have access to your wallet
      </div>
    </div>
  </v-container>
</template>

<script>
import commonRules from '@/helpers/commonRules'
import CommandsPanel from '@/components/help-page/CommandsPanel'
import AboutPanel from '@/components/help-page/AboutPanel'

export default {
  name: 'LoginPage',
  components: { AboutPanel, CommandsPanel },
  layout: 'login',
  auth: false,
  middleware({ $auth, redirect, route }) {
    if ($auth.loggedIn && route.name !== 'help') {
      redirect({ name: 'index', query: route.query })
    }
  },
  async asyncData({ route, $auth, redirect }) {
    let error = ''

    if (route.query.oauth && route.query.code) {
      try {
        await $auth.loginWith('local', {
          data: {
            oauth: route.query.oauth,
            code: route.query.code,
          },
        })
        redirect({ name: 'index' })
      } catch (reason) {
        error = reason?.response?.data?.message || 'error'
      }
    }

    return {
      authCode: {
        loading: false,
        code: '',
        error,
      },
    }
  },
  data() {
    return {
      isHelp: this.$route.name === 'help',
      activePanel: this.$route.name === 'help' ? 0 : null,
      redditLoading: false,
      twitterLoading: false,
      telegramLoading: false,
      authCode: {
        loading: false,
        code: '',
        error: '',
      },
      commonRules,
    }
  },
  head() {
    return {
      script: [
        {
          src: 'https://telegram.org/js/telegram-widget.js',
        },
      ],
    }
  },
  methods: {
    handleLoginFail(reason) {
      this.authCode.error = reason?.response?.data?.message || 'error'
    },
    loginBy(what) {
      if (what === 'authCode') {
        if (this.$refs.authCodeForm.validate()) {
          this.authCode.error = ''
          this.authCode.loading = true
          this.$auth
            .loginWith('local', {
              data: {
                authCode: this.authCode.code,
              },
            })
            .then(() => this.$router.push({ name: 'index' }))
            .catch(
              (reason) =>
                (this.authCode.error =
                  reason?.response?.data?.message || 'error')
            )
            .finally(() => (this.authCode.loading = false))
        }
      } else if (what === 'reddit') {
        this.redditLoading = true
        this.$axios
          .$get('/api/reddit/auth/link')
          .then((res) => {
            window.location = res.link
          })
          .catch((e) => {
            this.redditLoading = false
          })
      } else if (what === 'twitter') {
        this.twitterLoading = true
        this.$axios
          .$get('/api/twitter/auth/link')
          .then((res) => {
            window.location = res.link
          })
          .catch((e) => {
            this.twitterLoading = false
          })
      } else if (what === 'telegram') {
        this.telegramLoading = true
        // eslint-disable-next-line no-undef
        Telegram.Login.auth(
          {
            bot_id: '5155152114',
          },
          (d) => {
            if (!d) {
              this.telegramLoading = false
              return
            }

            this.$auth
              .loginWith('local', {
                data: {
                  oauth: 'telegram',
                  code: btoa(new URLSearchParams(d).toString()),
                },
              })
              .catch(this.handleLoginFail)
              .finally(() => {
                this.telegramLoading = false
                this.$router.push({ name: 'index' })
              })
          }
        )
      }
    },
  },
}
</script>

<style scoped>
.img-responsive {
  max-width: 100%;
}
.answer {
  font-size: 14px;
}

.v-expansion-panel--active > button {
  font-weight: bold !important;
}
</style>
