export const state = () => ({
  config: 0,
  snackbar: {
    text: '',
    color: '',
    dark: false,
  },
  apConfig: null,
})

export const mutations = {
  setConfig(state, config) {
    state.config = config
  },
  setApConfig(state, config) {
    state.apConfig = config
  },
  openSnackbar(state, data) {
    state.snackbar.text = data.text
    state.snackbar.color = data.color || 'green'
    state.snackbar.dark = 'dark' in data ? data.dark : true
  },
}
