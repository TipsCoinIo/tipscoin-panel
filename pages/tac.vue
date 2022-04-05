<template>
  <p>
    1. The bot supports Reddit, Twitter and Telegram.<br />
    2. Never give anyone passwords, private keys or seed phrase to your
    wallet.<br />
    3. TipsCoin.io and Bot.TipsCoin.io developers will not contact you to verify
    your wallet, nor would they ask you for passwords, private keys or seed
    phrase.<br />
    4. The minimum number of tokens you can withdraw to your BEP-20 wallet is
    the equivalent of $10.<br />
    5. From each withdrawal, the system automatically collects tokens worth
    $2USD for the transaction fee (Gas Fee).<br />
    6. On each withdrawal, the Tips contract automatically collects a 10% tax
    (Tokenomics).<br />
    7. Sending and receiving tips is free of charge and is not subject to tax
    due to the Tips contract's tokenomics.<br />
    8. There are no restrictions and limits on the maximum amount of tip.<br />
    9. Do not keep a large amount of tokens in your tip account.<br />
    10. When sending a tip, make sure you send it to the right person and that
    you enter the correct amount. The process of sending and receiving tips is
    automatic and can not be undone, so if you make a mistake, you will not be
    able to receive a refund.<br />
    11. When ordering a payout, make sure that you have added your current and
    correct BEP-20 wallet address. The payout process is automatic and cannot be
    undone, so if you make a mistake, you will not be able to receive a
    refund.<br />
    12. When transferring tokens to your tip wallet, make sure that you send
    them to the correct address:
    {{ $store.state.config.deposits.walletAddress }}. In case of a mistake, you
    will not be able to receive a refund.<br />
    13. If you accidentally send us other tokens for a refund, please contact us
    by e-mail: support@tipscoin.io.<br />
    14. If you have generated your tip jar key (password), make sure you have it
    stored in a safe place. Without it, you won't be able to log into your tip
    wallet.<br />
    15. You use this bot on your own responsibility and you accept that you are
    aware of the risks that are associated with cryptocurrencies.<br />
    16. Information contained on the websites: TipsCoin.io and Bot.TipsCoin.io
    as well as on all social profiles of Tips Coin, are not financial advice and
    investment recommendations.<br />
    17. Tips Coin is not a financial instrument, investment fund, bank, broker
    or financial<br />
    analyst.<br />
    18. Investing in cryptocurrencies is an individual decision and involves a
    high risk of financial loss. Always do your own research (DYOR) and invest
    only those funds whose loss you take into consideration and will not result
    in any consequences.<br />
    19. Any Tips tokens on the tip wallet shall belong to their rightful
    holders.<br />
    20. TipsCoin.io platform and Bot.TipsCoin.io developers do not assume any
    responsibility for:<br />
    - incorrect use of the bot,<br />
    - messages transmitted in tips,<br />
    - user activities that may be perceived as spam,<br />
    - errors made by users, e.g. sending a tip to an incorrect recipient,
    entering the wrong tip amount, ordering a withdrawal or top-up to an
    incorrect wallet address and so on.<br />
    - any loss resulting from the actions of third parties or force majeure,<br />
    - any financial loss or possible tax liability.<br />
    21. Prohibited:<br />
    - spamming,<br />
    - use bot for law-breaking purposes,<br />
    - flooding,<br />
    - attempt to circumvent or breach the technical security of the system.
  </p>
</template>

<script>
export default {
  name: 'TacPage',
  head() {
    return {
      title: 'Terms and Conditions',
    }
  },
}
</script>
