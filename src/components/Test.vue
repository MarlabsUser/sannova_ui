<template>
    <button @click="clickme">Click</button>
</template>


<script>
import axios from 'axios'
export default{
    name:'Test',
    methods:{
        clickme(){
            console.log("clicked");
            console.log("call started")
            axios.get("http://localhost:8090/sannova/study_types")
                .then(response => {
                  console.log(response)
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
        }   
    }

</script>