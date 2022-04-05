<template>
  <v-expansion-panel>
    <v-expansion-panel-header
      >What commands can I use?
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-tabs grow>
        <v-tab>
          <v-icon>mdi-reddit</v-icon>
          Reddit
        </v-tab>
        <v-tab-item class="py-5">
          There are 2 ways to send tips on Reddit:<br />

          <TextGroup title="Using the panel:" class="my-3">
            Go to this page: https://bot.tipscoin.io/reddit, enter your username
            (or link to the post or comment), the message content and the amount
            and press "send tip".
          </TextGroup>
          <TextGroup title="Using commands:" class="my-3">
            Find a thread or comment on Reddit that you like, and then write in
            the comment to the author:<br />
            <Cmd>u/tipscoinbot !tip 1000 Tips</Cmd> - sends 1000 Tips to the
            author of the entry or comment you are replying to<br />
            You can also give out tips by sending commands in a private message
            to u/tipscoinbot, for example:<br />
            <Cmd>!tip u/username 1000 Tips</Cmd> - sends 1000 Tips to the
            selected user
          </TextGroup>
          Other commands available in private messages:
          <TextGroup class="my-3">
            <Cmd>!login</Cmd> - sends an authorization code to log in<br />
            <Cmd>!register</Cmd> - new user registration<br />
            <Cmd>!addwallet [your-WALLET-ADDRESS]</Cmd> - adds the specified
            wallet to deposit and withdraw Tips tokens<br />
            <Cmd>!deposit [your-WALLET-ADDRESS]</Cmd> - verifies the balance
            after ordering a deposit from a previously added wallet<br />
            <Cmd>!balance</Cmd> - displays your account balance<br />
            <Cmd>!withdraw</Cmd> - orders the withdrawal of all Tips tokens<br />
            <Cmd>!withdraw 1000 tips</Cmd> - orders the withdrawal of a
            specified number of Tips tokens<br />
            <Cmd>!help</Cmd> - displays all commands
          </TextGroup>
        </v-tab-item>
        <v-tab>
          <v-icon>mdi-twitter</v-icon>
          Twitter
        </v-tab>
        <v-tab-item class="py-5">
          There are 2 ways to send tips on Twitter:<br />
          <TextGroup title="Using the panel:" class="my-3">
            Go to the website: https://bot.tipscoin.io/twitter, enter your
            username (or paste the link into a tweet or comment), the content of
            the message and the amount, press "generate link" and share it on
            Twitter.
          </TextGroup>
          <TextGroup title="Using commands:" class="my-3">
            In reply to a tweet or comment, type:<br />
            <Cmd>@tipscoinbot !tip 1000 Tips</Cmd>. To claim your tokens, login
            to: https://bot.tipscoin.io - sends 1000 Tips to the author of a
            tweet or comment that you are replying to<br />
            <Cmd>@tipscoinbot !tip @username 1000 Tips</Cmd>. To claim your
            tokens, login to: https://bot.tipscoin.io - sends 1000 Tips to the
            indicated user
          </TextGroup>
          Other commands available in private messages:
          <TextGroup class="my-3">
            <Cmd>!login</Cmd> - sends authorization code
          </TextGroup>
        </v-tab-item>
        <v-tab>
          <v-img
            src="img/telegram-grey.svg"
            max-width="24"
            height="24"
            contain
            class="mr-2"
          />
          Telegram
        </v-tab>
        <v-tab-item>
          <p class="answer py-5">
            In order to send tips to the selected group, our bot @TipsCoinBot
            must first be added to it.<br />
            If you don't see it in the user list, ask the group owner to add it.
            You can test the bot on this group:
            https://t.me/TipsCoinBotOfficial.<br />
            <TextGroup title="Command to send in public chat:" class="my-3">
              <Cmd>/tip@username 1000 tips</Cmd> - sends 1000 tips to the
              selected user.
            </TextGroup>
          </p>
        </v-tab-item>
      </v-tabs>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  name: 'CommandsPanel',
}
</script>
