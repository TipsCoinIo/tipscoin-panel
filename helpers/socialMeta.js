export default function (domain) {
  const options = {
    url: 'https://bot.tipscoin.io',
    title: 'Bot TipsCoin.io',
    site_name: 'Bot TipsCoin.io',
    description:
      'Reward interesting posts and comments by sending tips to their authors using the Tips token. Official tip bot for https://TipsCoin.io.',
    img: 'https://pbs.twimg.com/profile_images/1510869753505751045/5DnDYJ3g_400x400.png',
    img_size: { width: '400', height: '400' },
    locale: 'en_US',
    twitter: '@tipscoinbot',
    twitter_card: 'summary_large_image',
    theme_color: '#ff006a',
  }

  if (domain === 'ap') {
    options.title = 'Affiliate program TipsCoin.io'
    options.site_name = 'Affiliate program TipsCoin.io'
  }

  return [
    // Global
    { name: 'author', content: options.url },
    { name: 'publisher', content: options.url },
    { name: 'apple-mobile-web-app-title', content: options.title },
    { name: 'theme-color', content: options.theme_color },

    // Facebook & LinkedIn
    { property: 'og:title', content: options.title },
    { property: 'og:description', content: options.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: options.url },
    { property: 'og:image', content: options.img },
    { property: 'og:image:width', content: options.img_size.width },
    { property: 'og:image:height', content: options.img_size.height },
    { property: 'og:locale', content: options.locale },
    { property: 'og:site_name', content: options.site_name },

    // Twitter
    { name: 'twitter:card', content: options.twitter_card },
    { name: 'twitter:site', content: options.twitter },
    { name: 'twitter:creator', content: options.twitter },
    { name: 'twitter:title', content: options.title },
    { name: 'twitter:description', content: options.description },
    { name: 'twitter:image', content: options.img },
    { name: 'twitter:image:width', content: options.img_size.width },
    { name: 'twitter:image:height', content: options.img_size.height },
  ].map((x) => ({
    ...x,
    hid: 'hid' + (x.name || x.property),
  }))
}
