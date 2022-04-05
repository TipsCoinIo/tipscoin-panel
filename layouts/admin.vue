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
      <NuxtLink class="banner" :to="{ name: 'index' }">
        <img src="/img/logo-white.svg" class="banner" alt="" />
      </NuxtLink>
      <v-divider />
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
    </v-navigation-drawer>

    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      asd
    </v-app-bar>
    <v-main class="grey lighten-4">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AdmintLayout',
  middleware: ['admin'],
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: 'mdi-account',
          title: 'Referral program users',
          to: { name: 'admin-referral-users' },
        },
        {
          icon: 'mdi-server',
          title: 'Default reward levels',
          to: { name: 'admin-reward-levels' },
        },
        {
          icon: 'mdi-cog',
          title: 'Settings',
          to: { name: 'admin-settings' },
        },
      ],
    }
  },
  head() {
    return {
      titleTemplate: '%s - admin panel',
      title: 'dashboard',
    }
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
