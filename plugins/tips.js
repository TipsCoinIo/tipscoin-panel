import { sprintf } from 'sprintf-js'
import commonRules from '@/helpers/commonRules'

export default ({ app }, inject) => {
  inject('tips', {
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
    formatTips(v) {
      return sprintf('%g', v)
    },
    rules: commonRules,
  })
}
