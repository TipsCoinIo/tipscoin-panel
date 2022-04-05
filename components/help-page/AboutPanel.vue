<template>
  <v-expansion-panel>
    <v-expansion-panel-header>What is TipsCoinBot? </v-expansion-panel-header>
    <v-expansion-panel-content>
      <p class="answer">
        @TipsCoinBot is a tip bot that supports the Tips token, running on the
        Binance Smart Chain (BSC) network. If you want to learn more about the
        Tips protocol, go to https://tipscoin.io.
      </p>
      <p><strong>What is the address of the tips contract?</strong></p>
      <p class="answer">
        The only official address of the Tips contract is
        0x2100A985040005C6cEc1b1d2c18594e6944739f3
      </p>
      <p><strong>Where can I send tips?</strong></p>
      <p class="answer">
        For now, you can send tips on Reddit, Twitter and Telegram.<br />
        List of our official bots:<br />
        https://www.reddit.com/user/TipsCoinBot<br />
        https://twitter.com/TipsCoinBot<br />
        https://t.me/TipsCoinBot<br />
        There will be further implementations in the future. If you would like
        to suggest a new platform, please write to support@tipscoin.io.
      </p>
      <p><strong>Do you have an official group on Telegram?</strong></p>
      <p class="answer">
        Yes. Visit:
        <a href="https://t.me/TipsCoinBotOfficial"
          >https://t.me/TipsCoinBotOfficial</a
        >
      </p>
      <p>
        <strong
          >Someone contacted me claiming to be a TipsCoin Support employee, is
          that you?</strong
        >
      </p>
      <p class="answer">
        No. We will never write to you first, much less ask you to verify your
        wallet. Never send your passwords, seed phrase and private key to
        anyone.
      </p>
      <p><strong>How can I withdraw the collected tips?</strong></p>
      <p class="answer">
        To order a withdrawal, you must have a minimum of $10 USD in Tips tokens
        and a BEP-20 wallet configured to support the Binance Smart Chain (BSC)
        network.
      </p>
      <p><strong>Do you charge any commission?</strong></p>
      <p class="answer">
        When you withdraw, due to transaction fees (Gas Fee), your account will
        automatically be charged the equivalent of $2 USD in Tips. In addition,
        the purchase, sale and transfer transactions are subject to a 10% tax
        resulting directly from the tokenization of the Tips contract.
      </p>
      <p>
        <strong
          >Can I exchange the collected Tips tokens for fiat currency, for
          example USD?</strong
        >
      </p>
      <p class="answer">
        Yes. You can exchange paid Tips tokens for BNB (e.g. using PancakeSwap),
        then sell them on any stock exchange.
      </p>
      <p>
        <strong
          >I want to top up my tip account, to which address should I send the
          tokens?</strong
        >
      </p>
      <p class="answer">
        To top up your account, send Tips tokens to
        {{ $store.state.config.deposits.walletAddress }}, and then confirm the
        top-up in the panel.
      </p>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'AboutPanel',
}
</script>
