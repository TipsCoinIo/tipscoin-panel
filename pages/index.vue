<template>
  <div>
    <v-row>
      <v-col :cols="12" :md="4">
        <v-card class="fill-height">
          <v-card-title>Your Balance:</v-card-title>
          <v-card-text>
            <v-row align="center">
              <v-col :cols="6">Token:</v-col>
              <v-col :cols="6">
                <v-select
                  v-model="activeToken"
                  outlined
                  dense
                  hide-details
                  :items="balance"
                  item-value="token"
                  :item-text="(v) => $tips.formatTips(v.balance) + ' ' + v.name"
                />
              </v-col>
            </v-row>
            <div class="text-right mt-5">
              <v-btn
                color="light-blue"
                dark
                depressed
                small
                @click="depositDialog.show = true"
                >Deposit</v-btn
              >
              <v-btn
                color="accent"
                depressed
                small
                @click="
                  getGasInfo()
                  withdraw.show = true
                "
                >Withdraw</v-btn
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col :cols="12" :md="8">
        <v-card class="fill-height">
          <v-card-title>Your Wallet address:</v-card-title>
          <v-card-text>
            <div v-if="$auth.user.walletAddress">
              <code>{{ $auth.user.walletAddress }}</code>
              <v-btn
                small
                outlined
                color="red"
                :loading="removeWalletAddressLoading"
                @click="removeWalletAddress"
              >
                <v-icon>mdi-close</v-icon>
                remove wallet address
              </v-btn>
            </div>
            <div v-else>
              <v-alert dense outlined type="error">
                You need add wallet address!
              </v-alert>
              <v-form ref="walletForm">
                <div class="d-flex">
                  <v-text-field
                    v-model="addWallet.address"
                    label="Paste wallet address here"
                    dense
                    outlined
                    :rules="[
                      $tips.rules.notBlank({ name: 'Address' }),
                      $tips.rules.walletAddress({ name: 'Address' }),
                    ]"
                  ></v-text-field>
                  <v-btn
                    class="ml-3"
                    outlined
                    :loading="addWallet.loading"
                    @click="saveWalletAddress()"
                  >
                    <v-icon>mdi-plus</v-icon>
                    Add</v-btn
                  >
                </div>
              </v-form>
              <small>
                We will never ask you for access to your BEP-20 wallet,
                including your password, seed phrase or private key. We will
                never ask you for access to your wallet, including your
                password, seed phrase or private key.</small
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <TransactionsHistory ref="transHist" />
      </v-col>
    </v-row>
    <v-dialog v-model="depositDialog.show" max-width="600">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>Deposit</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="depositDialog.show = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-toolbar>
        <v-card-text>
          <div v-if="$auth.user.walletAddress">
            To make deposit send <strong>Tips</strong> from your wallet:
            <div>
              <code>{{ $auth.user.walletAddress }}</code>
            </div>
            to our wallet:
            <div>
              <code>{{ $store.state.config.deposits.walletAddress }}</code>
            </div>
            then click:
            <div class="text-center">
              <v-btn
                class="accent"
                depressed
                :loading="checkDepositLoading"
                @click="checkDeposit()"
                >Check deposit</v-btn
              >
            </div>
          </div>
          <v-alert v-else type="info" outlined
            >You need add wallet address before you deposit crypto.</v-alert
          >
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="withdraw.show" max-width="600">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>Withdraw</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="withdraw.show = false"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </v-toolbar>
        <v-card-text>
          <div v-if="$auth.user.walletAddress">
            <v-text-field
              v-model="withdraw.amount"
              @change="
                withdraw.amount = $tips.moneyFormat(withdraw.amount)
                getGasInfo()
              "
              label="Amount"
              outlined
              suffix="Tips"
            />

            <v-sheet outlined class="pa-3" rounded>
              <div v-if="withdraw.loading">
                <v-progress-linear indeterminate />
              </div>

              <v-simple-table v-else-if="withdraw.fee">
                <tr>
                  <td>Estimated gas fee</td>
                  <td class="text-right text-no-wrap">
                    {{ $tips.formatTips(withdraw.fee.data.gasCostEther) }} BNB /
                    <strong>
                      {{ $tips.formatTips(withdraw.fee.data.tipsCost) }} Tips
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Current balance</td>
                  <td class="text-right text-no-wrap">
                    {{ $tips.formatTips($auth.user.balance) }} Tips
                  </td>
                </tr>
                <tr>
                  <td>Balance after payout</td>
                  <td class="text-right text-no-wrap">
                    {{
                      $tips.formatTips(
                        $auth.user.balance -
                          withdraw.amount -
                          withdraw.fee.data.tipsCost
                      )
                    }}
                    Tips
                  </td>
                </tr>
                <tr>
                  <td>The amount you will receive on your wallet</td>
                  <td class="text-right text-no-wrap">
                    {{
                      $tips.formatTips(
                        withdraw.amount - withdraw.fee.data.tipsCost
                      )
                    }}
                    Tips
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <v-divider class="my-2" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <small
                      >The gas fee will be charged from your balance in Tips to
                      complete the transfer.</small
                    >
                  </td>
                  <td class="text-right text-no-wrap">
                    <v-btn color="accent" @click="processWithdraw"
                      >Withdraw</v-btn
                    >
                  </td>
                </tr>
              </v-simple-table>
            </v-sheet>
          </div>
          <v-alert v-else type="info" outlined
            >You need to add your wallet address before withdrawing
            crypto.</v-alert
          >
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="withdraw.after.show" max-width="600" persistent>
      <v-card v-if="withdraw.after.result">
        <v-card-text class="text-center">
          <div class="text-center py-10">
            <v-btn color="green accent-4" fab x-large dark depressed>
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </div>
          <h3 class="text-center black--text">Withdrawal Request Submitted</h3>
          <div class="py-5">
            <v-btn
              :href="withdraw.after.result.txLink"
              target="_blank"
              color="green accent-4"
              dark
              outlined
            >
              <v-icon class="mr-5">mdi-magnify</v-icon>
              View transaction on BscSan
            </v-btn>
          </div>
          <div>
            <v-btn
              @click="withdraw.after.show = false"
              color="blue-grey lighten-4"
              dark
              outlined
            >
              <v-icon class="mr-5">mdi-close</v-icon>
              Close
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'

export default {
  name: 'IndexPage',
  data() {
    return {
      activeToken: 'tips',
      removeWalletAddressLoading: false,
      addWallet: {
        address: '',
        loading: false,
      },
      depositDialog: {
        show: false,
      },
      checkDepositLoading: false,
      withdraw: {
        show: false,
        amount: 500,
        fee: null,
        jwt: null,
        loading: false,
        after: {
          show: false,
          result: null,
        },
      },
    }
  },
  computed: {
    balance() {
      return [
        {
          token: 'tips',
          name: 'Tips',
          balance: this.$auth.user.balance,
        },
      ]
    },
  },
  methods: {
    processWithdraw() {
      this.$nuxt.$loading.start()

      this.$axios
        .$post('api/wallet/withdraw', {
          token: this.withdraw.jwt,
        })
        .then((res) => {
          this.withdraw.show = false
          this.$store.commit('openSnackbar', {
            text: 'The funds have been successfully paid out.',
            color: 'green',
          })
          this.withdraw.after.result = res.data
          this.withdraw.after.show = true
          this.$auth.fetchUser()
          this.$refs.transHist.getTransactions({})
        })
        .catch((res) => {
          this.$store.commit('openSnackbar', {
            text: res?.response?.data?.message || 'error',
            color: 'red',
          })
          if (res?.response?.data?.recalc) {
            this.getGasInfo()
          }
        })
        .finally(() => {
          this.$nuxt.$loading.finish()
        })
    },
    getGasInfo() {
      if (!this.withdraw.amount) {
        this.withdraw.fee = null
        return
      }

      this.withdraw.loading = true

      this.$axios
        .$post('api/wallet/gasInfo', {
          value: this.withdraw.amount,
        })
        .then((res) => {
          this.withdraw.jwt = res
          this.withdraw.fee = jwtDecode(res)
        })
        .catch((res) => {
          this.withdraw.fee = null
          this.$store.commit('openSnackbar', {
            text: res?.response?.data?.message || 'error',
            color: 'red',
          })
        })
        .finally(() => {
          this.withdraw.loading = false
        })
    },
    checkDeposit() {
      this.checkDepositLoading = true
      this.$axios
        .$post('api/wallet/deposit', {
          balance: this.$auth.user.balance,
        })
        .then(async (res) => {
          await this.$auth.fetchUser()
          this.$store.commit('openSnackbar', {
            text: 'Incoming Tips: ' + this.$tips.formatTips(res.amount),
          })
          this.depositDialog.show = false
        })
        .catch((res) =>
          this.$store.commit('openSnackbar', {
            text: res?.response?.data?.message || 'error',
            color: 'red',
          })
        )
        .finally(() => {
          this.checkDepositLoading = false
        })
    },
    saveWalletAddress() {
      if (this.$refs.walletForm.validate()) {
        this.addWallet.loading = true
        this.$axios
          .$post('api/wallet/save', {
            address: this.addWallet.address,
          })
          .then(() => this.$auth.fetchUser())
          .finally(() => {
            this.addWallet.loading = false
          })
      }
    },
    removeWalletAddress() {
      this.removeWalletAddressLoading = true
      this.$axios
        .$post('api/wallet/clear')
        .then(() => this.$auth.fetchUser())
        .finally(() => {
          this.removeWalletAddressLoading = false
        })
    },
  },
}
</script>
