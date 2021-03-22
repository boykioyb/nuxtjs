import Toasted from 'vue-toasted'
import infiniteScroll from 'vue-infinite-scroll'
import Vue from 'vue'

const options = {
  theme: 'toasted-primary',
  position: 'top-right',
  duration: 5000,
}
Vue.use(Toasted, options)
Vue.use(infiniteScroll)
