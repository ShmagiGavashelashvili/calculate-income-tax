import axios from 'axios'

export default {
    state(){
        return {
            tweets: [],
            newTweet: {},
            error: '',
            loading: false
        }
    },
    mutations : {
        setTweets(state, tweet){
            state.tweets = tweet
        },
        setNewTweet(state, newTweet){
           state.newTweet = newTweet
           state.tweets.push(state.newTweet)
        },
        setError(state, err){
            state.error = err
        },
        resetNewTweet(state){
            return state.newTweet = {}
        },
        setLoading(state, newLoading){
            state.loading = newLoading
        }
    },
    actions : {
        async fetchTweets({commit}){
            commit('setLoading', true)
            const { data } = await axios.get('api/tweets')
            commit('setTweets', data)
            commit('setLoading', false)
        },
        async createTweet({commit}, tweetBody){
            commit('setLoading', true)
            try{
             const {data} = await axios.post('api/tweets', tweetBody, {
                 headers : {
                    'Content-Type': 'application/json'
                 }
              })
              commit('setNewTweet', data)
              commit('setLoading', false)
            } catch(error){
              const err = error.response && error.response.data.message ? error.response.data.message : error.message
              commit('setError', err)
            }
        }
    },
    getters : {
        getTweets(state){
            return state.tweets
        },
        getError(state){
            return state.error
        },
        getNewTweet(state){
            return state.newTweet
        },
        getLoading(state){
            return state.loading
        }
    }
}