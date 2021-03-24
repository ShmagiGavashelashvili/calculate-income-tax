<template>
  <main class="tweet">
    <span v-if="error">{{ error }}</span>
    <span class="tweet_bar" @click="$emit('nav-show')">
      <i class="fas fa-bars"></i>
    </span>
    <AddNewTweet @add-tweet="addNewTweet" />
    <Loader v-show="loading" />
    <div
      v-if="newTweet"
      class="message"
      style="margin-top: 1rem; background-color: #ffff"
      >
      <p class="message-username">
        <span class="message-username_user">
          <strong>{{ newTweet.username }}</strong>
        </span>
        <span
          v-if="newTweet && newTweet.createdAt"
          class="message-username_date"
        >
          {{ newTweet.createdAt.substring(0, 10) }}
        </span>
      </p>
      <p class="message-post">
        {{ newTweet.message }}
      </p>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import AddNewTweet from "../components/AddNewTweet";
import Tweets from "../components/Tweets";
import Loader from "../components/Loader";

export default {
  name: "Home",
  components: {
    AddNewTweet,
    Tweets,
    Loader,
  },
  computed: {
    ...mapGetters({
      newTweet: "getNewTweet",
      error: "getError",
      loading: "getLoading",
    }),
  },
  methods: {
    ...mapActions(["createTweet"]),
    ...mapMutations(["resetNewTweet"]),
    addNewTweet(newTweet) {
      this.createTweet(newTweet);
    },
  },
  created() {
    this.resetNewTweet();
  },
};
</script>

<style lang="scss">
@import "../assets/sass/_variables.scss";
@import "../assets/sass/_mixins.scss";

.tweet {
  width: 40%;

  &_bar {
    display: none;
  }

  @include respond(phone) {
    width: 100%;
    position: relative;

    &_bar {
      display: block;
      position: absolute;
      top: 4%;
      left: 8%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);

      & .fa-bars {
        color: $twitter-color;
        font-size: 2.5rem;
      }
    }
  }
}
</style>
