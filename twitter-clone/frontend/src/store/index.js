import { createStore } from 'vuex'
import tweets from './modules/tweets.js'

export default createStore({
  modules: {
    tweets
  }
})

