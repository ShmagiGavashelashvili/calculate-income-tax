<template>
    <div class="addtweet">
     <form @submit.prevent="handleSubmit" class="addtweet-form">
        <input v-model="username" type='text' placeholder="username" required/>
        <input v-model="message" type='text'  placeholder="what's happenng?" required/>
        <button type='submit'>Tweet</button>
    </form>
    </div>
</template>

<script>
export default {
  name: 'AddNewTweet',
   data(){
     return {
       username: '',
       message: ''
     }
  },
    methods: {
      handleSubmit(){
         const newTweet = {
          username: this.username,
          message: this.message
        }
        
        this.$emit('add-tweet', newTweet)
        this.username = '',
        this.message = ''
      }
    }
}
</script>

<style scoped lang='scss'>
@import '../assets/sass/_variables.scss';
@import '../assets/sass/_mixins.scss';

.addtweet {
  width: 100%;
  height: 17rem;
  background-color: $color-white;
 
     @include respond(phone){
       height: 23rem;
     }

    &-form {
      width: 100%;
      height: 100%;
      display: flex; 
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      padding: 2rem 0 0rem 0;
    
         @include respond(phone){
           padding: 5rem 0 0rem 0;
         }

         & input {
           width: 90%;
           padding: 1rem;
           border:none;
           border-radius: .5rem;
           background-color: $input-background;
           outline: none;
           transition: all .4s;

             &:focus {
               background-color: $input-background-active;
             }
         }

         & button {
           border: none;
           background-color: $twitter-color;
           padding: 1rem 3rem 1rem 3rem;
           border-radius: 5rem;
           font-size: 1.7rem;
           color: $color-white;
           transition: .4s;
        

              &:focus {
                outline: none;
              }

              &:hover {
                cursor: pointer;
                background-color: $twitter-color-hover;
              }
         }
    }
}
</style>