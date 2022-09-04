<template>
  <!-- <div id="nav">
    <router-link to="/">Map</router-link> |
    <router-link to="/getData">getData</router-link>
  </div> -->
    <n-message-provider>
    <router-view/>
     <content />
  </n-message-provider>
</template>
<script>
  import { defineComponent } from 'vue'
  //useMessage
import { NMessageProvider, } from "naive-ui";
export default defineComponent({
    components: {NMessageProvider },
    name:'App',
  setup() {
  },
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
