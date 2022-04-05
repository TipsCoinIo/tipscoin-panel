<template>
  <div>
    <v-simple-table>
      <thead>
        <tr>
          <th>Required joined users</th>
          <th>Reward</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(level, lk) in $props.levels.filter((x) => !('_delete' in x))"
          :key="lk"
        >
          <td>
            <v-text-field
              type="number"
              min="1"
              v-model="level.required"
              outlined
            />
          </td>
          <td>
            <v-textarea v-model="level.reward" outlined rows="2" />
          </td>
          <td>
            <v-btn icon @click="$set(level, '_delete', true)"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-btn @click="$props.levels.push(defaultLevel())">Add reward</v-btn>
    <v-btn @click="saveRewards()">Save rewards</v-btn>
  </div>
</template>

<script>
export default {
  name: 'RewardLevelsForm',
  props: {
    levels: {
      type: Array,
      default: () => [],
    },
    user: {
      type: Number,
      default: null,
    },
  },
  methods: {
    saveRewards() {
      this.$nuxt.$loading.start()
      this.$axios
        .$post('api/admin/reward-levels', {
          levels: this.levels,
        })
        .finally(() => {
          this.$nuxt.$loading.finish()
        })
    },
    defaultLevel() {
      return {
        id: null,
        user: this.$props.user ? { id: this.$props.user } : null,
        required: 1,
        reward: 'Example reward name',
      }
    },
  },
}
</script>

<style scoped></style>
