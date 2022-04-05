<template>
  <v-container>
    <v-card rounded class="mb-5">
      <v-card-title>Hello {{ rp.username }},</v-card-title>
      <v-card-text>
        <div v-html="$store.state.apConfig.text_userpage" />
        <Cmd>https://ap.tipscoin.io/r/{{ rp.id }}.{{ rp.publicHash }}</Cmd>
      </v-card-text>
    </v-card>
    <v-card rounded class="mb-5">
      <v-card-title>Your statistics</v-card-title>
      <v-card-text>
        <div class="text-center pb-15 d-flex justify-space-around">
          <div>
            Users joined by your link:
            <v-chip color="accent">
              {{ rp.telegramLink.joinedCount }}
            </v-chip>
          </div>
          <div>
            Users view your link:
            <v-chip color="blue">
              {{ rp.telegramLink.viewsCount }}
            </v-chip>
          </div>
        </div>
        <BarChart
          :height="200"
          :chartdata="{
            labels: Object.keys(rp.telegramLink.last30days),
            datasets: [
              {
                label: 'Joined users',
                backgroundColor: '#ff006a',
                data: Object.values(rp.telegramLink.last30days).map(
                  (x) => x.joined
                ),
              },
              {
                label: 'Visits',
                backgroundColor: '#0030ff',
                data: Object.values(rp.telegramLink.last30days).map(
                  (x) => x.views
                ),
              },
            ],
          }"
          :options="{ responsive: true }"
        />
      </v-card-text>
    </v-card>
    <v-card rounded>
      <v-card-title>Rewards</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            ripple
            v-for="(level, lk) in rp.levels"
            :key="lk"
            :class="{
              'green lighten-5': rp.telegramLink.joinedCount >= level.required,
              'grey lighten-2':
                activeLevel != lk &&
                rp.telegramLink.joinedCount < level.required,
              'green lighten-3': activeLevel == lk,
            }"
          >
            <v-list-item-avatar>
              <v-avatar color="grey" class="white--text" dark>{{
                lk + 1
              }}</v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ level.reward }}</v-list-item-title>
              <v-list-item-subtitle
                >left:
                {{
                  Math.max(level.required - rp.telegramLink.joinedCount, 0)
                }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-list-item-action>
              <v-progress-circular
                :value="
                  Math.round(
                    (rp.telegramLink.joinedCount / level.required) * 100
                  )
                "
                size="80"
                :width="15"
                rotate="270"
                color="green"
                >{{ Math.min(rp.telegramLink.joinedCount, level.required) }}/{{
                  level.required
                }}
              </v-progress-circular>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'AffiliateProgramPage',
  auth: false,
  layout: 'aphash',
  validate({ params }) {
    return params.hash.match(/^(\d+)\.[a-z0-9]{50}$/i) !== null
  },
  created() {
    localStorage.setItem('ref-hash', this.$route.params.hash)
  },
  data() {
    return {
      levels: [
        {
          required: 1,
          rewardName:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        },
        {
          required: 5,
          rewardName:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        },
        {
          required: 10,
          rewardName:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        },
        {
          required: 15,
          rewardName:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        },
        {
          required: 20,
          rewardName:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        },
      ],
    }
  },
  computed: {
    activeLevel() {
      for (const i in this.levels) {
        if (this.levels[i].required > this.rp.telegramLink.joinedCount) return i
      }
      return null
    },
  },
  async asyncData({ params, error, $axios }) {
    try {
      return {
        rp: (await $axios.get('api/ap/show/' + params.hash)).data,
      }
    } catch (e) {
      error({ statusCode: 404, message: '' })
    }
  },
}
</script>
