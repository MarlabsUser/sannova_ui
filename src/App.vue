<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.clickbutton{
    display: inline-block;
    padding: 0.1em 0.2em;
    text-decoration: none;
    background: #668ad8;
    color: #FFF;
    border-bottom: solid 4px #627295;
    border-radius: 10%;
    margin-top: 6%;
}
.clickbutton:active {/*OnClick*/
    -ms-transform: translateY(4px);
    -webkit-transform: translateY(4px);
    transform: translateY(4px);/*Move down*/
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);/*Reduce Shadow*/
    border-bottom: none;
}
.buttonWrapper{
  margin-left: 1%;
}

</style>
