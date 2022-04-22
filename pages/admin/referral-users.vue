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
          <th>Email</th>
          <th></th>
          <th>Manage levels</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            {{ user.id }}
          </td>
          <td>
            {{ user.username }}
            <v-chip x-small>{{ user.accepted ? 'Active' : 'Inactive' }}</v-chip>
            <v-chip v-if="user.banned" x-small>Banned</v-chip>
          </td>
          <td>{{ user.email }}</td>
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
          <td>
            <v-menu offset-y>
              <template #activator="{ attrs, on }">
                <v-btn icon v-bind="attrs" v-on="on"
                  ><v-icon>mdi-menu</v-icon></v-btn
                >
              </template>

              <v-list>
                <v-list-item @click="toggleUserField(user, 'accepted')">
                  <v-list-item-title>{{
                    user.accepted ? 'Deactivate' : 'Activate'
                  }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="toggleUserField(user, 'banned')">
                  <v-list-item-title>{{
                    user.banned ? 'Unban' : 'Ban'
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
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
    toggleUserField(user, field) {
      this.$nuxt.$loading.start()
      this.$axios
        .$post('api/admin/referral-users/' + user.id, {
          [field]: !user[field],
        })
        .then(() => {
          user[field] = !user[field]
        })
        .finally(() => {
          this.$nuxt.$loading.finish()
        })
    },
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
