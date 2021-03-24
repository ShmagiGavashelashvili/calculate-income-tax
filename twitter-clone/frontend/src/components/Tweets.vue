<template>
    <div class="message">
       <p class="message-username">
          <span class="message-username_user"><strong>{{tweet.username}}</strong></span>
          <span class="message-username_date">{{tweet.createdAt.substring(0, 10)}}</span>
        </p>
        <p class="message-post">
          {{tweet.message}}
       </p>
    </div>
</template>

<script>
export default {
    name: 'Tweets',
    props: ['tweet']
}
</script>

<style lang='scss'>
@import '../assets/sass/_variables.scss';

.message {
  padding: 2rem;

     &-username {
         
            &_user {
               color: $color-dark;
               font-size: 1.7rem;
            }

            &_date {
              font-size: 1.2rem;
              font-weight: 700;
              color: $color-light;
              margin-left: 1rem;
            }
     }

     &-post {
       padding: 1rem 0 1rem 0rem;
       font-size: 1.3rem;
       color: $color-light;
     }
}
</style>