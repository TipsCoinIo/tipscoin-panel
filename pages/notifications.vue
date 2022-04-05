<template>
  <div>
    <v-card>
      <v-card-title>
        Notifications
        <v-spacer />
        <a
          href="#"
          class="text--disabled"
          @click.prevent="getNotifications({ markAllAsRead: true })"
          style="font-size: 0.8em"
          >mark all as read</a
        >
      </v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item
            v-for="(notification, notificationK) in list"
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
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'NotificationsPage',
  async asyncData({ $axios }) {
    return {
      list: (
        await $axios.$post('api/user/notifications', {
          limit: 100,
        })
      ).result,
    }
  },
  methods: {
    getNotifications(opt) {
      this.$nuxt.$loading.start()
      this.$axios
        .$post('api/user/notifications', {
          limit: 100,
          markAllAsRead: (opt && opt.markAllAsRead) || undefined,
        })
        .then((res) => {
          this.list = res.result
          if (opt && opt.markAllAsRead) return this.$auth.fetchUser()
        })
        .finally(() => {
          this.$nuxt.$loading.finish()
        })
    },
  },
}
</script>
