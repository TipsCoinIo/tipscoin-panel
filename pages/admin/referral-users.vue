<template>
  <v-container>
    <v-card>
      <v-card-title>Create user</v-card-title>
      <v-card-text>
        <v-text-field v-model="newUsername" label="Username"></v-text-field>
        <v-btn @click="createUser">Create user</v-btn>
      </v-card-text>
    </v-card>

    <v-simple-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th></th>
          <th>Manage levels</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            {{ user.id }}
          </td>
          <td>
            {{ user.username }}
          </td>
          <td>
            <v-btn
              :href="
                'https://ap.tipscoin.io/p/' + user.id + '.' + user.privateHash
              "
              icon
              target="_blank"
              ><v-icon>mdi-earth</v-icon></v-btn
            >
          </td>
          <td>
            <v-btn
              icon
              title="Manage levels"
              @click="
                levelsDialog.user = user
                levelsDialog.show = true
              "
              ><v-icon>mdi-server</v-icon></v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-dialog v-model="levelsDialog.show" max-width="800px">
      <v-card v-if="levelsDialog.user">
        <v-toolbar flat>
          <v-toolbar-title>
            Reward level for {{ levelsDialog.user.username }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="levelsDialog.show = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-toolbar>
        <v-card-text>
          <RewardLevelsForm
            :levels="levelsDialog.user.customLevels"
            :user="levelsDialog.user.id"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'ReferralUsers',
  layout: 'admin',
  data() {
    return {
      newUsername: null,
      levelsDialog: {
        user: null,
        show: false,
      },
    }
  },
  methods: {
    createUser() {
      this.$nuxt.$loading.start()
      this.$axios
        .$post('api/admin/referral-users', {
          username: this.newUsername,
        })
        .then((res) => {
          this.users.push(res)
        })
        .finally(() => {
          this.$nuxt.$loading.finish()
        })
    },
  },
  async asyncData({ $axios }) {
    const result = await $axios.$get('api/admin/referral-users')
    return {
      users: result.result,
    }
  },
  head() {
    return {
      title: 'referral users',
    }
  },
}
</script>
