<template>
  <div class='loader'>
     <i class='fas fa-spinner'></i>
  </div>
</template>

<script>

export default {
  name: 'Loader'
}
</script>

<style  lang='scss'>
@import '../assets/sass/_animations.scss';
@import '../assets/sass/_variables.scss';

.loader {
  width: 60%;
  margin: 1rem auto;
  text-align: center;
    
    & .fa-spinner {
      font-size: 4rem;
      animation-name: loading-spinner;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      color: $twitter-color;
      margin: 10rem auto;
   }
}
</style>