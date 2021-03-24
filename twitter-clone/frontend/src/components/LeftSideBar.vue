<template>
    <div :class="[navShow ? 'navShow' : 'leftsidebar']">
      <ul class="leftsidebar-nav">
        <li class="leftsidebar-nav_items" @click="$emit('nav-show')">
          <router-link :to="{name: 'home'}">
            <i class="fab fa-twitter"></i>
          </router-link>
            <span class="leftsidebar-nav_items-close">
              <i class="fas fa-times" @click.stop="$emit('nav-show')"></i>
           </span>
        </li>
        <li class="leftsidebar-nav_items" @click="$emit('nav-show')">
          <router-link :to="{ name: 'home' }">
            <i class="fas fa-home"></i>
            Home
          </router-link>
        </li>
         <li class="leftsidebar-nav_btn" @click="$emit('nav-show')">
          <router-link :to="{ name: 'tweet' }">Tweet</router-link>
        </li>
      </ul>
    </div>
</template>

<script>

export default {
  name: 'LeftSideBar',
  props: ["navShow"]
}
</script>

<style scoped lang='scss'>
@import '../assets/sass/_variables.scss';
@import '../assets/sass/_mixins.scss';

.navShow {
  height: 100vh;
  border-right: $corner-border;
  background-color: #fff;
  transition: all .4s ease;

     @include respond(phone){
       position: absolute;
       width: 65%;
       top:0;
       left: 0%;
       z-index: 3;
     }
}

.leftsidebar {
  width: 30%;
  height: 100vh;
  border-right: $corner-border;
  background-color: #fff;
  transition: all .4s ease;

     @include respond(phone){
       position: absolute;
       width: 65%;
       top:0;
       left: -65%;
     }

    &-nav {
      list-style: none;
      font-size: 2rem;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 65%;
      margin: 0 auto;

      
     @include respond(larg-desktop){
        width: 50%;
     }

     @include respond(tab-land){
       width: 90%;
     }

      &_btn {
        margin: 2rem auto;

            & a {
              color: #ffff;
              background-color: $twitter-color;
              text-decoration: none;
              text-align: center;
              border-radius: 5rem;
              padding: 1rem 10rem 1rem 10rem;
              transition: .4s;

                @include respond(tab-port){
                  padding: 1rem 7rem 1rem 7rem;
                }

                &:hover {
                    background-color:$twitter-color-hover;
                }
            }
       }

        &_items {
          padding: 2rem 0 2rem 2rem;

            &-close {
              display: none;
            }
              @include respond(phone){
                display: flex;
                align-items: center;
                justify-content: space-between;
                
                 &-close {
                   display: block;
                   color: $twitter-color;
                   font-size: 2rem;
                 }
              }

            & a {
              color: $twitter-color;
              text-decoration: none;
              font-weight: 600;
              transition: .4s;

                  &:hover {
                    color:$twitter-color-hover;
                }
            }
        }
    }
}

.fa-twitter {
  color: $twitter-color;
  font-size: 3.5rem;
}
</style>
