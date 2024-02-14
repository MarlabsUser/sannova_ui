<template>
  <Nav/>
  <div class="main">
    <div>
      <div class="headerp"><p>Document Template Setup</p></div>
      <div>
        <form id="form" enctype="multipart/form-data">
      <div class="input-group">
        <label for="files">Select files</label>
        <input id="file" type="file" multiple />
      </div>
      <button class="submit-btn" type="submit">Upload</button>
    </form>
      </div>
    </div>
    <div class="studyStyle">
      <div v-for="study in studyitem" :key="study.study_id">
        <input type="radio" id="{{study.study_id}}" name="study" value={{study.study_id}}>
        <label for="{{study.study_id}}">{{study.study_name}}</label><br>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from './Navigation.vue'
import axios from 'axios'
export default{
  name:'Home',
  data(){
      return {
        studyitem: [],               
        }
    },
  components:{
    Nav
  },
  methods:{
        clickme(){
            console.log("clicked");
            console.log("call started")
            axios.get("http://localhost:8090/sannova/study_types")
                .then(response => {
                  console.log(response.data)
                  this.studyitem=response.data
                  console.log(this.studyitem)
                })
                .catch(error => console.log(error));
        }
    },
  mounted(){
          let userinfo=localStorage.getItem('user_info');
          console.log(userinfo)
          if(userinfo==null){
            this.$router.push({path: '/'})
          }
          this.clickme();
    } 
}
</script>
<style>
.main {
  margin-left: 18%; /* Same as the width of the sidenav */
}
.studyStyle{
  text-align: left;
}
.headerp{
  text-align: left;
    padding-bottom: 19px;
    padding-top: 15px;
}
</style>