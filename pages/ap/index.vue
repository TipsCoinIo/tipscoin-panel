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

      <v-row>
        <v-col>
          <v-btn
            style="width: 100%"
            @click="
              login.data = baseLogin()
              dialog.type = 'login'
              dialog.show = true
            "
            >Sign in</v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            style="width: 100%"
            @click="
              register.data = baseRegister()
              dialog.type = 'register'
              dialog.show = true
            "
            >Sign up</v-btn
          >
        </v-col>
      </v-row>

      <ProjectButtons site="ap" />
    </div>

    <v-dialog v-model="dialog.show" max-width="400px" persistent>
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>{{
            dialog.type === 'register' ? 'Sign up' : 'Sign in'
          }}</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="dialog.show = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-toolbar>
        <v-card-text class="pt-5">
          <v-alert v-if="register.registerOk" type="success"
            >Registration was successful. However, we require each account to be
            activated by the administrator. Please be patient.</v-alert
          >
          <v-form v-if="dialog.type === 'login'" @submit.prevent="onLogin">
            <v-text-field
              v-model="login.data.username"
              label="Username"
              solo
              outlined
            />
            <v-text-field
              v-model="login.data.password"
              type="password"
              label="Password"
              solo
              outlined
            />
            <v-btn :loading="login.loading" type="submit">Sign in</v-btn>
            <v-input type="hidden" :error-messages="login.error" />
          </v-form>
          <v-form
            v-if="dialog.type === 'register'"
            @submit.prevent="onRegister"
          >
            <v-text-field
              v-model="register.data.username"
              label="Username"
              :error-messages="
                register.errors ? register.errors.username : undefined
              "
              solo
              outlined
            />
            <v-text-field
              v-model="register.data.password"
              type="password"
              label="Password"
              :error-messages="
                register.errors ? register.errors.password : undefined
              "
              solo
              outlined
            />
            <v-text-field
              v-model="register.data.email"
              label="Email"
              :error-messages="
                register.errors ? register.errors.email : undefined
              "
              solo
              outlined
            />
            <v-btn :loading="register.loading" type="submit">Register</v-btn>
            <v-input
              type="hidden"
              :error-messages="
                register.errors ? register.errors.captcha : undefined
              "
            />
          </v-form>
          <p style="font-size: 0.8em" class="mt-3">
            This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and
            <a href="https://policies.google.com/terms">Terms of Service</a>
            apply.
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'AffiliateProgramPage',
  auth: false,
  layout: 'ap',
  async middleware({ $auth, $axios, redirect, route }) {
    const ref = $auth.$storage.getUniversal('ref-hash')
    if (ref) {
      try {
        await $axios.$get('api/ap/show/' + ref)
        redirect({ name: 'p-hash', params: { hash: ref } })
      } catch (e) {
        $auth.$storage.removeUniversal('ref-hash')
      }
    }
  },
  data() {
    return {
      dialog: {
        show: false,
        type: 'login',
      },
      register: {
        data: this.baseRegister(),
        errors: null,
        loading: false,
        registerOk: false,
      },
      login: {
        data: this.baseLogin(),
        error: null,
        loading: false,
      },
    }
  },
  methods: {
    onLogin() {
      if (this.login.loading) return

      this.login.error = null
      this.login.loading = true

      // eslint-disable-next-line no-undef
      grecaptcha.ready(() => {
        // eslint-disable-next-line no-undef
        grecaptcha
          .execute(this.$store.state.apConfig.recaptcha, { action: 'submit' })
          .then((token) => {
            this.login.data.captcha = token
            this.$axios
              .$post('api/ap/auth/login', this.login.data)
              .then((res) => {
                this.$router.push({
                  name: 'p-hash',
                  params: { hash: res.hash },
                })
              })
              .catch((reason) => {
                this.login.error = reason.response.data.error
              })
              .finally(() => {
                this.login.loading = false
              })
          })
      })
    },
    onRegister() {
      if (this.register.loading) return

      this.register.errors = null
      this.register.loading = true

      // eslint-disable-next-line no-undef
      grecaptcha.ready(() => {
        // eslint-disable-next-line no-undef
        grecaptcha
          .execute(this.$store.state.apConfig.recaptcha, { action: 'submit' })
          .then((token) => {
            this.register.data.captcha = token
            this.$axios
              .$post('api/ap/auth/register', this.register.data)
              .then(() => {
                this.register.registerOk = true
                this.login.data = this.baseLogin()
                this.login.data.username = this.register.data.username
                this.dialog.type = 'login'
                setTimeout(() => {
                  this.register.registerOk = false
                }, 5000)
              })
              .catch((reason) => {
                this.register.errors = reason.response.data.errors
              })
              .finally(() => {
                this.register.loading = false
              })
          })
      })
    },
    baseLogin() {
      return {
        username: '',
        password: '',
        captcha: '',
      }
    },
    baseRegister() {
      return {
        username: '',
        password: '',
        email: '',
        captcha: '',
      }
    },
  },
}
</script>
