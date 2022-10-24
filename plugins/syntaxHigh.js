import Vue from 'vue'
import VueHighlightJS from 'vue-highlight.js'
import javascript from 'highlight.js/lib/languages/javascript.js'

import 'highlight.js/styles/vs.css'

Vue.use(VueHighlightJS, {
  languages: {
    javascript
  }
})