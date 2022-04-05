export default async function ({ $axios, store }) {
  return store.commit('setConfig', await $axios.$get('api/config'))
}
