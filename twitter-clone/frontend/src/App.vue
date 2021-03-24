<template>
  <div id="nav">
    <div class='container'>
      <LeftBar :navShow="navShow" @nav-Show='handleNavShow'/>
        <router-view @nav-Show='handleNavShow'></router-view>
      <RightBar @nav-Show='handleNavShow'/>
    </div>
  </div>
</template>

<script>
import LeftSideBar from './components/LeftSideBar'
import RightSideBar from './components/RightSideBar'
export default {
  components : {
    LeftBar: LeftSideBar,
    RightBar: RightSideBar
  },
  data(){
     return {
       navShow: false
     }
  },
  methods: {
      handleNavShow(){
        let media = window.matchMedia("(max-width: 600px)")
        let body = document.body;

        if(media.matches){
            this.navShow = !this.navShow
            if(this.navShow){
              body.classList.add('navShowClass')
              } else {
              body.classList.remove('navShowClass') 
            }
            body.addEventListener('click', e => {
              if(e.target.nodeName === 'BODY'){
                  this.navShow = false
                  body.classList.remove('navShowClass') 
              }
           })
        }
      }
  }
}
</script>

<style lang="scss">
@import './assets/sass/_variables.scss';
@import './assets/sass/_mixins.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
          counter-reset: section;
}
html {
    font-size: 62.5%; //    10 / 16 * 100
}
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: inherit;
          box-sizing: inherit;
}
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: $main-background;
  justify-content: space-between;
  position: relative;

      @include respond(big-desktop){
        margin: 0 auto;
        width: 70%;
      }
}

.navShowClass {
    width: 100%;
    height: 100vh;
    position: fixed;
    top:0;
    left: 0;
  

    &::after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(#8D8787, .37);
        visibility: visible;
        -webkit-backdrop-filter: blur(.1rem);
        backdrop-filter: blur(.1rem);
    }
}
</style>
