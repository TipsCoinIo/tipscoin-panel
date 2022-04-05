export default async function ({ $axios, store }) {
  store.commit('setApConfig', await $axios.$get('api/ap/config'))
}
