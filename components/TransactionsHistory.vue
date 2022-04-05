<template>
  <div style="position: relative">
    <v-card v-if="transactionsResult">
      <v-card-title class="d-flex align-center">
        <span>Transaction history:</span>
        <v-btn icon @click="getTransactions()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-spacer />
        <small class="text--secondary"
          >Showing {{ transactionsResult.offset + 1 }} -
          {{ transactionsResult.offset + transactionsResult.result.length }}
          ({{ transactionsResult.total }} total)</small
        >
        <v-btn
          icon
          :disabled="transactionsResult.offset === 0"
          @click="
            transactionsResult.offset -= transactionsResult.limit
            getTransactions({
              offset: transactionsResult.offset - transactionsResult.limit,
            })
          "
          ><v-icon>mdi-chevron-left</v-icon></v-btn
        >
        <v-btn
          icon
          :disabled="
            transactionsResult.offset + transactionsResult.limit >=
            transactionsResult.total
          "
          @click="
            getTransactions({
              offset: transactionsResult.offset + transactionsResult.limit,
            })
          "
          ><v-icon>mdi-chevron-right</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <div v-if="transactionsResult.result.length === 0">
          <v-alert type="info" outlined>No transactions found</v-alert>
        </div>
        <v-simple-table v-else>
          <thead>
            <tr>
              <th>TIME</th>
              <th>TRANSACTION</th>
              <th class="text-center">AMOUNT</th>
              <th>PLATFORM</th>
              <th>USER</th>
              <th class="text-right">BALANCE AFTER</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transaction, k) in transactionsResult.result" :key="k">
              <td>{{ $moment(transaction.createdAt).format('lll') }}</td>
              <td>
                <v-chip v-if="transaction.type === 'deposit'" small outlined>
                  <v-icon color="green" small>mdi-arrow-up-bold</v-icon>
                  Deposit
                </v-chip>
                <v-chip
                  v-else-if="transaction.type === 'withdraw'"
                  small
                  outlined
                >
                  <v-icon color="red" small>mdi-arrow-down-bold</v-icon>
                  Withdraw
                </v-chip>
                <v-chip
                  v-else-if="transaction.type === 'transfer'"
                  small
                  outlined
                >
                  <v-icon v-if="transaction.value < 0" color="red" small
                    >mdi-arrow-left-bold</v-icon
                  >
                  <v-icon v-else color="green" small
                    >mdi-arrow-right-bold</v-icon
                  >
                  {{ transaction.value > 0 ? 'Received' : 'Sent' }}
                </v-chip>
                <v-chip
                  v-else-if="transaction.type === 'first_login'"
                  small
                  outlined
                >
                  <v-icon color="green" small>mdi-plus-thick</v-icon>
                  First login
                </v-chip>
                <v-chip v-else small outlined>{{ transaction.type }}</v-chip>
              </td>
              <td class="text-center text-no-wrap">
                <span
                  :class="{
                    'green--text': parseFloat(transaction.value) > 0,
                    'red--text': parseFloat(transaction.value) < 0,
                  }"
                >
                  {{ $tips.formatTips(transaction.value) }} Tips
                </span>
              </td>
              <td>{{ transaction.provider }}</td>
              <td>{{ transaction.providerUser }}</td>
              <td class="text-right text-no-wrap text--secondary">
                {{ $tips.formatTips(transaction.balanceAfter) }} Tips
              </td>
              <td>
                <v-btn
                  v-if="transaction.data && transaction.data.txLink"
                  icon
                  :href="transaction.data.txLink"
                  target="_blank"
                  small
                  ><v-icon>mdi-magnify</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-overlay v-if="loading" absolute style="min-height: 100px">
      <v-progress-circular indeterminate />
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'TransactionsHistory',
  props: {
    provider: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      transactionsResult: null,
      loading: true,
    }
  },
  created() {
    this.getTransactions({})
  },
  methods: {
    getTransactions(opt) {
      this.loading = true
      this.$axios
        .$post('api/user/transactions', {
          provider: this.$props.provider,
          ...opt,
        })
        .then((res) => (this.transactionsResult = res))
        .finally(() => (this.loading = false))
    },
  },
}
</script>

<style scoped></style>
