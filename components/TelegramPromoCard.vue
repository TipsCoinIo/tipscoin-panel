<template>
  <v-card>
    <v-card-text>
      <p>
        Do you have any questions or concerns, or would you like to share your idea with us?
        Write to us at: <a href="mailto:support@tipscoin.io">support@tipscoin.io</a> or join our official telegram group.
      </p>
      <v-card
        max-width="500px"
        rounded
        href="https://t.me/TipsCoinOfficial"
        target="_blank"
      >
        <v-img src="img/telegrambg.png" height="56">
          <div class="d-flex fill-height align-center">
            <v-img src="img/telegram.svg" max-width="80" height="30" contain />
            <div class="white--text">
              Ask questions and get help in our
              <strong>Telegram</strong> Community
            </div>
            <v-spacer />
          </div>
        </v-img>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TelegramPromoCard',
}
</script>

<style scoped></style>
