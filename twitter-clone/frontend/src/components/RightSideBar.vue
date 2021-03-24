<template>
    <div class="rightsidebar">

    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped lang='scss'>
@import '../assets/sass/_variables.scss';
@import '../assets/sass/_mixins.scss';

.rightsidebar {
    background-color: $color-white;
    width: 30%;
    border-left: $corner-border;

      @include respond(phone){
          display: none;
      }
}
</style>