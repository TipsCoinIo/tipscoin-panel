export default async function ({ $axios, store, app }) {
  const config = await $axios.$get('api/ap/config')
  store.commit('setApConfig', config)
  app.head.script.push({
    src: 'https://www.google.com/recaptcha/api.js?render=' + config.recaptcha,
  })
}
