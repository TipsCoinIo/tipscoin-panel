import { sprintf } from 'sprintf-js'
import commonRules from '@/helpers/commonRules'

export default ({ app }, inject) => {
  inject('tips', {
    _numberFormat: new Intl.NumberFormat(),
    moneyFormat(v) {
      const m = v.match(/([1-9]\d*)(?:[,.](\d{0,9}))?/)
      if (m) {
        let ret = m[1]
        if (m[2]) {
          ret += '.' + m[2]
        }
        return ret
      }
      return null
    },
    formatTipsLocale(v) {
      return this._numberFormat.format(v)
    },
    formatTips(v) {
      return sprintf('%g', v)
    },
    rules: commonRules,
  })
}
