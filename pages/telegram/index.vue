<template>
  <div v-if="!$auth.user.telegramName">
    <script
      async
      src="https://telegram.org/js/telegram-widget.js?15"
      data-telegram-login="tipscoinbot"
      data-size="large"
      data-auth-url="/api/telegram/auth"
    ></script>
  </div>
  <div v-else>
    <v-row class="mb-3">
      <v-col :cols="12" :md="7">
        <v-card>
          <v-card-title>Telegram Bot</v-card-title>
          <v-card-text>
            <p>
              Did you like the message on the Telegram? Would you like to reward the author, or maybe you have too many Tips tokens and want to share your happiness with others? This module will allow you to send tips to telegram users quickly and easily.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col :cols="12" :md="5">
        <TelegramPromoCard />
      </v-col>
    </v-row>

    <div class="mb-3">
      <v-card>
        <v-card-title>
          <v-icon large left> mdi-account </v-icon>
          Send a tip to the group</v-card-title
        >
        <v-card-text>
          <div class="py-5">
            In order to send tips to the selected group, our bot <a href="https://t.me/tipscoinbot">@TipsCoinBot</a> must first be added to it.
            If you don't see it in the user list, ask the group owner to add it. You can test the bot on this group: <a href="https://t.me/TipsCoinOfficial"
          >https://t.me/TipsCoinOfficial</a
          >.

            <br>
            <br>

            <h3>Commands:</h3>
            <br>
            <Cmd>/tip @username 1000 Tips</Cmd> - sends 1000 Tips to the indicated user
          </div>
        </v-card-text>
      </v-card>
    </div>

    <TransactionsHistory ref="transactionsHistory" provider="telegram" />
  </div>
</template>

<script>
export default {
  name: 'TelegramPage',
}
</script>
