<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      dark
      fixed
      app
      src="/img/sidebar-bg.jpg"
      color="black"
    >
      <template #img="data">
        <v-img
          :src="data.src"
          :width="data.width"
          :height="data.height"
          style="opacity: 0.7"
        />
      </template>
      <div class="d-flex flex-column" style="height: 100%">
        <NuxtLink class="banner" :to="{ name: 'index' }">
          <img src="/img/logo-white.svg" class="banner" alt="" />
        </NuxtLink>
        <v-divider />
        <v-list>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title>
                <strong>Supported platforms:</strong>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon v-if="item.icon" :color="item.iconColor">{{
                item.icon
              }}</v-icon>
              <v-img
                v-else-if="item.src"
                :src="item.src"
                width="24"
                height="24"
              />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-spacer />
        <v-divider />
        <v-list dense>
          <v-list-item
            v-for="(item, i) in links"
            :key="i"
            :href="item.url"
            router
            exact
          >
            <v-list-item-action class="ma-0 mr-3">
              <v-icon v-if="item.icon" small>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-menu
        v-model="notifications.menu"
        offset-y
        left
        nudge-bottom="8"
        :close-on-content-click="false"
      >
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon v-if="$auth.user.unreadNotifications > 0" color="amber"
              >mdi-bell-badge-outline</v-icon
            >
            <v-icon v-else>mdi-bell-outline</v-icon>
          </v-btn>
        </template>

        <v-card width="300px">
          <v-toolbar dense flat>
            <v-toolbar-title>Notifications</v-toolbar-title>
            <v-spacer />
            <a
              href="#"
              class="text--disabled"
              style="font-size: 0.8em"
              @click.prevent="getNotifications({ markAllAsRead: true })"
              >mark all as read</a
            >
          </v-toolbar>
          <div
            v-if="notifications.loading"
            style="position: relative; min-height: 100px"
          >
            <v-overlay absolute
              ><v-progress-circular indeterminate
            /></v-overlay>
          </div>
          <div v-else>
            <div v-if="notifications.list.length > 0">
              <v-list dense>
                <v-list-item
                  v-for="(notification, notificationK) in notifications.list"
                  :key="notificationK"
                >
                  <v-list-item-avatar>
                    <v-img :src="notification.icon"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      :class="{
                        'text--secondary': !notification.unread,
                      }"
                      >{{ notification.message }}</v-list-item-title
                    >
                    <v-list-item-subtitle>{{
                      $moment(notification.createdAt).calendar()
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <div class="pa-3 d-flex">
                <v-btn
                  color="accent"
                  class="d-block flex-grow-1"
                  outlined
                  @click="
                    notifications.menu = false
                    $router.push({ name: 'notifications' })
                  "
                  >See all</v-btn
                >
              </div>
            </div>
            <div v-else class="text-center text--disabled py-10">
              No notifications found.
            </div>
          </div>
        </v-card>
      </v-menu>
      <v-btn depressed large @click="rightDrawer = true">
        <v-avatar size="36">
          <img :src="userAvatar" :alt="userName" />
        </v-avatar>
        <div class="text-left">
          {{ userName }}
          <br />
          <div style="font-size: 0.7em">
            {{ $tips.formatTips($auth.user.balance) }} Tips
          </div>
        </div>
      </v-btn>
    </v-app-bar>
    <v-main class="grey lighten-4">
      <v-container>
        <TestMode class="mb-5" />
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" right temporary fixed>
      <template #prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="userAvatar" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ userName }}</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <template #append>
        <div class="pa-2">
          <v-btn
            block
            color="accent"
            @click="
              $nuxt.$loading.start()
              $auth.logout().finally(() => $router.push('/login'))
            "
          >
            Logout
          </v-btn>
        </div>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item :to="{ name: 'index' }" exact>
          <v-list-item-icon>
            <v-icon>mdi-server</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'tac' }">
          <v-list-item-icon>
            <v-icon>mdi-help</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Terms and Conditions</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-snackbar
      v-model="showSnackbar"
      :color="$store.state.snackbar.color"
      :dark="$store.state.snackbar.dark"
      :timeout="2000"
      >{{ $store.state.snackbar.text }}</v-snackbar
    >

    <v-overlay
      v-if="firstLoginAlert"
      @click="
        firstLoginAlert = false
        $axios.get('api/auth/user?disableFirstLogin')
      "
      style="z-index: 9999"
    >
      <v-container style="max-width: 600px">
        <v-alert prominent type="success"
          >Thank you for your registration. You received your free 1000 Tips!
          Congratulations!
        </v-alert>
        <v-alert prominent type="error">
          If you received an email or private message from someone claiming to
          be a developer, administrator, or moderator of TipsCoin.io platform,
          be wary that it is spam and attempted fraud. Remember, we will never
          write to you first, much less ask you to click on any links, install
          and open programs, or verify your wallet by including sending us your
          private keys, seed phrase or passwords. Be alert and take extra care!
        </v-alert>
      </v-container>
    </v-overlay>
  </v-app>
</template>

<script>
import socialMeta from '@/helpers/socialMeta'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: true,
      rightDrawer: false,
      showSnackbar: false,
      firstLoginAlert: this.$auth.user.firstLogin,
      items: [
        {
          icon: 'mdi-reddit',
          title: 'Reddit',
          to: '/reddit',
        },
        {
          icon: 'mdi-twitter',
          title: 'Twitter',
          to: '/twitter',
        },
        {
          src: 'img/telegram.svg',
          title: 'Telegram',
          to: '/telegram',
        },
      ],
      links: [
        {
          name: 'Contract',
          url: 'https://bscscan.com/token/0x2100a985040005c6cec1b1d2c18594e6944739f3',
          icon: 'mdi-file-sign',
        },
        {
          name: 'Whitepaper',
          url: 'https://tipscoin.io/whitepaper.pdf',
          icon: 'mdi-folder-information-outline',
        },
        {
          name: 'Swap',
          url: 'https://pancakeswap.finance/swap?outputCurrency=0x2100A985040005C6cEc1b1d2c18594e6944739f3',
          icon: 'mdi-swap-horizontal-circle-outline',
        },
        {
          name: 'Chart',
          url: 'https://poocoin.app/tokens/0x2100A985040005C6cEc1b1d2c18594e6944739f3',
          icon: 'mdi-chart-bell-curve-cumulative',
        },
        { name: 'Website', url: 'https://tipscoin.io/', icon: 'mdi-web' },
        {
          name: 'Telegram',
          url: 'https://t.me/TipsCoinOfficial',
          icon: 'mdi-web',
        },
      ],
      notifications: {
        menu: false,
        loading: false,
        list: [],
      },
    }
  },
  head() {
    return {
      title: 'Dashboard',
      meta: socialMeta(),
    }
  },
  computed: {
    userAvatar() {
      const k = this.$route.name
      return k in this.$auth.user.avatars && this.$auth.user.avatars[k]
        ? this.$auth.user.avatars[k]
        : this.$auth.user.avatar
    },
    userName() {
      const k = this.$route.name + 'Name'
      return k in this.$auth.user && this.$auth.user[k]
        ? this.$auth.user[k]
        : this.$auth.user.username
    },
  },
  watch: {
    'notifications.menu': {
      handler(val) {
        if (val) {
          this.getNotifications()
        }
      },
    },
  },
  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'openSnackbar') {
        this.showSnackbar = true
      }
    })
    if (this.$route.query.oauth && this.$route.query.code) {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
      })
      this.$axios
        .$post('api/auth/connect', {
          oauth: this.$route.query.oauth,
          code: this.$route.query.code,
        })
        .then(() => this.$auth.fetchUser())
        .catch((reason) =>
          this.$store.commit('openSnackbar', {
            text: reason?.response?.data?.message || 'error',
            color: 'red',
          })
        )
        .finally(() => this.$router.push({ name: this.$route.query.oauth }))
        .finally(() => this.$nuxt.$loading.finish())
    }
  },
  methods: {
    getNotifications(opt) {
      this.notifications.loading = true
      this.$axios
        .$post('api/user/notifications', {
          limit: 3,
          markAllAsRead: (opt && opt.markAllAsRead) || undefined,
        })
        .then((res) => {
          this.notifications.list = res.result
          if (opt && opt.markAllAsRead) return this.$auth.fetchUser()
        })
        .finally(() => {
          this.notifications.loading = false
        })
    },
  },
}
</script>

<style scoped>
.banner {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.banner img {
  height: 30px;
}

.banner-mobile {
  height: 30px;
}
</style>
