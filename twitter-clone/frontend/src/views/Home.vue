<template>
  <main id="main" class="home" @scroll="handleScroll">
    <header
      id="header"
      :class="[fixed ? 'home-header fixed-header' : 'home-header']"
    >
      <span class="home-header_bar" @click="$emit('nav-show')">
        <i class="fas fa-bars"></i>
      </span>
      <router-link :to="{ name: 'home' }">
        <h1>Home</h1>
      </router-link>
    </header>
    <span v-if="error">{{ error }}</span>
    <Loader v-if="loading" />
    <div v-else class="tweets">
      <div v-for="tweet in tweets" :key="tweet._id" class="tweets-container">
        <Tweets :tweet="tweet" />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
  data() {
    return {
      fixed: false,
    };
  },
  computed: {
    ...mapGetters({
      tweets: "getTweets",
      error: "getError",
      loading: "getLoading",
    }),
  },
  methods: {
    ...mapActions(["fetchTweets"]),
    handleScroll() {
      const header = document.getElementById("header");
      const main = document.getElementById("main");
      if (header) {
        if (header.getBoundingClientRect().height < main.scrollTop) {
          this.fixed = true;
        } else {
          this.fixed = false;
        }
      }
    },
  },
  created() {
    this.fetchTweets();
  },
};
</script>

<style lang="scss">
@import "../assets/sass/_variables.scss";
@import "../assets/sass/_mixins.scss";

.fixed-header {
  box-shadow: 0px 6px 14px -5px rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background-color: $twitter-color !important;
  transition: all 0.4s;

  & h1 {
    color: $color-white !important;
  }

  & .fa-bars {
    color: $color-white !important;
    font-size: 2.5rem;
  }
}

.home {
  width: 40%;
  height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @include respond(phone) {
    width: 90%;
    margin: 0 auto;
    height: 90vh;
  }

  &-header {
    width: 40%;
    background-color: $color-white;
    position: fixed;
    transition: all 0.4s;

    &_bar {
      display: none;
    }

    @include respond(phone) {
      width: 90%;

      &_bar {
        display: block;
        position: absolute;
        top: 50%;
        left: 10%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);

        & .fa-bars {
          color: $twitter-color;
          font-size: 2.5rem;
        }
      }
    }

    & a {
      text-decoration: none;

      & h1 {
        color: $color-dark;
        font-size: 3rem;
        padding: 1rem 0 1rem 2rem;

        @include respond(phone) {
          text-align: center;
          padding: 1rem 0 1rem 0rem;
        }
      }
    }
  }
}

.tweets {
  background-color: $color-white;
  width: 100%;
  height: auto;
  margin: 6rem auto 0 auto;

  &-container {
    width: 100%;
    border-bottom: $bottom-border;
  }
}
</style>
